import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
