import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ROLES } from 'src/constants';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register({ email, firstName, lastName, password }: RegisterAuthDto) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: ROLES.ADMIN,
      };
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Could not register user: ' + error.message);
    }
  }

  // async login({ email, password }: LoginAuthDto) {

  // }
}
