// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询产品 GET /product/findByMap */
export async function findProductByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findProductByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListProductVo>('/product/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
