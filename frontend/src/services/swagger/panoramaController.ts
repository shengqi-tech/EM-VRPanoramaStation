// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 批量上传全景场景文件 POST /panorama/batchUpload */
export async function batchUploadPanoramaFile(
  body: {},
  file?: File[],
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    file.forEach((f) => formData.append('file', f || ''));
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

  return request<API.ApiResponseListSysfile>('/panorama/batchUpload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 删除全景 GET /panorama/delete */
export async function deletePanorama(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePanoramaParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/panorama/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询全景场景 GET /panorama/findByMap */
export async function findPanoramaByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPanoramaByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoPanoramaViewVo>('/panorama/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询全景场景详情 GET /panorama/getView */
export async function getPanoramaView(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPanoramaViewParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsePanoramaViewVo>('/panorama/getView', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增全景场景 POST /panorama/insert */
export async function insertPanorama(body: API.PanoramaAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/panorama/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置起始页 GET /panorama/setHomePage */
export async function setHomePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setHomePageParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/panorama/setHomePage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 全景排序 GET /panorama/sort */
export async function sort(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sortParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/panorama/sort', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改全景场景 POST /panorama/update */
export async function updatePanorama(body: API.PanoramaEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/panorama/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传全景场景文件 POST /panorama/upload */
export async function uploadPanoramaFile(body: {}, file?: File, options?: { [key: string]: any }) {
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

  return request<API.ApiResponseSysfile>('/panorama/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 上传全景封面 POST /panorama/uploadCover */
export async function uploadCover(body: {}, file?: File, options?: { [key: string]: any }) {
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

  return request<API.ApiResponseSysfile>('/panorama/uploadCover', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
