import { Test, TestingModule } from '@nestjs/testing';
import { RecognizedObjectsController } from './recognizedObjects.controller';
import { RecognizedObjectsService } from './recognizedObjects.service';

describe('RecognizedObjectsController', () => {
  let controller: RecognizedObjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecognizedObjectsController],
      providers: [RecognizedObjectsService],
    }).compile();

    controller = module.get<RecognizedObjectsController>(RecognizedObjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
