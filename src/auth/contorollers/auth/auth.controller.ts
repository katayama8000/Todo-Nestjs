import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  UsePipes,
  Session,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import { User } from 'src/typeorm';
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
  @Get('all')
  async getAllUsers() {
    return await this.authService.getUsers();
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signin(
    @Body() LoginUserDto: LoginUserDto,
    @Session() session: Record<string, any>,
  ): Promise<User | { errorMessage: string }> {
    const { username, password } = LoginUserDto;
    const user = await this.authService.validateUser(username, password);
    if ('errorMessage' in user) return user;
    session.userId = user.id;
    return user;
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signup(
    @Body() LoginUserDto: LoginUserDto,
    @Session() session: Record<string, any>,
  ): Promise<{ errorMessage: string } | { message: string }> {
    const user = await this.userService.createUsers(LoginUserDto);
    if ('errorMessage' in user) return user;
    session.userId = user.id;
    return { message: 'ユーザーを作成しました' };
  }

  @Get('signout')
  signout(@Session() session) {
    session.userId = null;
    return { message: 'ログアウトしました' };
  }

  @Get('session')
  getSession(@Session() session: Record<string, any>) {
    console.log(session.userId);
    return session;
  }
}
