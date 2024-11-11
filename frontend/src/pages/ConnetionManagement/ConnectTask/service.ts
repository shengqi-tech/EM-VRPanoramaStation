import { request } from 'umi';
import type { CardListItemDataType,DeviceModel } from './data.d';

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: CardListItemDataType[] } }> {
  return request('/api/card_fake_list', {
    params,
  });
}





/** 获取用户列表 GET /api/query */
export async function getDevices(
  params: {
    // query
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
  } & Partial<DeviceModel.Device>,
  options?: { [key: string]: any },
) : Promise<API.ApiResponse<DeviceModel.DeviceList>>{
  return request<API.ApiResponse<DeviceModel.DeviceList>>('/api/device/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}