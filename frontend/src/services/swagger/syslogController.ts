// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询日志 GET /syslog/findByMap */
export async function findSyslogByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findSyslogByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoSyslog>('/syslog/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
