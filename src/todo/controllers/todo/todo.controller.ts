import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { TodoDto } from 'src/todo/dto/todo.dto';
import { TodoService } from 'src/todo/services/todo/todo.service';
import { Todo as TodoEntity } from 'src/typeorm';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get('')
  test() {
    return 'testTodo';
  }

  @Get('all')
  async getAllTodos(): Promise<TodoEntity[] | { errorMessage: string }> {
    const todo = await this.todoService.getAllTodos();
    if (todo.length === 0) return { errorMessage: 'todoがありません' };
    return todo;
  }

  @Post('add')
  async addTodo(
    @Body() todoDto: TodoDto,
    @Session() session: Record<string, any>,
  ) {
    console.log(session.userId, todoDto);
    // if (!session.userId) {
    //   return { errorMessage: 'ログインしてください' };
    // }
    session.userId = 4;
    const todo = await this.todoService.addTodo({
      ...todoDto,
      user_id: session.userId,
    });
    return todo;
  }
}
