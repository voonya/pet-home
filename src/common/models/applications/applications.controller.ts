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
import { User } from 'common/decorators/user.decorator';
import { UserDto } from 'common/models/users/dto';

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
    @User() user: UserDto,
  ) {
    return this.applicationService.create(
      createApplicationDto,
      user._id.toString(),
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @User() user: UserDto,
  ) {
    return this.applicationService.remove(id, user._id.toString());
  }

  @Put(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @User() user: UserDto,
  ) {
    return this.applicationService.update(
      id,
      user._id.toString(),
      updateApplicationDto,
    );
  }
}
