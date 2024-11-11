// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除结果映射表 GET /resultmap/delete */
export async function deleteParams(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteParamsParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/resultmap/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增结果映射 POST /resultmap/insert */
export async function insertResultmap(body: API.ResultmapAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/resultmap/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑结果映射表 POST /resultmap/update */
export async function updateResultmap(body: API.ResultmapEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/resultmap/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
