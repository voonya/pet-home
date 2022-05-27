import { RequestDto } from 'requests/dto';

export interface IRequestRepository {
  getAll(): Promise<RequestDto[]>;

  getById(id: string): Promise<RequestDto | null | undefined>;

  create(dto: RequestDto): Promise<RequestDto>;

  update(
    id: string,
    userId: string,
    dto: RequestDto,
  ): Promise<RequestDto | null | undefined>;

  remove(id: string, userId: string): Promise<RequestDto | null | undefined>;
}
