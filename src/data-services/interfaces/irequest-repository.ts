import {
  RequestDto,
  RequestQueryDto,
  UpdateRequestDto,
} from 'common/models/requests/dto';
import { PopulatedRequestDto } from 'common/models/requests/dto/populated-request.dto';

export interface IRequestRepository {
  getAll(filter?: RequestQueryDto): Promise<PopulatedRequestDto[]>;

  getById(id: string): Promise<PopulatedRequestDto | null | undefined>;

  create(dto: RequestDto): Promise<PopulatedRequestDto>;

  update(
    id: string,
    dto: UpdateRequestDto,
  ): Promise<PopulatedRequestDto | null | undefined>;

  remove(
    id: string,
    userId: string,
  ): Promise<PopulatedRequestDto | null | undefined>;

  resign(id: string): Promise<PopulatedRequestDto | null | undefined>;
}
