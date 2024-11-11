// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 调度统计信息 GET /report/chartInfo */
export async function chartInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chartInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseReportVo>('/report/chartInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
