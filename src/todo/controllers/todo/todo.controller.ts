import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoDto } from 'src/todo/dto/todo.dto';
import { TodoService } from 'src/todo/services/todo/todo.service';
import { Todo, Todo as TodoEntity, User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
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

  @Get('add')
  async addTodo(
    //@Body() todoDto: TodoDto,
    @Session() session: Record<string, any>,
  ) {
    console.log(session.userId);
    // if (!session.userId) {
    //   return { errorMessage: 'ログインしてください' };
    // }
    // session.userId = 4;
    // const todo = await this.todoService.addTodo({
    //   ...todoDto,
    //   user_id: session.userId,
    // });
    // return todo;

    const user = await this.userRepository.create({
      username: 'honoka',
      email: 'honoka.1029@gmail.com',
      password: 'honoka1029',
    });

    const todosample = {
      title: 'clean the room',
      completed: false,
    };

    const todo = this.todoRepository.create(todosample);
    await this.todoRepository.save(todo);
    user.todos = [todo];
    await this.userRepository.save(user);
  }
}
