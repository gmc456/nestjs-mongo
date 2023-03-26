import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ObjectDetectedDocument = ObjectDetected & Document;

@Schema()
export class ObjectDetected {
  @Prop()
  object: string;

  @Prop()
  value: number;
}

export const ObjectDetectedSchema = SchemaFactory.createForClass(ObjectDetected);
