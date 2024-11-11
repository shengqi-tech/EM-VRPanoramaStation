import React from 'react';
import {
  createFromIconfontCN,
  ZoomInOutlined,
  ZoomOutOutlined,
  CopyOutlined,
  SnippetsOutlined,
  DeleteOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useModel } from 'umi';
import styles from './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
type propsType = {};
const ToolBtns = React.forwardRef((props: propsType, ref: any) => {
  // 全屏
  const fullscreen = () => {};
  return (
    <>
      <Tooltip title="上一步" placement="bottom">
        <IconFont type="icon-shangyibu" className={styles.icon} />
      </Tooltip>
      <Tooltip title="下一步" placement="bottom">
        <IconFont type="icon-xiayibu" className={styles.icon} />
      </Tooltip>
      <span className={styles.space}>|</span>
      <Tooltip title="复制" placement="bottom">
        <CopyOutlined className={styles.icon} />
      </Tooltip>
      <Tooltip title="粘贴" placement="bottom">
        <SnippetsOutlined className={styles.icon} />
      </Tooltip>
      <Tooltip title="删除" placement="bottom">
        <DeleteOutlined className={styles.icon} />
      </Tooltip>
      <span className={styles.space}>|</span>
      <Tooltip title="放大" placement="bottom">
        <ZoomInOutlined className={styles.icon} />
      </Tooltip>
      <Tooltip title="缩小" placement="bottom">
        <ZoomOutOutlined className={styles.icon} />
      </Tooltip>
      <Tooltip title="全屏" placement="bottom">
        <FullscreenOutlined className={styles.icon} onClick={fullscreen} />
      </Tooltip>
    </>
  );
});
export default ToolBtns;
