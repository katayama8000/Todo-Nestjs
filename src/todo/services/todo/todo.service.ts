import { Injectable } from '@nestjs/common';
import { Todo as TodoEntity } from '../../../typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
}
