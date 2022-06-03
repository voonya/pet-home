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
import { UserId } from 'common/decorators/userId.decorator';

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
  create(@Body() createRequestDto: BaseRequestDto, @UserId() userId: string) {
    return this.requestsService.create(createRequestDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @UserId() userId: string,
  ) {
    return this.requestsService.remove(id, userId);
  }

  @Put(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateRequestDto: UpdateRequestDto,
    @UserId() userId: string,
  ) {
    return this.requestsService.update(id, userId, updateRequestDto);
  }

  @Put(':requestId/assign/:applicationId')
  assign(
    @Param('requestId', ObjectIdValidationPipe) requestId: string,
    @Param('applicationId', ObjectIdValidationPipe) applicationId: string,
    @UserId() userId: string,
  ) {
    return this.requestsService.assign(requestId, applicationId, userId);
  }

  @Put(':requestId/resign')
  resign(
    @Param('requestId', ObjectIdValidationPipe) requestId: string,
    @UserId() userId: string,
  ) {
    return this.requestsService.resign(requestId, userId);
  }
}
