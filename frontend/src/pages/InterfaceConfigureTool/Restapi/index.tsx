/*
 * @Author: hugangyong 609210276@qq.com
 * @Date: 2023-12-07 14:32:03
 * @LastEditors: hugangyong 609210276@qq.com
 * @LastEditTime: 2023-12-20 10:35:34
 * @FilePath: \em360station-backend\src\pages\InterfaceConfigureTool\Restapi\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from 'react';
import { history, useParams, useModel } from 'umi';
import { getPanoramaView } from '@/services/swagger/panoramaController';
import { Resizable } from 're-resizable';
import styles from './index.less';

import LeftPanel from './components/LeftPanel';

import BottomPanel from './components/BottomPanel';

import RequestPanel from './components/RequestPanel';

const Restapi = () => {
  const params: any = useParams();

  const { setData } = useModel('PanoramicTool.panoramaData', (ret) => ({
    setData: ret.setPanoramaData,
  }));

  const { menuId } = useModel('PanoramicTool.func', (ret) => ({
    menuId: ret.menuId,
  }));

  useEffect(() => {
    // if (params && params.id) {
    //   getPanoramaView({ ems_panorama_id: params.id }).then((res) => {
    //     setData(res?.result);
    //   });
    // }
  }, [params]);

  const [bottomHeight, setBottomHeight] = useState(300); // 初始高度为 300px

  const handleResize = (event, direction, ref) => {
    setBottomHeight(ref.offsetHeight); // 在调整大小时更新高度
  };

  return (
    <div className={styles.restapi}>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <Resizable className={styles.labelBox} enable={{ right: true }}>
            <LeftPanel />
          </Resizable>

          <div className={styles.center}>
            {/* 请求配置页 */}
            <div className={styles.centerT}>
              <div className={styles.canvas}>
                <RequestPanel></RequestPanel>
              </div>
            </div>
            {/* 底部 */}
            <Resizable
              onResize={handleResize}
              className={styles.centerB}
              style={{ height: bottomHeight }}
              enable={{ top: true }}
            >
              <BottomPanel height={bottomHeight - 60} />
            </Resizable>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Restapi;
