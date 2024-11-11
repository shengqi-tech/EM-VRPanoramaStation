import './index.less';
import { Gauge, Liquid, WordCloud } from '@ant-design/plots';
import { Segmented, Row, Col, Space, Statistic } from 'antd';
import {
  FundOutlined,
  CloseOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  BellOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import LineEchart from './LineEchart';
import { useModel } from 'umi';
const Intro = () => {
  const { isIntroShow, setIsIntroShow } = useModel('Panorama.data', (ret) => ({
    isIntroShow: ret.isIntroShow,
    setIsIntroShow: ret.setIsIntroShow,
  }));

  return (
    <>
      <div className={`IntroBox ${isIntroShow ? 'showAnimation' : 'hideAnimation'}`}>
        <div className="btn">
          <CloseOutlined
            onClick={() => {
              setIsIntroShow(!isIntroShow);
            }}
            className="btn-close"
          />
        </div>
        <div className="content">
          <div className="title">
            <FundOutlined className="title-icon" />
            <div className="title-text">站房概况</div>
          </div>
          <div className="c-data">
            <Row gutter={[8, 16]}>
              <Col span={12}>
                <div className="dataInfo">
                  <Statistic
                    suffix="小时"
                    title={
                      <Space>
                        <DatabaseOutlined />
                        <span>无故障运行时间</span>
                      </Space>
                    }
                    value={3600}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="dataInfo">
                  <Statistic
                    suffix="个"
                    title={
                      <Space>
                        <BellOutlined />
                        <span>站房设备设施</span>
                      </Space>
                    }
                    value={25}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="dataInfo">
                  <Statistic
                    suffix="件"
                    title={
                      <Space>
                        <ThunderboltOutlined />
                        <span>事故故障</span>
                      </Space>
                    }
                    value={20}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="dataInfo">
                  <Statistic
                    suffix="kW·h"
                    title={
                      <Space>
                        <ThunderboltOutlined />
                        <span>耗电量</span>
                      </Space>
                    }
                    value={500}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="title">
            <FundOutlined className="title-icon" />
            <div className="title-text">统计</div>
            <Segmented options={['日', '月', '年', '累计']} />
          </div>
          <LineEchart />
          {/* <Liquid height={160} percent={0.35} /> */}
        </div>
      </div>
    </>
  );
};
export default Intro;
