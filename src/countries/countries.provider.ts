// rest-countries.provider.ts
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class RestCountriesProvider {
  private readonly logger = new Logger(RestCountriesProvider.name);
  private readonly BASE_URL = 'https://restcountries.com/v3.1';

  constructor(private readonly httpService: HttpService) {}

  async fetchByAlphaCode(alphaCode: string): Promise<CreateCountryDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<any[]>(`${this.BASE_URL}/alpha/${alphaCode}`),
      );

      const country = Array.isArray(data) ? data[0] : data;

      const dto = new CreateCountryDto();
      dto.alphaCode = alphaCode.toUpperCase();
      dto.name = country.name?.common ?? '';
      dto.region = country.region ?? '';
      dto.capital = Array.isArray(country.capital) ? country.capital[0] : (country.capital ?? '');
      dto.population = country.population ?? 0;
      dto.flagUrl = country.flags?.png ?? country.flags?.svg ?? '';

      return dto;
    } catch (error) {
      this.logger.error(`Failed to fetch country "${alphaCode}"`, error?.message);
      throw new HttpException(
        `Country with code "${alphaCode}" not found in external API`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}