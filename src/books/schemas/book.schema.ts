import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookModel } from '../models/book.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookModel }]),
  ],
  exports: [MongooseModule],
})
export class BookModule {}
