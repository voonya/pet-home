import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IApplicationRepository } from 'data-services/interfaces/iapplication-repository';
import { IDataServices } from 'data-services/interfaces/idata-services';
import { IRequestRepository } from 'data-services/interfaces/irequest-repository';
import {
  BaseRequestDto,
  RequestQueryDto,
  RequestDto,
  UpdateRequestDto,
} from 'requests/dto';

@Injectable()
export class RequestService {
  constructor(dataServices: IDataServices) {
    this.requests = dataServices.requests;
    this.applications = dataServices.applications;
  }

  private notFoundMsg = 'Request not found';

  private dateError = 'expirationDate should later than creationDate';

  private requests: IRequestRepository;

  private applications: IApplicationRepository;

  async getById(id: string) {
    const foundRequest = await this.requests.getById(id);

    if (!foundRequest) {
      throw new NotFoundException(this.notFoundMsg);
    }

    return foundRequest;
  }

  async getFiltered(query: RequestQueryDto) {
    return this.requests.getAll(query);
  }

  async create(requestDto: BaseRequestDto) {
    const newRecord: RequestDto = {
      ...requestDto,
      id: randomUUID().toString(),
      creationDate: new Date(),
    };

    if (this.isDateUnacceptable(newRecord)) {
      throw new BadRequestException(this.dateError);
    }

    await this.requests.create(newRecord);

    return newRecord;
  }

  async remove(id: string, userId: string) {
    const removedRequest = await this.requests.remove(id);
    if (!removedRequest) {
      throw new NotFoundException("Can't be removed!");
    }

    if (removedRequest.userId !== userId) {
      throw new BadRequestException('Only owner can delete the request');
    }

    return removedRequest;
  }

  async update(id: string, userId: string, updateRequestDto: UpdateRequestDto) {
    const oldRequest = await this.getById(id);

    if (oldRequest.userId !== userId) {
      throw new BadRequestException('Only owner can update the request');
    }

    let applications = await this.applications.getAll();
    applications = applications.filter((p) => p.requestId == id);

    if (applications.length !== 0) {
      throw new BadRequestException(
        "The request already has applications, so it can't be changed",
      );
    }

    if (oldRequest.assignedApplicationId) {
      throw new BadRequestException("Can't change requestn with an assignment");
    }

    const newRequest = { ...oldRequest, ...updateRequestDto };

    if (this.isDateUnacceptable(newRequest)) {
      throw new BadRequestException(this.dateError);
    }

    await this.requests.update(id, newRequest);
    return newRequest;
  }

  async assign(requestId: string, applicationId: string, userId: string) {
    const request = await this.getById(requestId);

    if (request.assignedApplicationId) {
      throw new BadRequestException('Requesst already has an assignee');
    }

    if (request.userId !== userId) {
      throw new BadRequestException('You can assign only to own request');
    }

    const application = await this.applications.getById(applicationId);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.requestId !== requestId) {
      throw new BadRequestException(
        'The application does not match the request',
      );
    }

    const asignment = { assignedApplicationId: applicationId };
    const newRequest = { ...request, ...asignment };
    await this.requests.update(requestId, newRequest);
    return newRequest;
  }

  async resign(requestId: string, userId: string) {
    const request = await this.getById(requestId);

    if (request.userId !== userId) {
      throw new BadRequestException('You can resignonly own request');
    }

    if (!request.assignedApplicationId) {
      throw new BadRequestException('The request has no assigned application');
    }

    delete request.assignedApplicationId;
    await this.requests.update(requestId, request);
    return request;
  }

  private isDateUnacceptable(requestDto: RequestDto) {
    return requestDto.expirationDate
      ? requestDto.creationDate > requestDto.expirationDate
      : false;
  }
}
