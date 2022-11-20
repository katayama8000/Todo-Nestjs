import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../../../typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  createUsers(user: UserEntity): string | void {
    //return this.userRepository.save(user);
    //同じユーザー名が存在するかチェック
    this.userRepository
      .findOneBy({ username: user.username })
      .then((result) => {
        if (result) {
          console.log('同じユーザー名が存在します');
          return '同じユーザー名は登録できません';
        } else {
          this.userRepository.save(user);
        }
      });
  }
}
