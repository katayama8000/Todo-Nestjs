import { Injectable, Session } from '@nestjs/common';
import { Todo as TodoEntity } from '../../../typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoDto } from 'src/todo/dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async getTodoById(id: number): Promise<TodoEntity> {
    return await this.todoRepository.findOneBy({ id });
  }

  // todoを追加する
  async addTodo(args): Promise<TodoEntity> {
    const newTodo = {
      title: 'aaa',
      completed: false,
      user: { id: 5 },
    };
    const todo = await this.todoRepository.save(newTodo);
    return todo;
  }
}
