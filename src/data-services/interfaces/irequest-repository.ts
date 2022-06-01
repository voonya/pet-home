import {
  RequestDto,
  RequestQueryDto,
  UpdateRequestDto,
} from 'common/models/requests/dto';

export interface IRequestRepository {
  getAll(filter?: RequestQueryDto): Promise<RequestDto[]>;

  getById(id: string): Promise<RequestDto | null | undefined>;

  create(dto: RequestDto): Promise<RequestDto>;

  update(
    id: string,
    dto: UpdateRequestDto,
  ): Promise<RequestDto | null | undefined>;

  remove(id: string, userId: string): Promise<RequestDto | null | undefined>;

  resign(id: string): Promise<RequestDto | null | undefined>;
}
