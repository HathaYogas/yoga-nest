import { Body, Controller, Post } from '@nestjs/common';
import { JoinDto } from './join.dto';
import { LoginDto } from './login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    console.log('로그인 요청:', loginDto.email);
    // 서비스 메서드 호출
    const user = await this.userService.login(loginDto);
    return user;
  }

  @Post('join')
  async join(@Body() joinDto: JoinDto) {
    console.log('회원가입 요청:', joinDto.email);

    // 서비스 메서드 호출
    const result = await this.userService.join(joinDto);
    return {
      success: true,
      message: '회원가입이 완료되었습니다.',
      user: result,
    };
  }
}
