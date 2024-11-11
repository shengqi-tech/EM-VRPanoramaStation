// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询站房报警 GET /devicealarm/findByStationId */
export async function findByStationId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByStationIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListDeviceAlarmVo>('/devicealarm/findByStationId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
