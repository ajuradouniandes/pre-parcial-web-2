import { Test, TestingModule } from '@nestjs/testing';
import { TravelplansService } from './travelplans.service';

describe('TravelplansService', () => {
  let service: TravelplansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelplansService],
    }).compile();

    service = module.get<TravelplansService>(TravelplansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
