import { useState } from 'react';
import { getPanoramaView } from '@/services/swagger/panoramaController';

export default () => {
  const [customer, setCustomer] = useState<API.PanoramaViewVo>(); // 全景详情数据

  /**
   * 查全客户源信息
   * @param id
   */
  const initCustomer = (customer) => {
    // getPanoramaView({ ems_panorama_id: id }).then((res) => {
    //   setCustomer(res?.result);
    // });
    setCustomer(customer);
  };

  return {
    customer,
    initCustomer
  };
};
