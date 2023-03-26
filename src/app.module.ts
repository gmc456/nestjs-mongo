import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { RecognizedObjecsModule } from './recognizedObjects/recognizedObjects.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/recognizedObjects'),
    //UsersModule,
    //BooksModule,
    RecognizedObjecsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
