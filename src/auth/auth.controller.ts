import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw new BadRequestException('Could not register user', error.message);
    }
  }

  // @Post('login')
  // async login(@Body() loginDto: LoginAuthDto) {
  //   try {
  //     return await this.authService.login(loginDto);
  //   } catch (error) {
  //     throw new BadRequestException('Could not login user', error.message);
  //   }
  // }
}
