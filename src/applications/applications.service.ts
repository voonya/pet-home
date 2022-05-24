import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ApplicationQueryDto } from 'applications/dto/application-query.dto';
import { BaseApplicationDto } from 'applications/dto/base-application.dto';
import { ApplicationDto } from 'applications/dto/create-application.dto';
import { applications } from 'applications/mock.applications';

@Injectable()
export class ApplicationService {
  private notFoundMsg = 'Application not found';

  async getAll(): Promise<ApplicationDto[]> {
    return applications;
  }

  async getById(id: string): Promise<ApplicationDto> {
    const foundApplication = applications.find((p) => p.id === id);

    if (foundApplication) {
      return foundApplication;
    }

    throw new NotFoundException(this.notFoundMsg);
  }

  async getFiltered(q: ApplicationQueryDto): Promise<ApplicationDto[]> {
    let allRecords = await this.getAll();

    if (q.id) {
      allRecords = allRecords.filter((p) => p.id === q.id);
    }
    if (q.requestId) {
      allRecords = allRecords.filter((p) => p.requestId === q.requestId);
    }
    if (q.userId) {
      allRecords = allRecords.filter((p) => p.userId === q.userId);
    }

    return allRecords;
  }

  async create(applicationDto: BaseApplicationDto) {
    const newRecord: ApplicationDto = {
      ...applicationDto,
      id: randomUUID().toString(),
    };

    applications.push(newRecord);

    return newRecord;
  }

  async remove(id: string): Promise<ApplicationDto> {
    const applicationToRemove = await this.getById(id);

    if (applicationToRemove) {
      const index = applications.indexOf(applicationToRemove);
      applications.splice(index, 1);

      return applicationToRemove;
    }

    throw new NotFoundException(this.notFoundMsg);
  }

  async update(
    id: string,
    updateApplicationDto: BaseApplicationDto,
  ): Promise<ApplicationDto> {
    const oldApplication = await this.getById(id);

    if (oldApplication) {
      const index = applications.indexOf(oldApplication);
      const newApplication = { ...oldApplication, ...updateApplicationDto };
      applications[index] = newApplication;
      return newApplication;
    }

    throw new NotFoundException(this.notFoundMsg);
  }
}
