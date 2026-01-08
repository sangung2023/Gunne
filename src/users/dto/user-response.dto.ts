import { Types } from 'mongoose';

// 비밀번호를 제외한 사용자 응답 타입
export type UserResponseDto = {
  _id: Types.ObjectId | string;
  email: string;
  nickname: string;
  address?: {
    city: string;
    district: string;
    street: string;
  };
  wishList: Types.ObjectId[] | string[];
  mannerTemperature: number;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
};
