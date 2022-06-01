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
import { ApplicationService } from 'common/models/applications/applications.service';
import {
  ApplicationQueryDto,
  BaseApplicationDto,
  UpdateApplicationDto,
} from 'common/models/applications/dto';
import { PaginationPipe } from 'common/pipes/pagination/pagination.pipe';
import { ObjectIdValidationPipe } from 'common/pipes/object-id/objectid-validation.pipe';

const mockUserId = '6292196de24c7a0c498c3a7b';

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
    return this.applicationService.create(createApplicationDto, mockUserId);
  }

  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.applicationService.remove(id, mockUserId);
  }

  @Put(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(id, mockUserId, updateApplicationDto);
  }
}
