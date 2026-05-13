import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { HttpModule } from '@nestjs/axios';
import { RestCountriesProvider } from './countries.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    HttpModule,
  ],
  providers: [CountriesService, RestCountriesProvider],
  exports: [CountriesService],
})
export class CountriesModule {}