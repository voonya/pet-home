import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ApplicationQueryDto,
  BaseApplicationDto,
  UpdateApplicationDto,
} from 'applications/dto';
import { IDataServices } from 'data-services/interfaces/idata-services';

@Injectable()
export class ApplicationService {
  constructor(private dataServices: IDataServices) {}

  private notFoundMsg = 'Application not found';

  private async isRequestActual(id: string) {
    const request = await this.dataServices.requests.getById(id);
    return request.expirationDate ? new Date() < request.expirationDate : true;
  }

  async getById(id: string) {
    const foundApplication = await this.dataServices.applications.getById(id);

    if (!foundApplication) {
      throw new NotFoundException(this.notFoundMsg);
    }

    return foundApplication;
  }

  async getFiltered(query: ApplicationQueryDto) {
    return this.dataServices.applications.getAll(query);
  }

  async create(applicationDto: BaseApplicationDto, userId: string) {
    if (!(await this.isRequestActual(applicationDto.requestId))) {
      throw new BadRequestException('Request is expired');
    }

    const request = await this.dataServices.requests.getById(
      applicationDto.requestId,
    );
    if (request.userId === userId) {
      throw new BadRequestException("Can't apply to own request");
    }

    const filteringExpression: ApplicationQueryDto = {
      userId: userId,
      requestId: applicationDto.requestId,
    };
    const applications = await this.getFiltered(filteringExpression);

    if (applications.length !== 0) {
      throw new BadRequestException('You has already applied to this request');
    }

    const newApplication = {
      ...applicationDto,
      userId: userId,
    };
    console.log(newApplication);
    await this.dataServices.applications.create(newApplication);

    return applicationDto;
  }

  async remove(id: string, userId: string) {
    const removedApplication = await this.getById(id);
    if (removedApplication.userId !== userId) {
      throw new BadRequestException('You can remove only own application');
    }

    const request = await this.dataServices.requests.getById(
      removedApplication.requestId,
    );
    if (request?.assignedApplicationId === removedApplication._id) {
      throw new BadRequestException("Can't delete an assigned application");
    }

    await this.dataServices.applications.remove(id);

    return removedApplication;
  }

  async update(
    id: string,
    userId: string,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    const oldApplication = await this.getById(id);

    if (oldApplication.userId !== userId) {
      throw new BadRequestException('You can update only own application');
    }

    const newApplication = { ...oldApplication, ...updateApplicationDto };

    if (!this.isRequestActual(newApplication.requestId)) {
      throw new BadRequestException('Request does not exist');
    }

    const request = await this.dataServices.requests.getById(
      newApplication.requestId,
    );
    if (request ? request.assignedApplicationId === newApplication._id : true) {
      throw new BadRequestException("Can't update an assigned application");
    }

    await this.dataServices.applications.update(id, newApplication);
    return newApplication;
  }
}
