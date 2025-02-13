import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Controller('users')
export class UsersController {
  @Post()
  login(@Body() loginDto: LoginDto) {
    const userId = loginDto.userId;
    console.log(userId);
    return userId;
  }
}
