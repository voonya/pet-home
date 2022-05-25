import { Module } from '@nestjs/common';
import { AnimalsController } from 'animals/animals.controller';
import { AnimalsService } from 'animals/animals.service';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
