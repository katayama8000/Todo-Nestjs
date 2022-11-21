import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersModel } from 'src/users/types/users.interface';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private usersService: UsersService) {}
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
  @UsePipes(ValidationPipe)
  async createUsers(@Body() CreateUserDto: CreateUserDto) {
    const res = await this.usersService.createUsers(CreateUserDto);
    if (res) return res;
  }
}
