import { Token } from 'data-services/data-services-mongo/schemas/token.schema';

export interface ITokenRepository {
  getByUserId(userId: string): Promise<Token>;

  removeByUserId(userId: string): Promise<Token>;

  create(token: string, userId: string): Promise<Token>;
}
