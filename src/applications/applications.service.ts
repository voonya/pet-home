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
    return this.applications.getAll(query);
  }

  async create(applicationDto: BaseApplicationDto, userId: string) {
    if (!this.isRequestActual(applicationDto.requestId)) {
      throw new BadRequestException('Request is expired');
    }

    const request = await this.requests.getById(applicationDto.requestId);
    if (request.userId === userId) {
      throw new BadRequestException("Can't apply to own request");
    }

    const filteringExpression: ApplicationQueryDto = {
      userId: userId,
      requestId: applicationDto.requestId,
    };
    const applications = await this.getFiltered(filteringExpression);

    if (applications.length !== 0) {
      throw new BadRequestException('You has already applied to this request');
    }

    const newRecord: ApplicationDto = {
      ...applicationDto,
      id: randomUUID().toString(),
    };

    await this.applications.create(newRecord);

    return newRecord;
  }

  async remove(id: string, userId: string) {
    const removedApplication = await this.getById(id);
    if (removedApplication.userId !== userId) {
      throw new BadRequestException('You can remove only own application');
    }

    const request = await this.requests.getById(removedApplication.requestId);
    if (request?.assignedApplicationId === removedApplication.id) {
      throw new BadRequestException("Can't delete an assigned application");
    }

    await this.applications.remove(id);

    return removedApplication;
  }

  async update(
    id: string,
    userId: string,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    const oldApplication = await this.getById(id);

    if (oldApplication.userId !== userId) {
      throw new BadRequestException('You can update only own application');
    }

    const newApplication = { ...oldApplication, ...updateApplicationDto };

    if (!this.isRequestActual(newApplication.requestId)) {
      throw new BadRequestException('Request does not exist');
    }

    const request = await this.requests.getById(newApplication.requestId);
    if (request ? request.assignedApplicationId === newApplication.id : true) {
      throw new BadRequestException("Can't update an assigned application");
    }

    await this.applications.update(id, newApplication);
    return newApplication;
  }
}
