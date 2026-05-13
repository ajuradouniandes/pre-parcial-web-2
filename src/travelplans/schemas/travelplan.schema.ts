// travel-plan.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TravelPlanDocument = TravelPlan & Document;

@Schema({ timestamps: true })
export class TravelPlan {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    startDate: string;

    @Prop({ required: true })
    endDate: string;

    @Prop({ required: true, length: 3 })
    countryCode: string;
}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);