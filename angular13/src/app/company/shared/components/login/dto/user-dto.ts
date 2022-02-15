export class UserDto {
  id: number;
  email: string;
  password: string;
  confirmpassword: string;
  authenticated: boolean;
  token: string;
  expiration: Date;
  message: string;
}
