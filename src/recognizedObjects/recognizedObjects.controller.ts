import { HttpService, Req } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RecognizedObjectsService } from './recognizedObjects.service';
import { CreateRecognizedObjectDto } from './dto/create-recognizedObjects.dto';
import { ParseObjectIdPipe } from '../utilities/parse-object-id-pipe.pipe';

@Controller('recognizedObjects')
@ApiTags('recognizedObject')
export class RecognizedObjectsController {
  constructor(private readonly recognizedObjectsService: RecognizedObjectsService,
    /*private readonly httpService: HttpService*/) {}

  @Post()
  create(@Body() createRecognizedObjectDto: CreateRecognizedObjectDto) {
    return this.recognizedObjectsService.create(createRecognizedObjectDto);
  }
  
  @Get()
  findAll(@Req() request: Request) {
    return this.recognizedObjectsService.findAll(request);
  }

  @Get('current_detected_objects/:object_type/:space/:building')
  getCurrentDetectedObjects(@Param('object_type') object_type: string, 
  @Param('space') space: string, @Param('building') building: string) {
    let count = this.recognizedObjectsService.getCurrentDetectedObjects(object_type, 'portatil-gabriel')
    .then((value) => {
      
    });
  }

  @Get('current_full_detected_objects/:space/:building')
  getCurrentDetectedObjectsFull(@Param('space') space: string, @Param('building') building: string) {
    /*var id_estacion = this.httpService.get(`http://localhost:3000/devices/get_id/{$space}/{$building}`);
    console.log("gaby");
    console.log(id_estacion);*/
    return this.recognizedObjectsService.getCurrentFullDetectedObjects("portatil_gabriel");
  }

  @Get('detected_objects/:object_type/:space/:building/:from/:to')
  getDetectedObjects(@Param('object_type') object_type: string, 
  @Param('space') space: string, @Param('building') building: string,
  @Param('from') from: Date, @Param('to') to: Date) {
    return this.recognizedObjectsService.getDetectedObjects(object_type, 'portatil-gabriel', from, to);
  }

  @Get('full_detected_objects/:space/:building/:from/:to')
  getFullDetectedObjectsFull(@Param('space') space: string, @Param('building',) building: string,
  @Param('from') from: Date, @Param('to') to: Date) {
    return this.recognizedObjectsService.getFullDetectedObjects('portatil-gabriel', from, to);
  }
}
