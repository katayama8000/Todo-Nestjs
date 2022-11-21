import { Controller, Get } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get('')
  test() {
    return 'testTodo';
  }
}
