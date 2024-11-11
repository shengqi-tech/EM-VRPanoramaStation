import { Button, message } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
import { Common } from '@/utils/three/xThree';
import { updatePanorama } from '@/services/swagger/panoramaController';
import { useEffect } from 'react';

const InitView = () => {
  const { menuId, selectMenu } = useModel('PanoramicTool.func', (ret) => ({
    menuId: ret.menuId,
    selectMenu: ret.selectMenu,
  }));
  const { panoramaData, setThreeImgData } = useModel('PanoramicTool.panoramaData', (ret) => ({
    panoramaData: ret.panoramaData,
    setThreeImgData: ret.setThreeImgData,
  }));
  const closeInitViewModalShow = () => {
    selectMenu(0);
  };

  const saveInitView = () => {
    let initView = Common.getCameraPosition(window.viewer);
    updatePanorama({
      ems_panorama_id: panoramaData?.ems_panorama_id,
      ems_panorama_initview: JSON.stringify(initView),
    }).then((res) => {
      if (res?.code == 200) {
        let imgData = Common.getThreeCanvasImgData(window.viewer);
        setThreeImgData(imgData);
        message.success('保存成功！');
      }
      // closeInitViewModalShow();
    });
  };

  useEffect(() => {
    return () => {
      // closeInitViewModalShow();
    };
  }, []);
  return (
    <div className={styles.viewBox}>
      <div className={styles.viewT}></div>
      <div className={styles.viewL}></div>
      <div className={styles.viewR}></div>
      <div className={styles.viewB}></div>
      <div className={styles.view}>
        <div className={styles.btn}>
          {/* <Button onClick={closeInitViewModalShow}>退出</Button> */}
          <Button type="primary" onClick={saveInitView}>
            保存当前初始视角
          </Button>
        </div>
      </div>
    </div>
  );
};
export default InitView;
