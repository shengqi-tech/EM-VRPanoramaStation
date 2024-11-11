// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询设备 GET /device/findByMap */
export async function findDeviceByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findDeviceByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListDeviceVo>('/device/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
