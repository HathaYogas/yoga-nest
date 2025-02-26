import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JoinDto } from './join.dto';
import { LoginDto } from './login.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({
      email: email,
      password: password,
    });

    if (!user) {
      throw new NotFoundException('이메일과 비밀번호를 확인해 주세요.');
    }
    return user;
  }

  async join(joinDto: JoinDto) {
    try {
      console.log('회원가입 시도:', joinDto); // 로깅 추가

      const joinUser = new this.userModel(joinDto);
      const savedUser = await joinUser.save();

      console.log('회원가입 성공:', savedUser._id); // 성공 로깅
      return savedUser; // 저장된 사용자 데이터 반환
    } catch (error) {
      console.error('회원가입 실패:', error); // 오류 로깅
      throw error;
    }
  }
}
