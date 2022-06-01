import {
  Token,
  TokenDocument,
} from 'data-services/data-services-mongo/schemas/token.schema';
import { ITokenRepository } from 'data-services/interfaces/itoken-repository';
import { Model } from 'mongoose';

export class TokenRepositoryMongo implements ITokenRepository {
  constructor(private _repository: Model<TokenDocument>) {}

  getByUserId(userId: string): Promise<Token> {
    return this._repository.findOne({ userId }).exec();
  }

  removeByUserId(userId: string): Promise<Token> {
    return this._repository.findOneAndRemove({ userId }).exec();
  }

  create(token: string, userId: string): Promise<Token> {
    return this._repository.create({ userId, token });
  }
}
