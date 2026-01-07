import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

// 메시지를 위한 서브 스키마
@Schema({ _id: false })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

// 메인 채팅 스키마
@Schema({ timestamps: true }) // createdAt, updatedAt 자동 생성
export class Chat {
  // 상품 ID (Product 참조)
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  // 참여자 ID 배열 (User 참조)
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  // 메시지 배열 (embedded documents)
  @Prop({ type: [Message], default: [] })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
