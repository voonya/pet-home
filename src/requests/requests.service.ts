import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BaseRequestDto } from 'requests/dto/base-request.dto';
import { RequestQueryDto } from 'requests/dto/request-query.dto';
import { RequestDto } from 'requests/dto/request.dto';
import { UpdateRequestDto } from 'requests/dto/update-request.dto';
import { requests } from 'requests/mock.requests';

@Injectable()
export class RequestService {
  private notFoundMsg = 'Request not found';

  private dateError = 'expirationDate should later than creationDate';

  private getAll() {
    return requests;
  }

  getById(id: string) {
    const foundRequest = requests.find((p) => p.id === id);

    if (!foundRequest) {
      throw new NotFoundException(this.notFoundMsg);
    }

    return foundRequest;
  }

  getFiltered(query: RequestQueryDto) {
    let allRecords = this.getAll();

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

  create(requestDto: BaseRequestDto) {
    const newRecord: RequestDto = {
      ...requestDto,
      id: randomUUID().toString(),
      creationDate: new Date(),
    };

    if (this.isDateIsUnacceptable(newRecord)) {
      throw new BadRequestException(this.dateError);
    }

    requests.push(newRecord);

    return newRecord;
  }

  remove(id: string) {
    const requestToRemove = this.getById(id);

    if (!requestToRemove) {
      throw new NotFoundException(this.notFoundMsg);
    }

    const index = requests.indexOf(requestToRemove);
    requests.splice(index, 1);

    return requestToRemove;
  }

  update(id: string, updateRequestDto: UpdateRequestDto) {
    const oldRequest = this.getById(id);

    if (!oldRequest) {
      throw new NotFoundException(this.notFoundMsg);
    }

    const index = requests.indexOf(oldRequest);
    const newRequest = { ...oldRequest, ...updateRequestDto };

    if (this.isDateIsUnacceptable(newRequest)) {
      throw new BadRequestException(this.dateError);
    }

    requests[index] = newRequest;
    return newRequest;
  }

  private isDateIsUnacceptable(requestDto: RequestDto) {
    return requestDto.expirationDate
      ? requestDto.creationDate > requestDto.expirationDate
      : false;
  }
}
