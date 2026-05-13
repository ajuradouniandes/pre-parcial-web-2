// dto/create-travel-plan.dto.ts
import { IsString, IsNotEmpty, IsDateString, Length, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isAfterStartDate', async: false })
class IsAfterStartDateConstraint implements ValidatorConstraintInterface {
    validate(endDate: string, args: ValidationArguments): boolean {
        const obj = args.object as CreateTravelPlanDto;
        if (!obj.startDate || !endDate) return true;
        return new Date(endDate) >= new Date(obj.startDate);
    }
    defaultMessage(): string {
        return 'endDate must be on or after startDate';
    }
}

export class CreateTravelPlanDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    @IsNotEmpty()
    startDate: string;

    @IsDateString()
    @IsNotEmpty()
    @Validate(IsAfterStartDateConstraint)
    endDate: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 3)
    countryCode: string;
}