import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class expensesDTO {

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    category: string;
}