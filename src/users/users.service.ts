import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  BCRYPT_SALT_ROUNDS,
  MONGO_DUPLICATE_KEY_ERROR_CODE,
  ERROR_MESSAGES,
} from './constants/user.constants';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // DTO에서 유효성 검증이 완료된 상태로 도달
    try {
      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        BCRYPT_SALT_ROUNDS,
      );

      // 사용자 생성 데이터 준비
      // 기본값(mannerTemperature, role)은 스키마에서 자동으로 설정됨
      const userData = {
        email: createUserDto.email,
        password: hashedPassword,
        nickname: createUserDto.nickname,
        address: createUserDto.address,
      };

      // 사용자 생성
      const createdUser = await this.userModel.create(userData);
      return createdUser;
    } catch (error: any) {
      // MongoDB duplicate key error (이메일 중복)
      if (error.code === MONGO_DUPLICATE_KEY_ERROR_CODE) {
        throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
      }
      // 다른 에러는 그대로 전파
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // TODO: 구현 예정
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_id: number, _updateUserDto: unknown) {
    return `This action updates a user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
