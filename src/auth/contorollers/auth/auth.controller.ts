import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  test() {
    return 'test';
  }
  @Get('getAllUsers')
  async getAllUsers() {
    return await this.authService.getUsers();
  }

  @Post('login')
  async login() {
    console.log('login');
  }
}
