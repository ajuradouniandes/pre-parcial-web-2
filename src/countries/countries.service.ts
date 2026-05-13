// countries.service.ts
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';
import { Injectable } from '@nestjs/common';
import { RestCountriesProvider } from './countries.provider';

@Injectable()
export class CountriesService {
    constructor(
        @InjectModel(Country.name)
        private readonly countryModel: Model<CountryDocument>,
        private readonly restCountriesProvider: RestCountriesProvider,
    ) {}

    async resolveByAlphaCode(alphaCode: string): Promise<CountryDocument> {
        const code = alphaCode.toUpperCase();

        const cached = await this.countryModel.findOne({ alphaCode: code }).exec();
        if (cached) return cached;

        const external = await this.restCountriesProvider.fetchByAlphaCode(code);

        const created = new this.countryModel({ ...external });
        return created.save();
    }
}