import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private usersService) {}
  @Get('')
  getUsers() {
    return 'getUsers';
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
