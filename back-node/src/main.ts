import 'dotenv/config';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpFilter } from 'src/common/filter';
import { TransformInterceptor } from 'src/common/response';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 异常过滤器
  app.useGlobalFilters(new HttpFilter());
  // 响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 参数验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 静态资源
  app.useStaticAssets(join(__dirname, 'uploads'), {
    prefix: '/files',
  });
  // 跨域
  app.enableCors();

  // swagger
  const config = new DocumentBuilder()
    .setTitle('e-work信息化办公管理系统')
    .setDescription('e-work信息化办公管理系统接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(process.env.SYS_PORT);
}
bootstrap();
