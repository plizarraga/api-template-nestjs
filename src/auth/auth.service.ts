import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ROLES } from 'src/constants';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
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
      this.logger.error(`${error.stack}`);
      // Unique constraint violation (e.g., duplicate email)
      if (error.code === '23505') {
        // TODO - Create custom error exception for duplicate email
        throw new BadRequestException(
          'Email already exists. Please choose a different email.',
        );
      }
      throw new UnprocessableEntityException(
        'Could not register user. Please try again later.',
      );
    }
  }

  async login({ email, password }: LoginAuthDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where({ email })
        .getOne();

      if (!user) {
        // TODO - Create custom error exception for user not found
        throw new Error(`User/Email not found: ${email}`);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        // TODO - Create custom error exception for wrong password
        throw new Error('Wrong password');
      }
      const payload = { sub: user.id, email: user.email, role: user.role };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(`${error.stack}`);
      throw new UnauthorizedException(
        'Invalid email or password. Please try again.',
      );
    }
  }
}
