// travel-plan.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types} from 'mongoose';

export type TravelPlanDocument = TravelPlan & Document;

@Schema({ _id: false })
export class Expense {
    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    category: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

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

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ type: [ExpenseSchema], default: [] })
    expenses: Expense[];
}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);