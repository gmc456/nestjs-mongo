import { ApiProperty } from '@nestjs/swagger';
import { ObjectDetected } from '../schemas/objectDetected.schema';

export class CreateRecognizedObjectDto {
  @ApiProperty({
    example: 'portatil-gabriel',
  })
  readonly id_estacion: string;

  @ApiProperty({ example: '2022-04-15T01:00:00Z' })
  readonly timestamp: Date;

  @ApiProperty({ example: '[{"object":"perro", "value":0.90}, {"object":"gato", "value":0.95}]' })
  readonly objectsDetected: ObjectDetected[];
}
