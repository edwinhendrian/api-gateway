import { HttpException, Inject, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/index';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  register(registerDto: RegisterDto) {
    return this.client.send({ cmd: 'register' }, registerDto).pipe(
      catchError((err) => {
        throw new HttpException(err.response, err.status);
      }),
      map((res) => {
        return res;
      }),
    );
  }

  login(loginDto: LoginDto) {
    return this.client.send({ cmd: 'login' }, loginDto).pipe(
      catchError((err) => {
        throw new HttpException(err.response, err.status);
      }),
      map((res) => {
        return res;
      }),
    );
  }

  validateToken(token: string) {
    return this.client.send({ cmd: 'validate_token' }, token).pipe(
      catchError((err) => {
        throw new HttpException(err.response, err.status);
      }),
      map((res) => {
        return res;
      }),
    );
  }
}
