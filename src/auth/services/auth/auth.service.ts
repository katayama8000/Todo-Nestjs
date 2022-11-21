import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { UsersModel } from 'src/users/types/users.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async getUsers() {
    return await this.usersService.getAllUsers();
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UsersModel | { errorMessage: string }> {
    const user = await this.usersService.getUsersByUserName(username);
    if (user) {
      if (user.password === password) {
        return user;
      } else {
        return { errorMessage: 'パスワードが違います' };
      }
    } else {
      return { errorMessage: 'ユーザーが存在しません' };
    }
  }
}
