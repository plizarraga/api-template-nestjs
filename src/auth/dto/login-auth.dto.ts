import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class LoginAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    minimum: 6,
    maximum: 20,
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
