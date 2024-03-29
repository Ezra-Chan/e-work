import * as md5 from 'md5';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { FaceService } from 'src/face/face.service';
import { decrypt } from 'src/utils/decrypt';
import { AuthMessage } from './constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly faceService: FaceService
  ) {}

  async login(body: any, session: any, req: any) {
    const { loginName, password, code = '' } = body;
    if (code.toLowerCase() !== session.code?.toLowerCase()) {
      throw new HttpException(
        AuthMessage.LOGIN_CAPTCHA_ERROR,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.validateUser(loginName, password, req);
  }

  /**
   * 根据图像信息验证用户
   * @param base 图像信息
   * @returns 用户信息和token 或者 抛出异常
   */
  async faceLogin(base: string, req: any) {
    const info = await this.faceService.getUserInfo(base);
    this.userService.update(info.id, {
      lastLoginTime: new Date(),
      lastLoginIp: req.clientIp,
    });
    const token = this.jwtService.sign(info);
    return { info, token };
  }

  /**
   * 根据登录名和密码验证用户
   * @param loginName 登录名
   * @param password 密码
   * @returns 用户信息和token 或者 抛出异常
   */
  async validateUser(loginName: string, password: string, req: any) {
    const user = await this.userService.findOneBy('loginName', loginName, true);
    if (user) {
      // 检查用户是否被禁用
      await this.userService.checkEnabled(user);
      // 检查密码是否正确
      const decryptedPassword = decrypt(password);
      if (user.password !== md5(decryptedPassword)) {
        throw new HttpException(
          AuthMessage.ERROR_LOGIN_NAME_OR_PASSWORD,
          HttpStatus.BAD_REQUEST
        );
      }
      this.userService.update(user.id, {
        lastLoginTime: new Date(),
        lastLoginIp: req.clientIp,
      });
      const info = await this.userService.transformUserInfo(user);
      const token = this.jwtService.sign(info);
      return { info, token };
    }
    throw new HttpException(
      AuthMessage.ERROR_LOGIN_NAME_OR_PASSWORD,
      HttpStatus.BAD_REQUEST
    );
  }

  logout(req: any, res: Response) {
    req.session.destroy();
    res.clearCookie('token');
    return true;
  }
}
