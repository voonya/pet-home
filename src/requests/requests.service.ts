import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
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
  }

  private notFoundMsg = 'Request not found';

  private dateError = 'expirationDate should later than creationDate';

  private requests: IRequestRepository;

  private async getAll() {
    return this.requests.getAll();
  }

  async getById(id: string) {
    const foundRequest = this.requests.getById(id);

    if (!foundRequest) {
      throw new NotFoundException(this.notFoundMsg);
    }

    return foundRequest;
  }

  async getFiltered(query: RequestQueryDto) {
    let allRecords = await this.getAll();

    if (query.id) {
      allRecords = allRecords.filter((p) => p.id === query.id);
    }
    if (query.animalId) {
      allRecords = allRecords.filter((p) => p.animalId === query.animalId);
    }
    if (query.userId) {
      allRecords = allRecords.filter((p) => p.userId === query.userId);
    }

    allRecords = allRecords.slice(query.offset, query.offset + query.limit);
    return allRecords;
  }

  async create(requestDto: BaseRequestDto) {
    const newRecord: RequestDto = {
      ...requestDto,
      id: randomUUID().toString(),
      creationDate: new Date(),
    };

    if (this.isDateIsUnacceptable(newRecord)) {
      throw new BadRequestException(this.dateError);
    }

    await this.requests.create(newRecord);

    return newRecord;
  }

  async remove(id: string, userId: string) {
    const removedRequest = await this.requests.remove(id, userId);
    if (!removedRequest) {
      throw new NotFoundException("Can't be removed!");
    }

    return removedRequest;
  }

  async update(id: string, userId: string, updateRequestDto: UpdateRequestDto) {
    const oldRequest = await this.getById(id);
    const newRequest = { ...oldRequest, ...updateRequestDto };

    if (this.isDateIsUnacceptable(newRequest)) {
      throw new BadRequestException(this.dateError);
    }

    await this.requests.update(id, userId, newRequest);
    return newRequest;
  }

  private isDateIsUnacceptable(requestDto: RequestDto) {
    return requestDto.expirationDate
      ? requestDto.creationDate > requestDto.expirationDate
      : false;
  }
}
