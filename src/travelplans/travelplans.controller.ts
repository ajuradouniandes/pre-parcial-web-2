import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelplansService } from './travelplans.service';
import { CreateTravelplanDto } from './dto/create-travelplan.dto';
import { UpdateTravelplanDto } from './dto/update-travelplan.dto';

@Controller('travelplans')
export class TravelplansController {
  constructor(private readonly travelplansService: TravelplansService) {}

  @Post()
  create(@Body() createTravelplanDto: CreateTravelplanDto) {
    return this.travelplansService.create(createTravelplanDto);
  }

  @Get()
  findAll() {
    return this.travelplansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelplansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelplanDto: UpdateTravelplanDto) {
    return this.travelplansService.update(+id, updateTravelplanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelplansService.remove(+id);
  }
}
