// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询配置 GET /configuration/findByMap */
export async function findConfigurationByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findConfigurationByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListConfiguration>('/configuration/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
