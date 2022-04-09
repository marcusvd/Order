export class UserDto {
  id: number;
  userName: string;
  password: string;
  authenticated: boolean;
  token: string;
  expiration: Date;
  message: string;
}
