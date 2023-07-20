import * as md5 from 'md5';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { decrypt } from 'src/utils/decrypt';
import { User } from 'src/user/entities/user.entity';

type UserInfo = User & { role_id: number; department_id: number };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(body: any, session: any) {
    const { loginName, password, code = '' } = body;
    if (code.toLowerCase() !== session.code?.toLowerCase()) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }
    return await this.validateUser(loginName, password);
  }

  async validateUser(loginName: string, password: string) {
    const user = (await this.userService.findOneBy(
      'loginName',
      loginName
    )) as UserInfo;
    if (user) {
      const decryptedPassword = decrypt(password);
      if (user.password !== md5(decryptedPassword)) {
        throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
      }
      const { id, realName, role_id: role, loginName, avatar } = user;
      const info = { id, realName, role, loginName, avatar };
      const token = this.jwtService.sign(info);
      return { info, token };
    }
    throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
