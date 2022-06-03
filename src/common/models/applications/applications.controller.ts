import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
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
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { UserId } from 'common/decorators/userId.decorator';

@Controller('applications')
@UseGuards(JwtAuthGuard)
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
  create(
    @Body() createApplicationDto: BaseApplicationDto,
    @UserId() userId: string,
  ) {
    return this.applicationService.create(createApplicationDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @UserId() userId: string,
  ) {
    return this.applicationService.remove(id, userId);
  }

  @Put(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @UserId() userId: string,
  ) {
    return this.applicationService.update(id, userId, updateApplicationDto);
  }
}
