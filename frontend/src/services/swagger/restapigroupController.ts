// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询restapi分组 GET /restapigroup/findByMap */
export async function findRestapigroupByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRestapigroupByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListRestapigroupVo>('/restapigroup/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增restapi分组 POST /restapigroup/insert */
export async function insertRestapigroup(body: API.Restapigroup, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/restapigroup/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑restapi分组 POST /restapigroup/update */
export async function updateRestapigroup(body: API.Restapigroup, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/restapigroup/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
