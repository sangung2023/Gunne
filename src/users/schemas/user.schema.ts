import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// 1. 주소(Address)를 위한 서브 스키마 정의 (별도 파일로 안 빼고 여기서 바로 정의)
@Schema({ _id: false }) // 주소 객체에는 별도의 _id가 필요 없어서 끕니다.
export class Address {
  @Prop()
  city: string;     // 예: 서울시

  @Prop()
  district: string; // 예: 강남구

  @Prop()
  street: string;   // 예: 역삼동
}

// 2. 메인 유저 스키마
@Schema({ timestamps: true }) // 생성일(createdAt), 수정일(updatedAt) 자동 생성
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // 해싱된 비밀번호 저장

  @Prop({ required: true })
  nickname: string;

  // [핵심 1] 몽고디비 스타일: 주소 테이블을 따로 안 만들고 유저 안에 심어버립니다.
  @Prop({ type: Address }) 
  address: Address;

  // [핵심 2] 찜한 목록 (Product ID들의 배열)
  // 유저가 찜한 상품의 ID들만 배열로 가지고 있습니다.
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  wishList: Types.ObjectId[];

  @Prop({ default: 36.5 }) // 매너온도 기본값
  mannerTemperature: number;

  @Prop({ default: 'user' }) // 관리자('admin') 구분용
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);