// import { IRequestRepository } from 'data-services/interfaces/irequest-repository';
// import { Model } from 'mongoose';
// import { RequestDocument } from 'data-services/data-services-mongo/schemas/requests.schema';
// import { RequestDto } from 'requests/dto';

// export class RequestRepositoryMongo implements IRequestRepository {
//   constructor(private _repository: Model<RequestDocument>) {}

//   async getAll(): Promise<RequestDto[]> {
//     return this._repository.find().exec();
//   }

//   getById(id: string): Promise<RequestDto> {
//     throw new Error('Method not implemented.');
//   }

//   create(dto: RequestDto): Promise<RequestDto> {
//     throw new Error('Method not implemented.');
//   }

//   update(id: string, dto: RequestDto): Promise<RequestDto> {
//     throw new Error('Method not implemented.');
//   }

//   remove(id: string): Promise<RequestDto> {
//     throw new Error('Method not implemented.');
//   }
// }
