import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;
}
