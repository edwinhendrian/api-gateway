import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  register(createUserDto: CreateUserDto) {
    return this.client.send({ cmd: 'create_user' }, createUserDto);
  }
}
