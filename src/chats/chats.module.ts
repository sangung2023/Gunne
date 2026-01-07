import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  exports: [MongooseModule], // 다른 모듈에서 Chat 모델을 사용할 수 있도록 export
})
export class ChatsModule {}
