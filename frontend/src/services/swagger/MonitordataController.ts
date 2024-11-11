// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询污染物历史数据 GET /monitordata/hisValue */
export async function hisValue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hisValueParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/monitordata/hisValue', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询历史工况数据 GET /monitordata/workHisValue */
export async function workHisValue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.workHisValueParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/monitordata/workHisValue', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
