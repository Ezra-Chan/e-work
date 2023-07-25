import * as svgCaptcha from 'svg-captcha';
import { Controller, Get, Post, Body, Req, Res, Session } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('验证')
// @Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ description: '用户名、密码和验证码' })
  @Public()
  @Post('login')
  login(@Body() body: any, @Session() session: any) {
    return this.authService.login(body, session);
  }

  @ApiOperation({ summary: '人脸登录' })
  @Public()
  @Post('faceLogin')
  faceLogin(@Body() body: any) {
    return this.authService.faceLogin(body.base);
  }

  @ApiOperation({ summary: '退出登录' })
  @Post('logout')
  logout(@Req() req: any) {
    return this.authService.logout(req);
  }

  @ApiOperation({ summary: '获取验证码' })
  @Public()
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
