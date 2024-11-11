// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询组成 GET /composition/findByMap */
export async function findCompositionByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCompositionByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListComposition>('/composition/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
