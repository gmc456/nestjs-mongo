import { Req } from '@nestjs/common';
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
  constructor(private readonly recognizedObjectsService: RecognizedObjectsService) {}

  @Post()
  create(@Body() createRecognizedObjectDto: CreateRecognizedObjectDto) {
    return this.recognizedObjectsService.create(createRecognizedObjectDto);
  }
  
  @Get()
  findAll(@Req() request: Request) {
    return this.recognizedObjectsService.findAll(request);
  }
}
