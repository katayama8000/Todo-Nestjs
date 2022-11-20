import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersModel } from 'src/users/types/users.interface';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private usersService) {}
  @Get('')
  getUsers() {
    return 'getUsers';
  }
  @Get('all')
  async getAllUsersName(): Promise<string[]> {
    const users: UsersModel[] = await this.usersService.getAllUsers();
    return users.map((user) => user.username);
  }

  @Post('create')
  createUsers(@Body() req) {
    console.log(req.username);
    this.usersService.createUsers({
      username: req.username,
      email: req.email,
      password: req.password,
    });
  }
}
