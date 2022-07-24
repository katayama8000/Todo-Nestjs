import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll(): CreateUserDto[] {
    return this.userService.findAll();
  }
  @Post()
  create(@Body() createUser: CreateUserDto) {
    console.log(createUser);
    //return createUser;
    this.userService.create(createUser);
  }
}
