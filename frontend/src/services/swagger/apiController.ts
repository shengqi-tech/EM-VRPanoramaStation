// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 调用测试 POST /api/callTest */
export async function callTest(body: API.ApiAddPo, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/callTest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除平台对接表 GET /api/delete */
export async function deleteApi(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteApiParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/api/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询平台对接表 GET /api/findByMap */
export async function findApiByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findApiByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoApiVo>('/api/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增平台对接表 POST /api/insert */
export async function insertApi(body: API.ApiAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponseint>('/api/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑平台对接表 POST /api/update */
export async function updateApi(body: API.ApiEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/api/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
