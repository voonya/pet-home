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
import { RequestService } from 'common/models/requests/requests.service';
import {
  BaseRequestDto,
  RequestQueryDto,
  UpdateRequestDto,
} from 'common/models/requests/dto';
import { PaginationPipe } from 'common/pipes/pagination/pagination.pipe';
import { ObjectIdValidationPipe } from 'common/pipes/object-id/objectid-validation.pipe';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { User } from 'common/decorators/user.decorator';
import { UserDto } from 'common/models/users/dto';

@Controller('requests')
@UseGuards(JwtAuthGuard)
export class RequestsController {
  constructor(private requestsService: RequestService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.requestsService.getById(id);
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  getByAttribute(@Query() q: RequestQueryDto) {
    return this.requestsService.getFiltered(q);
  }

  @Post()
  create(@Body() createRequestDto: BaseRequestDto, @User() user: UserDto) {
    return this.requestsService.create(createRequestDto, user._id.toString());
  }

  @Delete(':id')
  remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @User() user: UserDto,
  ) {
    return this.requestsService.remove(id, user._id.toString());
  }

  @Put(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateRequestDto: UpdateRequestDto,
    @User() user: UserDto,
  ) {
    return this.requestsService.update(
      id,
      user._id.toString(),
      updateRequestDto,
    );
  }

  @Put(':requestId/assign/:applicationId')
  assign(
    @Param('requestId', ObjectIdValidationPipe) requestId: string,
    @Param('applicationId', ObjectIdValidationPipe) applicationId: string,
    @User() user: UserDto,
  ) {
    return this.requestsService.assign(
      requestId,
      applicationId,
      user._id.toString(),
    );
  }

  @Put(':requestId/resign')
  resign(
    @Param('requestId', ObjectIdValidationPipe) requestId: string,
    @User() user: UserDto,
  ) {
    return this.requestsService.resign(requestId, user._id.toString());
  }
}
