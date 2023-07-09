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
import { Subject, firstValueFrom, map, take } from 'rxjs';

@Controller('recognizedObjects')
@ApiTags('recognizedObject')
export class RecognizedObjectsController {
  firstName: Promise<Number>;
  constructor(private readonly recognizedObjectsService: RecognizedObjectsService,
    private readonly httpService: HttpService) {}

  @Post()
  create(@Body() createRecognizedObjectDto: CreateRecognizedObjectDto) {
    return this.recognizedObjectsService.create(createRecognizedObjectDto);
  }
  
  @Get()
  findAll(@Req() request: Request) {
    return this.recognizedObjectsService.findAll(request);
  }

  @Get('current_detected_objects/:object_type/:space/:building')
  async getCurrentDetectedObjects(@Param('object_type') object_type: string, 
  @Param('space') space: string, @Param('building') building: string) {
    const response = await firstValueFrom(this.httpService.get(`http://localhost:3000/devices/get_id/`+space+`/`+building));
    return this.recognizedObjectsService.getCurrentDetectedObjects(object_type, response.data);
  }  
  @Get('current_full_detected_objects/:space/:building')
  async getCurrentDetectedObjectsFull(@Param('space') space: string, @Param('building') building: string) {
    const response = await firstValueFrom(this.httpService.get(`http://localhost:3000/devices/get_id/`+space+`/`+building));
    return this.recognizedObjectsService.getCurrentFullDetectedObjects(response.data);
  }

  @Get('detected_objects/:object_type/:space/:building/:from/:to')
  async getDetectedObjects(@Param('object_type') object_type: string, 
  @Param('space') space: string, @Param('building') building: string,
  @Param('from') from: Date, @Param('to') to: Date) {
    const response = await firstValueFrom(this.httpService.get(`http://localhost:3000/devices/get_id/`+space+`/`+building));  
    return this.recognizedObjectsService.getDetectedObjects(object_type, response.data, from, to);
  }

  @Get('full_detected_objects/:space/:building/:from/:to')
  async getFullDetectedObjectsFull(@Param('space') space: string, @Param('building',) building: string,
  @Param('from') from: Date, @Param('to') to: Date) {
    console.log(from)
    console.log(to)
    const response = await firstValueFrom(this.httpService.get(`http://localhost:3000/devices/get_id/`+space+`/`+building));  
    return this.recognizedObjectsService.getFullDetectedObjects(response.data, from, to);
  }
}
