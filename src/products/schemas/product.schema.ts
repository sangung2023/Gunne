import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

// 상품 상태를 위한 서브 스키마 (예: 판매중, 예약중, 판매완료)
@Schema({ _id: false })
export class ProductStatus {
  @Prop({ default: '판매중' })
  status: string; // '판매중', '예약중', '판매완료' 등
}

// 댓글을 위한 서브 스키마
@Schema({ _id: false })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

// 메인 상품 스키마
@Schema({ timestamps: true }) // createdAt, updatedAt 자동 생성
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  // 상태 정보 (embedded document)
  @Prop({ type: ProductStatus, default: () => ({ status: '판매중' }) })
  status: ProductStatus;

  // 이미지 URL 배열
  @Prop({ type: [String], default: [] })
  images: string[];

  // 댓글 배열 (embedded documents)
  @Prop({ type: [Comment], default: [] })
  comments: Comment[];

  // 판매자 ID (User 참조)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sellerId: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
