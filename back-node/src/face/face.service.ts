import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { face as AipFaceClient } from 'baidu-aip-sdk';
import {
  Message,
  FACE_ERROR_CODE,
  getFaceErrorMessage,
} from 'src/utils/messages';
import { UserService } from 'src/user/user.service';

export const defaultFaceOptions = {
  liveness_control: 'HIGH', // 活体控制 检测结果中不符合要求的人脸会被过滤  NORMAL: 一般的活体要求(平衡的攻击拒绝率, 通过率)
  max_user_num: '1', // 查找后返回的用户数量。返回相似度最高的几个用户，默认为1，最多返回50个。
  match_threshold: '80', // 用户查找的匹配得分阈值。默认为80，范围[0~100]。
};

@Injectable()
export class FaceService {
  private client: AipFaceClient;

  constructor(private readonly userService: UserService) {
    const {
      BDAI_APP_ID: id,
      BDAI_API_KEY: ak,
      BDAI_SECRET_KEY: sk,
    } = process.env;
    const client = new AipFaceClient(id, ak, sk);
    this.client = client;
  }

  /**
   * 根据图像获取用户ID
   * @param {string} imageUrl 前端拍照转base64
   * @param {string} [imageType] 图片类型
   * @param {string} [groupIdList] 用户组
   * @param {object} [options] 可选参数
   * @returns
   */
  async getUserId(
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
            Message.FACE_GROUP_IS_EMPTY,
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
      return this.userService.transformUserInfo(user);
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
    try {
      const groupInfo: IFaceResponse<IFaceGroupIdList> =
        await this.client.getGrouplist();
      this.isSuccess(groupInfo);
      return groupInfo.result.group_id_list;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new Error(error);
    }
  }

  /**
   * 校验接口调用是否成功
   * @returns {boolean} 是否成功
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
        Message.FACE_API_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
