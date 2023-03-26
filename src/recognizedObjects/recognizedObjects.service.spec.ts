import { Test, TestingModule } from '@nestjs/testing';
import { RecognizedObjectsService } from './recognizedObjects.service';

describe('RecognizedObjectsService', () => {
  let service: RecognizedObjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecognizedObjectsService],
    }).compile();

    service = module.get<RecognizedObjectsService>(RecognizedObjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
