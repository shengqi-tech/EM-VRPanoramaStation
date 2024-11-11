import { Alert } from 'antd';
import { useModel } from 'umi';
import { ReadOutlined } from '@ant-design/icons';
import Marquee from 'react-fast-marquee';
import './index.less';

const Banner = () => {
  const { instanceConf } = useModel('Panorama.data');

  return (
    <Alert
      type="info"
      // closable
      icon={<ReadOutlined style={{ color: '#fff' }} />}
      banner
      message={
        <Marquee pauseOnHover gradient={false}>
          {instanceConf?.des || ''}
        </Marquee>
      }
    />
  );
};
export default Banner;
