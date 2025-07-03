import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { JoinDto } from './join.dto';
import { LoginDto } from './login.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new NotFoundException('이메일과 비밀번호를 확인해 주세요.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    return user;
  }

  async join(joinDto: JoinDto) {
    try {
      console.log('회원가입 시도:', joinDto);

      const user = await this.userModel.findOne({
        email: joinDto.email,
      });
      if (user) {
        throw new NotFoundException('이미 가입된 이메일입니다.');
      } else {
        await this.emailAuth(joinDto.email);
      }

      // bcrypt로 비밀번호 암호화
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(joinDto.password, salt);

      const joinUser = new this.userModel({ ...joinDto, password: hash });
      const savedUser = await joinUser.save();

      console.log('회원가입 성공:', savedUser._id);
      return savedUser; // 저장된 사용자 데이터 반환
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  }

  async emailDuplicate(email: string) {
    try {
      const user = await this.userModel.findOne({
        email: email,
      });
      if (user) {
        throw new NotFoundException('이미 가입된 이메일입니다.');
      } else {
        return true;
      }
    } catch (error) {
      console.error('오류가 발생했습니다. 확인 후 다시 시도해주세요.');
      throw error;
    }
  }

  async emailAuth(email: string) {
    await this.mailerService
      .sendMail({
        // 이메일 전송 정보
        to: email,
        subject: 'Test',
        text: '테스트',

        // 이메일 템플릿 파일
        template: 'email-auth',

        // 동적으로 들어갈 변수 정의
        context: {
          code: 'cf1a3f828287',
          // username: 'Yoga',
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  emailValidate(email: string, code: string) {
    if (code === '0000') {
      return true;
    }
  }
}
