import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelplanDto } from './create-travelplan.dto';

export class UpdateTravelplanDto extends PartialType(CreateTravelplanDto) {}
