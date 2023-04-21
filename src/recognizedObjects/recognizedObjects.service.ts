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

  async getCurrentDetectedObjects(object_type: string, id_estacion: string): Promise<Number> {
    return this.recognizedObjectModel.aggregate([{$match: {id_estacion: id_estacion}}, {$sort: {timestamp: -1}},
      {$limit: 1}, {$unwind: '$objectsDetected'}, {$group: {_id: '$objectsDetected.object', count: {$sum: 1}}},
      {$match:{_id: object_type}}]).exec().then((value) => {
        return value[0]['count'];
      });
  }
  
  async getCurrentFullDetectedObjects(id_estacion: any): Promise<Object> {
    return this.recognizedObjectModel.aggregate([{$match: {id_estacion: id_estacion}}, {$sort: {timestamp: -1}},
      {$limit: 1}, {$unwind: '$objectsDetected'}, {$group: {_id: '$objectsDetected.object', count: {$sum: 1}}}]).exec();
  }
                             
  async getDetectedObjects(object_type: string, id_estacion: string, from: Date, to: Date): Promise<Number> {
    return this.recognizedObjectModel.aggregate([
      {$match: {id_estacion: id_estacion, timestamp: { $gte: new Date(from), $lte: new Date(to) }}}, {$sort: {timestamp: -1}},
      {$unwind: '$objectsDetected'}, {$group: {_id: '$objectsDetected.object', count: {$sum: 1}}},
      {$match:{_id: object_type}}]).exec().then((value) => {
        return value[0]['count'];
      });
  }

  async getFullDetectedObjects(id_estacion: string, from: Date, to: Date): Promise<Object> {
    return this.recognizedObjectModel.aggregate([
      {$match: {id_estacion: id_estacion, timestamp: { $gte: new Date(from), $lte: new Date(to) }}}, {$sort: {timestamp: -1}}, 
      {$unwind: '$objectsDetected'}, 
      {$group: {_id: {date: '$timestamp', objects: '$objectsDetected.object'}, count: {$sum: 1}}},
      {$group: {_id: '$_id.date', tobjects: {$push: {object: '$_id.objects', total: '$count'}}}}]).exec();
  }
}
