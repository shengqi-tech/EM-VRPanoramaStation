import { UpOutlined, LeftOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';
import './index.less';
const OperateDirection = () => {
  return (
    <div className="opts">
      {/* <ZoomInOutlined rev="" className="btn btn-big" />
      <ZoomOutOutlined rev="" className="btn btn-small" /> */}
      <UpOutlined className="btn btn-up" />
      <RightOutlined className="btn btn-right" />
      <DownOutlined rev="" className="btn btn-down" />
      <LeftOutlined rev="" className="btn btn-left" />
      <div className="center">复位</div>
    </div>
  );
};
export default OperateDirection;
