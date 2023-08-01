import { Test, TestingModule } from '@nestjs/testing';
import { FaceController } from './face.controller';

describe('FaceController', () => {
  let controller: FaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaceController],
    }).compile();

    controller = module.get<FaceController>(FaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
