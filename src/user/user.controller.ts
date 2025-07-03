import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { JoinDto } from './join.dto';
import { LoginDto } from './login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '로그인' })
  async login(@Body() loginDto: LoginDto) {
    console.log('로그인 요청:', loginDto.email);

    // 서비스 메서드 호출
    const user = await this.userService.login(loginDto);
    return user;
  }

  @Post('join')
  @ApiOperation({ summary: '회원가입' })
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

  @Post('email-duplicate')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
      required: ['email'],
    },
  })
  @ApiOperation({ summary: '이메일 중복 확인' })
  async emailDuplicate(@Body() dto: { email: string }) {
    return this.userService.emailDuplicate(dto.email);
  }

  @Post('email-auth')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
      required: ['email'],
    },
  })
  @ApiOperation({ summary: '인증 메일 전송' })
  async emailAuth(@Body() dto: { email: string }) {
    return this.userService.emailAuth(dto.email);
  }

  @Post('email-validate')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        code: { type: 'string' },
      },
      required: ['email', 'code'],
    },
  })
  @ApiOperation({ summary: '인증 번호 확인' })
  emailValidate(@Body() dto: { email: string; code: string }) {
    return this.userService.emailValidate(dto.email, dto.code);
  }
}
