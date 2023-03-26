import { ApiProperty } from '@nestjs/swagger';
import { ObjectDetected } from '../schemas/objectDetected.schema';

export class CreateRecognizedObjectDto {
  @ApiProperty({
    example: 'portatil-gabriel',
  })
  readonly id_estacion: string;

  @ApiProperty({ example: '10-10-2022-00:00:01' })
  readonly timestamp: string;

  @ApiProperty({ example: '[{"object":"perro", "value":0.90}, {"object":"gato", "value":0.95}]' })
  readonly objectsDetected: ObjectDetected[];
}
