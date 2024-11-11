// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除标签类型 GET /tagtype/delete */
export async function deleteTagtype(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTagtypeParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/tagtype/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询标签类型 GET /tagtype/findByMap */
export async function findTagtypeByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTagtypeByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseListTagtypeVo>('/tagtype/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增标签类型 POST /tagtype/insert */
export async function insertTagtype(body: API.TagtypeAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/tagtype/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑标签类型 POST /tagtype/update */
export async function updateTagtype(body: API.TagtypeEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/tagtype/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传标签类型文件 POST /tagtype/upload */
export async function uploadTagtype(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadTagtypeParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
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

  return request<API.ApiResponseSysfile>('/tagtype/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
