import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelplansModule } from './travelplans/travelplans.module';

@Module({
  imports: [
    CountriesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pre-parcial'),
    TravelplansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
