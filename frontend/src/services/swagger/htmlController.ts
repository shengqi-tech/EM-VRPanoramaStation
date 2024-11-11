// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除网页标签 GET /html/delete */
export async function deleteHtml(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteHtmlParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/html/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增网页标签 POST /html/insert */
export async function insertHtml(body: API.HtmlAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/html/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑网页标签 POST /html/update */
export async function updateHtml(body: API.HtmlEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/html/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
