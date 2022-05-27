import { ApplicationDto } from 'applications/dto';

export interface IApplicationRepository {
  getAll(): Promise<ApplicationDto[]>;

  getById(id: string): Promise<ApplicationDto | null | undefined>;

  create(dto: ApplicationDto): Promise<ApplicationDto>;

  update(
    id: string,
    userId: string,
    dto: ApplicationDto,
  ): Promise<ApplicationDto | null | undefined>;

  remove(
    id: string,
    userId: string,
  ): Promise<ApplicationDto | null | undefined>;
}
