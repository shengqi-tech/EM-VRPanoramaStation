// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询已分配用户的监测站点 GET /instance/findAssignInstance */
export async function findAssignInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAssignInstanceParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoInstanceVo>('/instance/findAssignInstance', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据条件查询检测站点，没有就查询全部 GET /instance/findByMap */
export async function findInstanceByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findInstanceByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoListInstanceVo>('/instance/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加监测站点 POST /instance/insert */
export async function insertInstance(body: API.InstanceAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/instance/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 保存自定义模板 POST /instance/saveTemplate */
export async function setHobby(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setHobbyParams,
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

  return request<API.ApiResponse>('/instance/saveTemplate', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 设置是否开放 POST /instance/setHare */
export async function setHare(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setHareParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/instance/setHare', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 上传监测站点文件 POST /instance/upload */
export async function uploadInstanceFile(body: {}, file?: File, options?: { [key: string]: any }) {
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

  return request<API.ApiResponseSysfile>('/instance/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
