import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApplicationService } from 'applications/applications.service';
import { ApplicationQueryDto } from 'applications/dto/application-query.dto';
import { BaseApplicationDto } from 'applications/dto/base-application.dto';
import { ApplicationDto } from 'applications/dto/create-application.dto';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApplicationDto> {
    return this.applicationService.getById(id);
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
    @Body() createApplicationDto: BaseApplicationDto,
  ): Promise<ApplicationDto> {
    return this.applicationService.create(createApplicationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApplicationDto> {
    return this.applicationService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: BaseApplicationDto,
  ) {
    return this.applicationService.update(id, updateApplicationDto);
  }
}
