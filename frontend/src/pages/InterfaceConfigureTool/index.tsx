/*
 * @Author: hugangyong 609210276@qq.com
 * @Date: 2023-12-04 17:27:39
 * @LastEditors: hugangyong 609210276@qq.com
 * @LastEditTime: 2023-12-20 11:01:42
 * @FilePath: \em360station-backend\src\pages\InterfaceConfigureTool\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from 'react';
import { history, useParams, useModel, useRequest } from 'umi';
import { getPanoramaView } from '@/services/swagger/panoramaController';
import { Resizable } from 're-resizable';

import styles from './index.less';
import './index.less';
// import LabelManagement from './components/LabelManagement';
import MenuManagement from './components/MenuManagement';
// import CenterPanel from './components/CenterPanel';
import BottomPanel from './components/BottomPanel';
import TopPanel from './components/TopPanel';

import Restapi from './Restapi/index';

const PanoramicTool = () => {
  const params: any = useParams();

  const { menuId } = useModel('InterfaceConfigureTool.menu', (ret) => ({
    menuId: ret.menuId,
  }));

  const { initCustomer } = useModel('InterfaceConfigureTool.customer', (ret) => ({
    initCustomer: ret.initCustomer,
  }));

  /**
   * @description: 左栏获取restapi接口配置，并通过状态管理 初始化
   * @return {*}
   */
  const {} = useRequest(
    () => {
      // return findRestapigroupByMap({ ems_panorama_id: params.id });
    },
    {
      formatResult: (response: any) => {
        initCustomer(response.result);
        return response.result;
      },
    },
  );

  useEffect(() => {
    // if (params && params.id) {
    //   getPanoramaView({ ems_panorama_id: params.id }).then((res) => {
    //     setData(res?.result);
    //   });
    // }
  }, [params]);

  return (
    <div className={styles.configureToolPanel}>
      <div className={styles.top}>
        <TopPanel />
      </div>
      <div className={styles.content}>
        <div className={styles.menuList}>
          <MenuManagement />
        </div>
        <div className={styles.request}>{menuId == 1 ? <Restapi></Restapi> : ''}</div>
      </div>
    </div>
  );
};
export default PanoramicTool;
