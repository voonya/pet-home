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
import { RequestService } from 'common/models/requests/requests.service';
import {
  BaseRequestDto,
  RequestQueryDto,
  UpdateRequestDto,
} from 'common/models/requests/dto';
import { PaginationPipe } from 'common/pipes/pagination/pagination.pipe';
import { ObjectIdValidationPipe } from 'common/pipes/object-id/objectid-validation.pipe';

const mockUserId = '62911964a7afaf9b1059a2ff';

@Controller('requests')
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
  create(@Body() createRequestDto: BaseRequestDto) {
    return this.requestsService.create(createRequestDto, mockUserId);
  }

  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.requestsService.remove(id, mockUserId);
  }

  @Put(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    return this.requestsService.update(id, mockUserId, updateRequestDto);
  }

  @Put(':requestId/assign/:applicationId')
  assign(
    @Param('requestId', ObjectIdValidationPipe) requestId: string,
    @Param('applicationId', ObjectIdValidationPipe) applicationId: string,
  ) {
    return this.requestsService.assign(requestId, applicationId, mockUserId);
  }

  @Put(':requestId/resign')
  resign(@Param('requestId', ObjectIdValidationPipe) requestId: string) {
    return this.requestsService.resign(requestId, mockUserId);
  }
}
