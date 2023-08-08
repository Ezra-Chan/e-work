import { Test, TestingModule } from '@nestjs/testing';
import { NationController } from './nation.controller';
import { NationService } from './nation.service';

describe('NationController', () => {
  let controller: NationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NationController],
      providers: [NationService],
    }).compile();

    controller = module.get<NationController>(NationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
