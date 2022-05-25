import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ApplicationQueryDto } from 'applications/dto/application-query.dto';
import { BaseApplicationDto } from 'applications/dto/base-application.dto';
import { ApplicationDto } from 'applications/dto/application.dto';
import { applications } from 'applications/mock.applications';
import { UpdateApplicationDto } from 'applications/dto/update-application.dto';

@Injectable()
export class ApplicationService {
  private notFoundMsg = 'Application not found';

  private getAll() {
    return applications;
  }

  getById(id: string) {
    const foundApplication = applications.find((p) => p.id === id);

    if (foundApplication) {
      return foundApplication;
    }

    throw new NotFoundException(this.notFoundMsg);
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
    const newRecord: ApplicationDto = {
      ...applicationDto,
      id: randomUUID().toString(),
    };

    applications.push(newRecord);

    return newRecord;
  }

  remove(id: string) {
    const applicationToRemove = this.getById(id);

    if (applicationToRemove) {
      const index = applications.indexOf(applicationToRemove);
      applications.splice(index, 1);

      return applicationToRemove;
    }

    throw new NotFoundException(this.notFoundMsg);
  }

  update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const oldApplication = this.getById(id);

    if (oldApplication) {
      const index = applications.indexOf(oldApplication);
      const newApplication = { ...oldApplication, ...updateApplicationDto };
      applications[index] = newApplication;
      return newApplication;
    }

    throw new NotFoundException(this.notFoundMsg);
  }
}
