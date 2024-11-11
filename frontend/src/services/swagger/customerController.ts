// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除客户 GET /customer/delete */
export async function deleteCustomer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCustomerParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/customer/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询客户 GET /customer/findByMap */
export async function findCustomerByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCustomerByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoCustomerVo>('/customer/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增客户 POST /customer/insert */
export async function insertCustomer(body: API.CustomerAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponseint>('/customer/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑客户 POST /customer/update */
export async function updateCustomer(body: API.CustomerEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/customer/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传客户文件 POST /customer/upload */
export async function uploadCustomerLogoFile(
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

  return request<API.ApiResponseSysfile>('/customer/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
