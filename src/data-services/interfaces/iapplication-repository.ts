import {
  ApplicationDto,
  ApplicationQueryDto,
  UpdateApplicationDto,
} from 'common/models/applications/dto';

export interface IApplicationRepository {
  getAll(filter?: ApplicationQueryDto): Promise<ApplicationDto[]>;

  getById(id: string): Promise<ApplicationDto | null | undefined>;

  create(dto: ApplicationDto): Promise<ApplicationDto>;

  update(
    id: string,
    dto: UpdateApplicationDto,
  ): Promise<ApplicationDto | null | undefined>;

  remove(id: string): Promise<ApplicationDto | null | undefined>;
}
