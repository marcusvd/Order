export class UserDto {
  id: number;
  userName: string;
  password: string;
  confirmpassword: string;
  authenticated: boolean;
  token: string;
  expiration: Date;
  message: string;
}
