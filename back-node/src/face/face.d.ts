declare interface IFaceResponse<T> {
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
