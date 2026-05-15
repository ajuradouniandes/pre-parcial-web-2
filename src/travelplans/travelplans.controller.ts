import { Controller, Get, Post, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TravelPlansService } from './travelplans.service';
import { CreateTravelPlanDto } from './dto/create-travelplan.dto';
import { expensesDTO } from './dto/expenses.dto';

@Controller('travel-plans')
export class TravelPlansController {
  constructor(private readonly travelPlansService: TravelPlansService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTravelPlanDto) {
    return this.travelPlansService.create(dto);
  }

  @Get()
  findAll() {
    return this.travelPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {  // string, no number — MongoDB usa ObjectId
    return this.travelPlansService.findOne(id);
  }

  @Post(":id/expenses")
  @HttpCode(HttpStatus.CREATED)
  setExpenses(@Body() dto: expensesDTO, @Param('id') id: string) {
    return this.travelPlansService.setExpenses(dto,id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelPlansService.remove(id);
  }
}