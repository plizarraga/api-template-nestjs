import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from '../../constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}
