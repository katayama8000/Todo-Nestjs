import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async validateUser({ username, password }: CreateUserDto): Promise<true> {
    const user = await this.usersService.findOne(username);
    //usersServiceで取得したpasswordをbcrypt.compareで比較
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return isValid;
  }
  async login(user: CreateUserDto) {
    if (await this.validateUser(user)) {
      const payload = { username: user.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
