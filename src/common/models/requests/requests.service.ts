import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IDataServices } from 'data-services/interfaces/idata-services';
import {
  BaseRequestDto,
  RequestDto,
  RequestQueryDto,
  UpdateRequestDto,
} from 'common/models/requests/dto';

@Injectable()
export class RequestService {
  constructor(private dataServices: IDataServices) {}

  private notFoundMsg = 'Request not found';

  private dateError = 'expirationDate should later than creationDate';

  async getById(id: string) {
    const foundRequest = await this.dataServices.requests.getById(id);

    if (!foundRequest) {
      throw new NotFoundException(this.notFoundMsg);
    }

    return foundRequest;
  }

  async getFiltered(query: RequestQueryDto) {
    return this.dataServices.requests.getAll(query);
  }

  async create(requestDto: BaseRequestDto, userId: string) {
    const newRecord: RequestDto = {
      ...requestDto,
      creationDate: new Date(),
      userId: userId,
    };

    if (this.isDateUnacceptable(newRecord, newRecord.creationDate)) {
      throw new BadRequestException(this.dateError);
    }

    const animal = await this.dataServices.animals.getById(
      requestDto.animalId,
      userId,
    );
    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    return this.dataServices.requests.create(newRecord);
  }

  async remove(id: string, userId: string) {
    const removedRequest = await this.dataServices.requests.remove(id, userId);
    if (!removedRequest) {
      throw new NotFoundException("Can't be removed!");
    }
    return removedRequest;
  }

  async update(id: string, userId: string, updateRequestDto: UpdateRequestDto) {
    const oldRequest = await this.getById(id);

    if (oldRequest.userId !== userId) {
      throw new BadRequestException('Only owner can update the request');
    }

    let applications = await this.dataServices.applications.getAll();
    applications = applications.filter((p) => p.requestId == id);

    if (applications.length !== 0) {
      throw new BadRequestException(
        "The request already has applications, so it can't be changed",
      );
    }

    if (oldRequest.assignedApplicationId) {
      throw new BadRequestException("Can't change request with an assignment");
    }

    if (this.isDateUnacceptable(updateRequestDto, oldRequest.creationDate)) {
      throw new BadRequestException(this.dateError);
    }

    return this.dataServices.requests.update(id, updateRequestDto);
  }

  async assign(requestId: string, applicationId: string, userId: string) {
    const request = await this.getById(requestId);

    if (request.assignedApplicationId) {
      throw new BadRequestException('Requesst already has an assignee');
    }

    if (request.userId !== userId) {
      throw new BadRequestException('You can assign only to own request');
    }

    const application = await this.dataServices.applications.getById(
      applicationId,
    );
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.requestId !== requestId) {
      throw new BadRequestException(
        'The application does not match the request',
      );
    }

    const asignment = { assignedApplicationId: applicationId };
    return this.dataServices.requests.update(requestId, asignment);
  }

  async resign(requestId: string, userId: string) {
    const request = await this.getById(requestId);

    if (request.userId !== userId) {
      throw new BadRequestException('You can resignonly own request');
    }

    if (!request.assignedApplicationId) {
      throw new BadRequestException('The request has no assigned application');
    }

    return this.dataServices.requests.resign(requestId);
  }

  private isDateUnacceptable(requestDto: UpdateRequestDto, creationDate: Date) {
    return requestDto.expirationDate
      ? creationDate > requestDto.expirationDate
      : false;
  }
}
