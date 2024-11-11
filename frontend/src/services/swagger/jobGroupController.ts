// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询执行器 GET /jobgroup/findByMap */
export async function findJobGroupByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findJobGroupByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoXxlJobGroupVo>('/jobgroup/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增执行器 POST /jobgroup/insert */
export async function insertJobGroup(body: API.XxlJobGroupAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponsestring>('/jobgroup/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询执行器注册节点 GET /jobgroup/loadById */
export async function loadById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loadByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseXxlJobGroup>('/jobgroup/loadById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑执行器 POST /jobgroup/update */
export async function updateJobGroup(
  body: API.XxlJobGroupEditPo,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsestring>('/jobgroup/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
