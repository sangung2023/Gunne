export class CreateUserDto {
    email: string;
    password: string;
    nickname: string;
    
    // 주소 객체도 입력받아야겠죠?
    address: {
      city: string;
      district: string;
      street: string;
    };
  }