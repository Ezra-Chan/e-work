import { Injectable } from '@nestjs/common';
import { face as AipFaceClient } from 'baidu-aip-sdk';

export interface FaceInfo {
  error_code: number;
  error_msg: string;
  log_id: number;
  timestamp: number;
  cached: number;
  result: {
    face_num: number;
    face_list: {
      face_token: string;
      location: {
        left: number;
        top: number;
        width: number;
        height: number;
        rotation: number;
      };
      face_probability: number;
      angle: {
        yaw: number;
        pitch: number;
        roll: number;
      };
      age: number;
      gender: {
        type: 'male' | 'female';
        probability: number;
      };
    }[];
  };
}
export const defaultFaceOptions = {
  face_field: 'age,beauty,expression,emotion,gender,glasses,race,quality,mask',
  group_id_list: 'superManager,manager,employee', // 之前创建的人脸库，可以在百度云的管理控制台查看用户组
  liveness_control: 'HIGH', // 活体控制 检测结果中不符合要求的人脸会被过滤  NORMAL: 一般的活体要求(平衡的攻击拒绝率, 通过率)
  max_user_num: '3', // 最多处理人脸的数目
};
/** * 百度人脸识别 */
@Injectable()
export class FaceService {
  // 新建一个对象，建议只保存一个对象调用服务接口
  static getFaceClient() {
    const {
      BDAI_APP_ID: appId,
      BDAI_API_KEY: accessKey,
      BDAI_SECRET_KEY: secretKey,
    } = process.env;
    const client = new AipFaceClient(appId, accessKey, secretKey);
    return client;
  }

  /**
   * 根据图像获取用户信息
   * @param {string} imageUrl 前端拍照转base64
   * @param {string} [imageType] 图片类型
   * @param {object} [options] 可选参数
   * @returns
   */
  async getFaceInfo(
    imageUrl: string,
    imageType = 'BASE64',
    options = defaultFaceOptions
  ) {
    try {
      const client = FaceService.getFaceClient();
      console.log(client, 'client');
      const faceInfo: FaceInfo = await client.detect(
        imageUrl,
        imageType,
        options
      );
      console.log(faceInfo, 'faceInfo');

      return faceInfo;
    } catch (error) {
      throw new Error(error);
    }
  }
}
