import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  constructor(private offset = 0, private limit = 10) {}

  transform(value: any) {
    value.offset = value.offset || this.offset;
    value.limit = value.limit || this.limit;
    return value;
  }
}
