declare interface IFaceResponse<T = any> {
  error_code: number;
  error_msg: string;
  log_id: number;
  timestamp: number;
  cached: number;
  result: T;
}

declare interface IFaceSearch {
  face_token: string;
  user_list: {
    group_id: string;
    user_id: string;
    user_info: string;
    score: number;
  }[];
}

declare interface IFaceGroupIdList {
  group_id_list: string[];
}

declare interface IFaceRegister {
  face_token: string;
  location: {
    left: number;
    top: number;
    width: number;
    height: number;
    rotation: number;
  };
}

declare interface IFaceGetList {
  face_list: {
    face_token: string;
    ctime: string;
  }[];
}

declare interface IFaceGetGroupUsers {
  user_id_list: string[];
}
