// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 新增视频融合标签 POST /videofusion/insert */
export async function insertVideofusion(
  body: API.VideofusionAddPo,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/videofusion/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改视频融合标签 POST /videofusion/update */
export async function updateVideofusion(
  body: API.VideofusionEditPo,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/videofusion/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
