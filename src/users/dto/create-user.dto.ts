import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class AddressDto {
  @ApiProperty({
    description: '시/도',
    example: '서울시',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: '구/군',
    example: '강남구',
  })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({
    description: '동/읍/면',
    example: '역삼동',
  })
  @IsString()
  @IsNotEmpty()
  street: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 필수입니다.' })
  email: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'password123',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  password: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: '홍길동',
  })
  @IsString()
  @IsNotEmpty({ message: '닉네임은 필수입니다.' })
  nickname: string;

  @ApiPropertyOptional({
    description: '사용자 주소',
    type: AddressDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}
