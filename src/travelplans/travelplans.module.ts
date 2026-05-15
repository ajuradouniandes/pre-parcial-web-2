import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelPlan, TravelPlanSchema } from './schemas/travelplan.schema';
import { TravelPlansService } from './travelplans.service';
import { TravelPlansController } from './travelplans.controller';
import { CountriesModule } from '../countries/countries.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: TravelPlan.name, schema: TravelPlanSchema }]),
        CountriesModule,
        UsersModule, // agregar
    ],
    controllers: [TravelPlansController],
    providers: [TravelPlansService],
})
export class TravelPlansModule {}