import { Module } from '@nestjs/common';
import { AnimalsController } from 'animals/animals.controller';
import { AnimalsService } from 'animals/animals.service';
import { DataServicesModule } from '../data-services/data-services.module';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
  imports: [DataServicesModule],
})
export class AnimalsModule {}
