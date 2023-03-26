import { Module } from '@nestjs/common';
import { RecognizedObjectsService } from './recognizedObjects.service';
import { RecognizedObjectsController } from './recognizedObjects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecognizedObject, RecognizedObjectSchema } from './schemas/recognizedObjects.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RecognizedObject.name, schema: RecognizedObjectSchema }]),
  ],
  controllers: [RecognizedObjectsController],
  providers: [RecognizedObjectsService],
})
export class RecognizedObjecsModule {}
