import 'dotenv/config';
import { join } from 'path';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as requestIp from 'request-ip';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpFilter } from 'src/common/filter';
import { TransformInterceptor } from 'src/common/response';
import { AppModule } from './app.module';
import { getRealPort } from './utils/getRealPort';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 异常过滤器
  app.useGlobalFilters(new HttpFilter());
  // 响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 参数验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 静态资源
  app.useStaticAssets(join(__dirname, 'files'), {
    prefix: '/files',
  });
  app.use(bodyParser.json({ limit: '1mb' }));
  // 跨域
  app.enableCors();
  // session
  app.use(
    session({
      secret: 'ework',
      name: 'ework.sid',
      rolling: true,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 1 },
    })
  );
  // ip
  app.use(requestIp.mw());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('e-work信息化办公管理系统')
    .setDescription('e-work信息化办公管理系统接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  const [realPort, msg] = await getRealPort(+process.env.SYS_PORT || 8000);
  await app.listen(realPort, () => {
    msg && Logger.warn(msg);
    Logger.log(`App running at:
- Local:   http://localhost:${realPort}
- Swagger: http://localhost:${realPort}/api-docs`);
  });
}
bootstrap();
