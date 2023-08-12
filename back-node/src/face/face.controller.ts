import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { FaceService } from './face.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ISimpleUser } from 'src/utils/types';
import { CreateFaceDto } from './dto/create-face.dto';

@ApiTags('人脸')
@Controller('face')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @ApiOperation({ summary: '人脸注册' })
  @ApiBody({ type: CreateFaceDto, description: '人脸信息' })
  @Post()
  register(@Body() body: any, @Req() req: Request) {
    return this.faceService.faceRegister(body, req.user as ISimpleUser);
  }

  @ApiOperation({ summary: '获取用户人脸列表' })
  @Post('user/list')
  getUserFaceList(@Body() body: any, @Req() req: Request) {
    let { userId, roleId } = body;
    const user = req.user as ISimpleUser;
    !userId && (userId = user.id);
    !roleId && (roleId = user.roleId);
    return this.faceService.faceGetList(userId, roleId);
  }

  @ApiOperation({ summary: '获取用户组列表' })
  @Get('group')
  getGroupList() {
    return this.faceService.getGroupList();
  }

  @ApiOperation({ summary: '自动注册用户组' })
  @Post('group')
  autoCreateGroup() {
    return this.faceService.autoCreateGroup();
  }
}
