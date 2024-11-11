// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询调度任务 GET /jobinfo/findByMap */
export async function findJobInfoByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findJobInfoByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoXxlJobInfoVo>('/jobinfo/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增调度任务 POST /jobinfo/insert */
export async function insertJobInfo(body: API.XxlJobInfoAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponsestring>('/jobinfo/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询下次执行时间 GET /jobinfo/nextTriggerTime */
export async function nextTriggerTime(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.nextTriggerTimeParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListstring>('/jobinfo/nextTriggerTime', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除调度任务 GET /jobinfo/remove */
export async function remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsestring>('/jobinfo/remove', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 启动调度任务 GET /jobinfo/start */
export async function start(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsestring>('/jobinfo/start', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 停止调度任务 GET /jobinfo/stop */
export async function stop(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.stopParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsestring>('/jobinfo/stop', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 执行一次调度任务 GET /jobinfo/trigger */
export async function triggerJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.triggerJobParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsestring>('/jobinfo/trigger', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑调度任务 POST /jobinfo/update */
export async function updateJobInfo(body: API.XxlJobInfoEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponsestring>('/jobinfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
