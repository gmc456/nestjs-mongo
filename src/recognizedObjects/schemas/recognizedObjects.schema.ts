import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectDetectedSchema } from './objectDetected.schema';
import { ObjectDetected } from './objectDetected.schema';

export type RecognizedObjectDocument = RecognizedObject & Document;

@Schema()
export class RecognizedObject {
  @Prop()
  id_estacion: string;

  @Prop()
  timestamp: Date;  

  @Prop([ObjectDetectedSchema])
  objectsDetected: ObjectDetected[];
}

export const RecognizedObjectSchema = SchemaFactory.createForClass(RecognizedObject);
