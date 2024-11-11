// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除菜单项 GET /item/delete */
export async function deleteItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteItemParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/item/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询菜单项 GET /item/findByMap */
export async function findItemByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findItemByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListItem>('/item/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据用户查询菜单项 GET /item/findMenusByUserId */
export async function findMenusByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findMenusByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListItem>('/item/findMenusByUserId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增菜单项 POST /item/insert */
export async function insertItem(body: API.ItemAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/item/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑菜单项 POST /item/update */
export async function updateItem(body: API.ItemEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/item/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
