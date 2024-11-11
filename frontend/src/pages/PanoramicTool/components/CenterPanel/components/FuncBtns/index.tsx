import React from 'react';
import {
  createFromIconfontCN,
  InfoCircleOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  CustomerServiceOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useModel } from 'umi';
import './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
type propsType = {};
const FuncBtns = React.forwardRef((props: propsType, ref: any) => {
  return (
    <div className="icons">
      <IconFont type="icon-dituxuanzhuanduiqi" className="icon" />
      <IconFont type="icon-shengyinkai" className="icon sound" />
      <InfoCircleOutlined className="icon" />
      <FullscreenOutlined className="icon" />
      <ShareAltOutlined className="icon" />
    </div>
  );
});
export default FuncBtns;
