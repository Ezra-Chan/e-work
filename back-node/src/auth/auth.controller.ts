import * as svgCaptcha from 'svg-captcha';
import type { Response, Request } from 'express';
import { Controller, Get, Post, Body, Req, Res, Session } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ description: '用户名、密码和验证码' })
  @Public()
  @Post('login')
  login(@Body() body: any, @Session() session: any, @Req() req: Request) {
    return this.authService.login(body, session, req);
  }

  @ApiOperation({ summary: '人脸登录' })
  @Public()
  @Post('faceLogin')
  faceLogin(@Body() body: any, @Req() req: Request) {
    return this.authService.faceLogin(body.base, req);
  }

  @ApiOperation({ summary: '退出登录' })
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }

  @ApiOperation({ summary: '获取验证码' })
  @Public()
  @Get('captcha')
  getCaptcha(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: any
  ) {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 2,
      color: true,
      ignoreChars: '0o1i',
    });
    if (req.rawHeaders.join().includes('apifox')) {
      res.set('code', captcha.text);
    }
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
