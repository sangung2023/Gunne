/**
 * 사용자 관련 상수 정의
 * 단일 소스 원칙: 모든 상수는 여기서 정의하고 스키마와 서비스에서 참조
 */

// 사용자 역할 Enum (타입 안전성과 자동완성 제공)
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// 사용자 기본값 (스키마에서 참조)
export const DEFAULT_MANNER_TEMPERATURE = 36.5;
export const DEFAULT_USER_ROLE = UserRole.USER;

// 비밀번호 해싱 관련 (서비스에서 사용)
export const BCRYPT_SALT_ROUNDS = 10;

// MongoDB 에러 코드
export const MONGO_DUPLICATE_KEY_ERROR_CODE = 11000;

// 에러 메시지
export const ERROR_MESSAGES = {
  EMAIL_ALREADY_EXISTS: '이미 존재하는 이메일입니다.',
} as const;
