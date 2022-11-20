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
  createUsers(user: UserEntity) {
    return this.userRepository.save(user);
  }
}
