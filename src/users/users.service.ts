import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
