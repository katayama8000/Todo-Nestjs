import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('')
  test() {
    return 'test';
  }
  @Get('getAllUsers')
  async getAllUsers() {
    return await this.authService.getUsers();
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() LoginUserDto: LoginUserDto) {
    const { username, password } = LoginUserDto;
    return await this.authService.validateUser(username, password);
  }
}
