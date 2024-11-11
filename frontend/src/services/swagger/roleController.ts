// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除角色 GET /role/delete */
export async function deleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/role/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询角色详情 GET /role/getView */
export async function getRoleView(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleViewParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseRoleViewVo>('/role/getView', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增角色 POST /role/insert */
export async function insertRoleByMap(body: API.RoleAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/role/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询角色 GET /role/role */
export async function findRoleByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRoleByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoRole>('/role/role', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑角色 POST /role/update */
export async function updateRoleByMap(body: API.RoleEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/role/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
