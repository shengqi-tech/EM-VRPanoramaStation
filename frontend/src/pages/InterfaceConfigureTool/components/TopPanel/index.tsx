import { RollbackOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { Button, Segmented } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

import styles from './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const TopPanel = () => {
  const { panoramaData } = useModel('PanoramicTool.panoramaData', (ret) => ({
    panoramaData: ret.panoramaData,
  }));
  return (
    <div className={styles.topPanel}>
      <Button icon={<RollbackOutlined />} className={styles.loginoutBtn}>
        退出
      </Button>
      <div className={styles.title}>
        {panoramaData?.ems_panorama_instance?.ems_instance_name} - {panoramaData?.ems_panorama_name}
      </div>
      <div className={styles.style}>
        <Segmented
          options={[
            {
              label: '',
              value: 'List',
              icon: <IconFont type="icon-suno" className={styles.icon} />,
            },
            {
              label: '',
              value: 'Kanban',
              icon: <IconFont type="icon-night" className={styles.icon} />,
            },
          ]}
        />
      </div>
    </div>
  );
};
export default TopPanel;
