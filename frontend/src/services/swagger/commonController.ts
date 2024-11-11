// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除基础标签标签 GET /common/delete */
export async function deleteCommon(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCommonParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/common/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增基础标签标签 POST /common/insert */
export async function insertCommon(body: API.CommonAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/common/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑基础标签标签 POST /common/update */
export async function updateCommon(body: API.CommonEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/common/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
