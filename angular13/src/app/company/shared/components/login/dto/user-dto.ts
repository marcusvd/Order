export class UserDto {
  id: number;
  userName: string;
  password: string;
  passwordConfirm: string;
  authenticated: boolean;
  token: string;
  expiration: Date;
  message: string;
}
