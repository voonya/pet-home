import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BaseRequestDto } from 'requests/dto/base-request.dto';
import { RequestQueryDto } from 'requests/dto/request-query.dto';
import { RequestDto } from 'requests/dto/request.dto';
import { UpdateRequestDto } from 'requests/dto/update-request.dto';
import { requests } from 'requests/mock.requests';

@Injectable()
export class RequestService {
  private notFoundMsg = 'Request not found';

  getAll() {
    return requests;
  }

  getById(id: string) {
    const foundRequest = requests.find((p) => p.id === id);

    if (foundRequest) {
      return foundRequest;
    }

    throw new NotFoundException(this.notFoundMsg);
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

    return allRecords;
  }

  create(requestDto: BaseRequestDto) {
    const newRecord: RequestDto = {
      ...requestDto,
      id: randomUUID().toString(),
      creationDate: new Date(),
    };

    requests.push(newRecord);

    return newRecord;
  }

  remove(id: string) {
    const requestToRemove = this.getById(id);

    if (requestToRemove) {
      const index = requests.indexOf(requestToRemove);
      requests.splice(index, 1);

      return requestToRemove;
    }

    throw new NotFoundException(this.notFoundMsg);
  }

  update(id: string, updateRequestDto: UpdateRequestDto) {
    const oldRequest = this.getById(id);

    if (oldRequest) {
      const index = requests.indexOf(oldRequest);
      const newRequest = { ...oldRequest, ...updateRequestDto };
      requests[index] = newRequest;
      return newRequest;
    }

    throw new NotFoundException(this.notFoundMsg);
  }
}
