// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除导览 GET /guide/delete */
export async function deleteGuide(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteGuideParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/guide/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询导览 GET /guide/findByMap */
export async function findGuideByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findGuideByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoGuideVo>('/guide/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增导览 POST /guide/insert */
export async function insertGuide(body: API.GuideAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/guide/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导览排序 GET /guide/sort */
export async function sortGuide(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sortGuideParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/guide/sort', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑导览 POST /guide/update */
export async function updateGuide(body: API.GuideEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/guide/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传导览封面文件 POST /guide/upload */
export async function uploadGuideFile(body: {}, file?: File, options?: { [key: string]: any }) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.ApiResponseSysfile>('/guide/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
