import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
