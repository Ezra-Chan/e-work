import * as md5 from 'md5';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FaceService } from 'src/common/face/face.service';
import { decrypt } from 'src/utils/decrypt';
import { User } from 'src/user/entities/user.entity';
import { Message } from 'src/utils/messages';

type OriginInfo = {
  role_id: number;
  department_id: number;
};

type UserInfo = User & OriginInfo;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly faceService: FaceService
  ) {}

  async login(body: any, session: any) {
    const { loginName, password, code = '' } = body;
    if (code.toLowerCase() !== session.code?.toLowerCase()) {
      throw new HttpException(
        Message.LOGIN_CAPTCHA_ERROR,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.validateUser(loginName, password);
  }

  /**
   * 根据图像信息验证用户
   * @param base 图像信息
   * @returns 用户信息和token 或者 抛出异常
   */
  async faceLogin(base: string) {
    const info = await this.faceService.getFaceInfo(base);
    console.log(info);
    return info;
  }

  /**
   * 根据登录名和密码验证用户
   * @param loginName 登录名
   * @param password 密码
   * @returns 用户信息和token 或者 抛出异常
   */
  async validateUser(loginName: string, password: string) {
    const user = (await this.userService.findOneBy(
      'loginName',
      loginName
    )) as UserInfo;
    if (user) {
      const decryptedPassword = decrypt(password);
      if (user.password !== md5(decryptedPassword)) {
        throw new HttpException(
          Message.ERROR_LOGIN_NAME_OR_PASSWORD,
          HttpStatus.BAD_REQUEST
        );
      }
      const { id, realName, role_id: role, loginName, avatar } = user;
      const info = { id, realName, role, loginName, avatar };
      const token = this.jwtService.sign(info);
      return { info, token };
    }
    throw new HttpException(
      Message.ERROR_LOGIN_NAME_OR_PASSWORD,
      HttpStatus.BAD_REQUEST
    );
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
