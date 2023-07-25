import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中获取token
      ignoreExpiration: false, // 不忽略token过期
      secretOrKey: jwtConstants.secret, // 密钥
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return {
      userId: payload.id,
      loginName: payload.loginName,
      role: payload.role,
      realName: payload.realName,
      avatar: payload.avatar,
    };
  }
}
