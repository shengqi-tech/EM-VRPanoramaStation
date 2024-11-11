// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除产品属性 GET /property/delete */
export async function deletePropery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteProperyParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/property/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增产品属性 POST /property/insert */
export async function insertProperty(body: API.PropertyAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/property/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑产品属性 POST /property/update */
export async function updateProperty(body: API.PropertyEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/property/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
