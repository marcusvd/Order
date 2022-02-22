export class UserDto {
  id: number;
  username: string;
  password: string;
  confirmpassword: string;
  authenticated: boolean;
  token: string;
  expiration: Date;
  message: string;
}
