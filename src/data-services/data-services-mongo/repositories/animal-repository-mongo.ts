import { IAnimalRepository } from 'data-services/interfaces/ianimal-repository';
import { AnimalDto, BaseAnimalDto } from 'common/models/animals/dto';
import { Model } from 'mongoose';
import { AnimalDocument } from '../schemas/animal.schema';

export class AnimalRepositoryMongo implements IAnimalRepository {
  private _repository: Model<AnimalDocument>;

  constructor(repository: Model<AnimalDocument>) {
    this._repository = repository;
  }

  getAll(userId: string): Promise<AnimalDto[]> {
    return this._repository.find({ ownerId: userId }).exec();
  }

  getById(id: string, userId: string): Promise<AnimalDto> {
    return this._repository.findOne({ _id: id, ownerId: userId }).exec();
  }

  create(dto: AnimalDto): Promise<AnimalDto> {
    return this._repository.create(dto);
  }

  update(id: string, userId: string, dto: BaseAnimalDto): Promise<AnimalDto> {
    return this._repository
      .findOneAndUpdate({ _id: id, ownerId: userId }, dto, { new: true })
      .exec();
  }

  remove(id: string, userId: string): Promise<AnimalDto> {
    return this._repository
      .findOneAndRemove({ _id: id, ownerId: userId })
      .exec();
  }
}
