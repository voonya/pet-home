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
import { RequestService } from 'requests/requests.service';
import {
  BaseRequestDto,
  RequestQueryDto,
  UpdateRequestDto,
} from 'requests/dto';
import { PaginationPipe } from 'pagination/pagination.pipe';

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
    return this.requestsService.create(createRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(id, updateRequestDto);
  }
}
