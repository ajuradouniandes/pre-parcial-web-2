import { Module } from '@nestjs/common';
import { TravelplansService } from './travelplans.service';
import { TravelplansController } from './travelplans.controller';

@Module({
  controllers: [TravelplansController],
  providers: [TravelplansService],
})
export class TravelplansModule {}
