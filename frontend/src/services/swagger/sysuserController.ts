// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 分配检测站点 POST /sysuser/assignInstance */
export async function assignInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.assignInstanceParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/sysuser/assignInstance', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分配角色 POST /sysuser/assignRoles */
export async function assignRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.assignRolesParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/sysuser/assignRoles', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 校验验证码 GET /sysuser/checkCode */
export async function checkCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/sysuser/checkCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除用户 GET /sysuser/delete */
export async function deleteSysuser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSysuserParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/sysuser/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询用户 GET /sysuser/findByMap */
export async function findSysuserByMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findSysuserByMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseTableDataInfoSysuserVo>('/sysuser/findByMap', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /sysuser/getCurrentUser */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.ApiResponseSysuserVo>('/sysuser/getCurrentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询用户详情 GET /sysuser/getView */
export async function getSysuserView(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSysuserViewParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseSysuserViewVo>('/sysuser/getView', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增用户 POST /sysuser/insert */
export async function insertSysuser(body: API.SysuserAddPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/sysuser/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录 POST /sysuser/login */
export async function login(body: API.LoginBody, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/sysuser/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注销 GET /sysuser/loginOut */
export async function loginOut(options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/sysuser/loginOut', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 个人设置 POST /sysuser/personalSetting */
export async function personalSetting(body: API.SysuserEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/sysuser/personalSetting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置密码 POST /sysuser/resetPwd */
export async function resetPwd(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetPwdParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/sysuser/resetPwd', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取手机验证码 GET /sysuser/smsCode */
export async function smsCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.smsCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/sysuser/smsCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 手机验证码登录 POST /sysuser/smsLogin */
export async function smsLogin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.smsLoginParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponse>('/sysuser/smsLogin', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑用户 POST /sysuser/update */
export async function updateSysuser(body: API.SysuserEditPo, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/sysuser/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传用户文件 POST /sysuser/upload */
export async function uploadUserFile(body: {}, file?: File, options?: { [key: string]: any }) {
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

  return request<API.ApiResponseSysfile>('/sysuser/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
