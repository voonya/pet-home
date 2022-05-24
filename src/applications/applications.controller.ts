import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApplicationService } from './applications.service';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { ApplicationDto } from './dto/application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  private notFoundMsg = 'Application not found';

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApplicationDto> {
    const application = await this.applicationService.getById(id);

    if (application) {
      return application;
    }

    throw new NotFoundException(this.notFoundMsg);
  }

  @Get()
  async getByAttribute(
    @Query() q: ApplicationQueryDto,
  ): Promise<ApplicationDto[]> {
    return this.applicationService.getFiltered(q);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationDto> {
    return this.applicationService.create(createApplicationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApplicationDto> {
    const removedApplication = await this.applicationService.remove(id);

    if (removedApplication) {
      return removedApplication;
    }

    throw new NotFoundException(this.notFoundMsg);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: CreateApplicationDto,
  ) {
    const updatedApplication = this.applicationService.update(
      id,
      updateApplicationDto,
    );

    if (updateApplicationDto) {
      return updatedApplication;
    }

    throw new NotFoundException(this.notFoundMsg);
  }
}
