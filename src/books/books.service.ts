import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './models/book.model';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  create(createBook: CreateBookDto) {
    const newBook = new this.bookModel(createBook);
    return newBook.save();
  }

  findAll() {
    return this.bookModel.find();
  }

  findOne(id: string) {
    return this.bookModel.findById(id);
  }

  update(id: string, updateBook: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBook, { new: true });
  }

  delete(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }
}
