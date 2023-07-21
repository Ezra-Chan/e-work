import * as svgCaptcha from 'svg-captcha';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  login(@Body() body: any, @Session() session: any) {
    return this.authService.login(body, session);
  }

  @ApiOperation({ summary: '人脸登录' })
  @Post('faceLogin')
  faceLogin(@Body() body: any) {
    return this.authService.faceLogin(body.base);
  }

  @ApiOperation({ summary: '退出登录' })
  @Post('logout')
  logout(@Req() req: any) {
    req.session.destroy();
    return;
  }

  @ApiOperation({ summary: '获取验证码' })
  @Get('captcha')
  getCaptcha(@Req() req: any, @Res() res: any, @Session() session: any) {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 2,
      color: true,
      ignoreChars: '0o1i',
    });
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
