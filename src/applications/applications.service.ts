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
import { applications } from 'data-services/data-services-mocked/data/mock.applications';
import { RequestService } from 'requests/requests.service';

@Injectable()
export class ApplicationService {
  constructor(private requestService: RequestService) {}

  private notFoundMsg = 'Application not found';

  private getAll() {
    return applications;
  }

  getById(id: string) {
    const foundApplication = applications.find((p) => p.id === id);

    if (!foundApplication) {
      throw new NotFoundException(this.notFoundMsg);
    }

    return foundApplication;
  }

  getFiltered(query: ApplicationQueryDto) {
    let allRecords = this.getAll();

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

  create(applicationDto: BaseApplicationDto) {
    this.requestService.getById(applicationDto.requestId);

    if (!this.requestService.requestIsActual(applicationDto.requestId)) {
      throw new BadRequestException('Request is expired');
    }

    const newRecord: ApplicationDto = {
      ...applicationDto,
      id: randomUUID().toString(),
    };

    applications.push(newRecord);

    return newRecord;
  }

  remove(id: string) {
    const applicationToRemove = this.getById(id);

    const index = applications.indexOf(applicationToRemove);
    applications.splice(index, 1);

    return applicationToRemove;
  }

  update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const oldApplication = this.getById(id);

    if (!this.requestService.requestIsActual(oldApplication.requestId)) {
      throw new BadRequestException('Request is expired');
    }

    const index = applications.indexOf(oldApplication);
    const newApplication = { ...oldApplication, ...updateApplicationDto };
    applications[index] = newApplication;
    return newApplication;
  }
}
