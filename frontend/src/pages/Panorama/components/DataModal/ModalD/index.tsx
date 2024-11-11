import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import './index.less';
import './mobile.less';

const ModalC = () => {
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));

  const { setDataModalType } = useModel('Panorama.data', (ret) => ({
    setDataModalType: ret.setDataModalType,
  }));
  return (
    <div className={`${isMobile ? 'ModalC-mobile' : 'ModalC'}`}>
      <div className="modal">
        <div className="header">
          <CloseOutlined
            className="return"
            onClick={() => {
              setDataModalType(0);
            }}
          />
        </div>
        <div className="content">
          <p>是否对该仪器下发指令！！！</p>
        </div>
        <div className="bottom">
          <Button
            style={{ marginRight: '10px' }}
            onClick={() => {
              setDataModalType(0);
            }}
          >
            取消
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setDataModalType(0);
            }}
          >
            确定
          </Button>
        </div>
      </div>
      <div
        className="mask"
        // onClick={() => {
        //   setDataModalType(0);
        // }}
      ></div>
    </div>
  );
};

export default ModalC;
