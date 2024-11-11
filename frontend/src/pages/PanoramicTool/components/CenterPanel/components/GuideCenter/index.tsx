import { Button, message } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
import { Common } from '@/utils/three/xThree';
import { updatePanorama } from '@/services/swagger/panoramaController';
import { useEffect } from 'react';

const GuideCenter = () => {
  useEffect(() => {
    return () => {};
  }, []);
  return <div className={styles.GuideCenter}></div>;
};
export default GuideCenter;
