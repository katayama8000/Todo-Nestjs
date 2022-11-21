import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async getUsers() {
    return await this.usersService.getAllUsers();
  }
}
