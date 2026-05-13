// country.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
    @Prop({ required: true, unique: true })
    alphaCode: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    region: string;

    @Prop()
    capital: string;

    @Prop()
    population: number;

    @Prop()
    flagUrl: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);