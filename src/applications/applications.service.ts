import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { ApplicationDto } from './dto/application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { applications } from './mock.applications';

@Injectable()
export class ApplicationService {
  async getAll(): Promise<ApplicationDto[]> {
    return applications;
  }

  async getById(id: string): Promise<ApplicationDto> {
    return applications.find((p) => p.id === id);
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

  async create(applicationDto: CreateApplicationDto) {
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
  }

  async update(
    id: string,
    updateApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationDto> {
    const oldApplication = await this.getById(id);

    if (oldApplication) {
      const index = applications.indexOf(oldApplication);
      const newApplication = { ...oldApplication, ...updateApplicationDto };
      applications[index] = newApplication;
      return newApplication;
    }
  }
}
