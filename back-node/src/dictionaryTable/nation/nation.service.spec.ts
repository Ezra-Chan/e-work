import { Test, TestingModule } from '@nestjs/testing';
import { NationService } from './nation.service';

describe('NationService', () => {
  let service: NationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NationService],
    }).compile();

    service = module.get<NationService>(NationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
