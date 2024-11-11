// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询监测状况 GET /situation/findByMap */
export async function findSituationByMap(options?: { [key: string]: any }) {
  return request<API.ApiResponseListSituationVo>('/situation/findByMap', {
    method: 'GET',
    ...(options || {}),
  });
}
