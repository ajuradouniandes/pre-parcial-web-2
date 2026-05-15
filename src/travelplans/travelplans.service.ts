import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TravelPlan, TravelPlanDocument } from './schemas/travelplan.schema';
import { CreateTravelPlanDto } from './dto/create-travelplan.dto';
import { CountriesService } from '../countries/countries.service';
import { expensesDTO } from './dto/expenses.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectModel(TravelPlan.name)
    private readonly travelPlanModel: Model<TravelPlanDocument>,
    private readonly countriesService: CountriesService,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateTravelPlanDto): Promise<TravelPlanDocument> {
      await this.usersService.findOne(dto.userId);
      await this.countriesService.resolveByAlphaCode(dto.countryCode);

      const created = new this.travelPlanModel({
          ...dto,
          countryCode: dto.countryCode.toUpperCase(),
      });
      return created.save();
  }


  async findAll(): Promise<TravelPlanDocument[]> {
    return this.travelPlanModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<TravelPlanDocument> {
    const plan = await this.travelPlanModel.findById(id).exec();
    if (!plan) throw new NotFoundException(`Travel plan ${id} not found`);
    return plan;
  }

  async remove(id: string): Promise<{ message: string }> {
    const plan = await this.findOne(id);
    await plan.deleteOne();
    return { message: `Travel plan ${id} deleted successfully` };
  }

  async setExpenses(dto: expensesDTO, id: string): Promise<TravelPlanDocument> {
    const plan = await this.findOne(id);
    plan.expenses.push(dto);
    return plan.save();
  }


}