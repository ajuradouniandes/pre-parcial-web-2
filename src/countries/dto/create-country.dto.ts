// dto/create-country.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsUrl, Length } from 'class-validator';

export class CreateCountryDto {
    @IsString()
    @Length(3, 3)
    alphaCode: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    region: string;

    @IsString()
    capital: string;

    @IsNumber()
    population: number;

    @IsUrl()
    flagUrl: string;
}