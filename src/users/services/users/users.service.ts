import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../../../typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUsers(createUserDto: CreateUserDto): Promise<{
    errorMessage: string;
  } | void> {
    const result = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
    if (result) return { errorMessage: `${result.username}は既に存在します` };
  }
}
