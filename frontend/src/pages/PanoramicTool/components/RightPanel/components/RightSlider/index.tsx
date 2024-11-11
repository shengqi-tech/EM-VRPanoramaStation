import { createFromIconfontCN } from '@ant-design/icons';
import { Tooltip } from 'antd';
import styles from './index.less';
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const RightSlider = () => {
  return (
    <div className={styles.rightSlider}>
      <Tooltip title="历史记录" placement="bottom">
        <IconFont type="icon-lishijilu" className={styles.icon} />
      </Tooltip>
    </div>
  );
};
export default RightSlider;
