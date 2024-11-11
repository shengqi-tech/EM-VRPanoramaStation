// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 新增看点 POST /lookpoint/insert */
export async function insertLookpoint(body: API.LookpointAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/lookpoint/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑看点 POST /lookpoint/update */
export async function updateLookpoint(body: API.LookpointEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/lookpoint/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
