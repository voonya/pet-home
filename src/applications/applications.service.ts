import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  ApplicationQueryDto,
  BaseApplicationDto,
  ApplicationDto,
  UpdateApplicationDto,
} from 'applications/dto';
import { IApplicationRepository } from 'data-services/interfaces/iapplication-repository';
import { IDataServices } from 'data-services/interfaces/idata-services';
import { IRequestRepository } from 'data-services/interfaces/irequest-repository';

@Injectable()
export class ApplicationService {
  constructor(dataServices: IDataServices) {
    this.applications = dataServices.applications;
    this.requests = dataServices.requests;
  }

  private applications: IApplicationRepository;

  private requests: IRequestRepository;

  private notFoundMsg = 'Application not found';

  private async getAll() {
    return this.applications.getAll();
  }

  private async isRequestActual(id: string) {
    const request = await this.requests.getById(id);
    return request.expirationDate ? new Date() < request.expirationDate : true;
  }

  async getById(id: string) {
    const foundApplication = await this.applications.getById(id);

    if (!foundApplication) {
      throw new NotFoundException(this.notFoundMsg);
    }

    return foundApplication;
  }

  async getFiltered(query: ApplicationQueryDto) {
    let allRecords = await this.getAll();

    if (query.id) {
      allRecords = allRecords.filter((p) => p.id === query.id);
    }
    if (query.requestId) {
      allRecords = allRecords.filter((p) => p.requestId === query.requestId);
    }
    if (query.userId) {
      allRecords = allRecords.filter((p) => p.userId === query.userId);
    }

    allRecords = allRecords.slice(query.offset, query.offset + query.limit);
    return allRecords;
  }

  async create(applicationDto: BaseApplicationDto) {
    this.requests.getById(applicationDto.requestId);

    if (!this.isRequestActual(applicationDto.requestId)) {
      throw new BadRequestException('Request is expired');
    }

    const newRecord: ApplicationDto = {
      ...applicationDto,
      id: randomUUID().toString(),
    };

    await this.applications.create(newRecord);

    return newRecord;
  }

  async remove(id: string, userId: string) {
    const removedApplication = await this.applications.remove(id, userId);
    if (!removedApplication) {
      throw new NotFoundException("Can't be removed!");
    }

    return removedApplication;
  }

  async update(
    id: string,
    userId: string,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    const oldApplication = await this.getById(id);
    const newApplication = { ...oldApplication, ...updateApplicationDto };

    if (!this.isRequestActual(newApplication.requestId)) {
      throw new BadRequestException('Request does not exist');
    }

    await this.applications.update(id, userId, newApplication);
    return newApplication;
  }
}
