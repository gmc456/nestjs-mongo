import { Injectable } from '@nestjs/common';
import { CreateRecognizedObjectDto } from './dto/create-recognizedObjects.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RecognizedObject, RecognizedObjectDocument } from './schemas/recognizedObjects.schema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class RecognizedObjectsService {
  constructor(
    @InjectModel(RecognizedObject.name) private readonly recognizedObjectModel: Model<RecognizedObjectDocument>,
  ) {}

  async create(createRecognizedObjectDto: CreateRecognizedObjectDto): Promise<RecognizedObject> {
    return this.recognizedObjectModel.create(createRecognizedObjectDto);
  }
  
  async findAll(request: Request): Promise<RecognizedObject[]> {
    return this.recognizedObjectModel
      .find(request.query)
      //.populate({ path: 'comments.username' })
      .setOptions({ sanitizeFilter: true })
      .exec();
  }
}
