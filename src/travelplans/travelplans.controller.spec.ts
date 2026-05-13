import { Test, TestingModule } from '@nestjs/testing';
import { TravelplansController } from './travelplans.controller';
import { TravelplansService } from './travelplans.service';

describe('TravelplansController', () => {
  let controller: TravelplansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelplansController],
      providers: [TravelplansService],
    }).compile();

    controller = module.get<TravelplansController>(TravelplansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
