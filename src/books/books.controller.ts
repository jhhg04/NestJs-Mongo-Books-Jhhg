import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BooksService } from './books.service';
import { Book } from './models/book.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBook: CreateBookDto): Promise<Book> {
    try {
      return await this.booksService.create(createBook);
    } catch (error) {
      if (error.code === 11000) {
        // Código de error 11000 indica un conflicto de duplicación (por ejemplo, índice único duplicado)
        throw new ConflictException('Book already exists');
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const book = await this.booksService.findOne(id);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBook: UpdateBookDto) {
    try {
      return await this.booksService.update(id, updateBook);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const book = await this.booksService.delete(id);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      throw error;
    }
  }
}
