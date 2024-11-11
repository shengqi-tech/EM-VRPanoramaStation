// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除导航标签 POST /navigation/delete */
export async function deleteNavigation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteNavigationParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/navigation/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增导航标签 POST /navigation/insert */
export async function insertNavigation(
  body: API.NavigationAddPo,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/navigation/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑导航标签 POST /navigation/update */
export async function updateNavigation(
  body: API.NavigationEditPo,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/navigation/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
