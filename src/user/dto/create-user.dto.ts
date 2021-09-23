import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  secondName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
