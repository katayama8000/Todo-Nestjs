import { Module } from '@nestjs/common';
import { TodoService } from './services/todo/todo.service';
import { TodoController } from './controllers/todo/todo.controller';
import { Todo } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
