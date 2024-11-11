// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 调度日志列表 GET /joblog/findByMap */
export async function findLogByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLogByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoXxlJobLogVo>('/joblog/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 调度日志 GET /joblog/logDetail */
export async function logDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.logDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/joblog/logDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 执行日志 GET /joblog/logDetailCat */
export async function logDetailCat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.logDetailCatParams,
  options?: { [key: string]: any },
) {
  return request<API.ReturnTLogResult>('/joblog/logDetailCat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
