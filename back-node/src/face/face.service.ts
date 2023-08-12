import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { face as AipFaceClient } from 'baidu-aip-sdk';
import { FACE_ERROR_CODE, getFaceErrorMessage } from 'src/utils/messages';
import { FaceMessage } from './constant';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { ISimpleUser } from 'src/utils/types';
import { CreateFaceDto } from './dto/create-face.dto';

export const defaultFaceOptions = {
  liveness_control: 'NORMAL', // 活体控制 检测结果中不符合要求的人脸会被过滤  NORMAL: 一般的活体要求(平衡的攻击拒绝率, 通过率)
  max_user_num: '1', // 查找后返回的用户数量。返回相似度最高的几个用户，默认为1，最多返回50个。
  match_threshold: '80', // 用户查找的匹配得分阈值。默认为80，范围[0~100]。
};

export const defaultFaceRegisterOptions = {
  quality_control: 'NORMAL', // 图片质量控制
  liveness_control: 'NORMAL', // 活体检测控制
};

@Injectable()
export class FaceService {
  private client: AipFaceClient;

  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService
  ) {
    const {
      BDAI_APP_ID: id,
      BDAI_API_KEY: ak,
      BDAI_SECRET_KEY: sk,
    } = process.env;
    const client = new AipFaceClient(id, ak, sk);
    this.client = client;
  }

  /**
   * 根据图像获取用户信息
   * @param {string} imageUrl 前端拍照转base64
   * @param {string} [imageType] 图片类型
   * @param {string} [groupIdList] 用户组
   * @param {object} [options] 可选参数
   * @returns
   */
  async getUserInfo(
    imageUrl: string,
    imageType = 'BASE64',
    groupIdList?: string,
    options = defaultFaceOptions
  ) {
    try {
      // 如果没有传入用户组id列表，则获取用户组列表
      if (!groupIdList) {
        const list = await this.getGroupList();
        if (!list?.length) {
          throw new HttpException(
            FaceMessage.FACE_GROUP_IS_EMPTY,
            HttpStatus.BAD_REQUEST
          );
        }
        groupIdList = list.join(',');
      }
      // 调用人脸搜索
      const faceInfo: IFaceResponse<IFaceSearch> = await this.client.search(
        imageUrl,
        imageType,
        groupIdList,
        options
      );
      this.isSuccess(faceInfo);
      const { user_list = [] } = faceInfo.result;
      if (!user_list.length) {
        throw new HttpException(
          FACE_ERROR_CODE['222207'],
          HttpStatus.BAD_REQUEST
        );
      }
      const { user_id } = user_list[0];
      const user = await this.userService.findOne(+user_id);
      await this.userService.checkEnabled(user);
      return await this.userService.transformUserInfo(user);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new Error(error);
    }
  }

  /**
   * 查询用户组列表
   * @returns 用户组id列表
   */
  async getGroupList(): Promise<string[]> {
    const groupInfo: IFaceResponse<IFaceGroupIdList> = await this.faceApi(
      'getGrouplist'
    );
    return groupInfo.result.group_id_list;
  }

  /**
   * 人脸注册
   * @param imageUrl 前端拍照转base64
   * @param imageType 图片类型
   */
  async faceRegister(
    body: CreateFaceDto,
    user: ISimpleUser,
    imageType = 'BASE64'
  ) {
    try {
      const { base, userId, roleId } = body;
      if (userId && roleId) {
        const { id, realName, deptName, loginName, sex, role } =
          await this.userService.findOne(+userId);
        user = {
          ...user,
          id,
          realName,
          deptName,
          loginName,
          sex,
          roleName: role.name,
        };
      }
      const { id, realName, deptName, loginName, sex, roleName } = user;
      const user_info = JSON.stringify({
        id,
        realName,
        deptName,
        loginName,
        sex,
      });
      return await this.faceApi('addUser', {
        args: [
          base,
          imageType,
          roleName,
          id,
          { ...defaultFaceRegisterOptions, user_info },
        ],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 人脸删除
   * @param userId 用户id
   * @param groupId 用户组id
   * @param faceToken 人脸标识
   */
  async faceDelete(userId: string, groupId: string, faceToken: string) {
    return await this.faceApi('deleteUser', {
      args: [userId, groupId, faceToken],
    });
  }

  /**
   * 创建用户组
   * @param groupId 用户组id
   */
  async addGroup(groupId: number) {
    return await this.faceApi('groupAdd', {
      args: [groupId],
    });
  }

  /**
   * 删除用户组
   * @param groupId 用户组id
   * @description 删除用户组下所有用户及人脸
   */
  async deleteGroup(groupId: number) {
    return await this.faceApi('groupDelete', {
      args: [groupId],
    });
  }

  /**
   * 获取用户人脸列表
   * @param userId 用户id
   * @param groupId 用户组id
   * @returns 人脸列表
   */
  async faceGetList(userId: string, groupId: string) {
    return await this.faceApi('faceGetlist', {
      args: [userId, groupId],
    });
  }

  /**
   * 获取指定用户组中的用户列表
   * @param groupId 用户组id
   * @returns 用户列表
   */
  async getGroupUsers(groupId: string) {
    return await this.faceApi('getGroupUsers', {
      args: [groupId],
    });
  }

  /**
   * 自动创建用户组
   *
   */
  async autoCreateGroup() {
    const list = await this.getGroupList();
    const roles = await this.roleService.findAll();
    for (const role of roles) {
      if (!list.includes(role.id + '')) {
        await this.addGroup(role.id);
      }
    }
  }

  /**
   * 封装人脸API
   * @param func 函数名
   * @param params
   * @param params.args 参数
   * @param params.operation 其它操作
   */
  async faceApi(func: string, params: any = {}) {
    try {
      const res: IFaceResponse = await this.client[func](
        ...(params.args || [])
      );
      this.isSuccess(res);
      if (params.operation) {
        await params.operation(res);
      }
      return res;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new Error(error);
    }
  }

  /**
   * 校验接口调用是否成功
   * @returns 是否成功
   */
  isSuccess(res: IFaceResponse<any>) {
    if (res) {
      if (res.error_code !== 0)
        throw new HttpException(
          FACE_ERROR_CODE[res.error_code] ||
            getFaceErrorMessage(res.error_code + '') ||
            res.error_msg,
          HttpStatus.BAD_REQUEST
        );
    } else {
      throw new HttpException(
        FaceMessage.FACE_API_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
