import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApplicationService } from 'applications/applications.service';
import { ApplicationQueryDto } from 'applications/dto/application-query.dto';
import { BaseApplicationDto } from 'applications/dto/base-application.dto';
import { UpdateApplicationDto } from 'applications/dto/update-application.dto';
import { PaginationPipe } from 'pagination/pagination.pipe';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.applicationService.getById(id);
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  getByAttribute(@Query() q: ApplicationQueryDto) {
    return this.applicationService.getFiltered(q);
  }

  @Post()
  create(@Body() createApplicationDto: BaseApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(id, updateApplicationDto);
  }
}
