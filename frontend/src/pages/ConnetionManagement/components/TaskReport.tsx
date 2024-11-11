import {
  InfoCircleOutlined,
  AreaChartOutlined,
  CommentOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
// import { Area, Column, Progress } from '@ant-design/charts';
import { Col, Row, Space, Tooltip } from 'antd';

import numeral from 'numeral';
import { ChartCard, Field } from './Charts';

import moment from 'moment';
import Trend from './Trend';

import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const visitData = [];
const beginDay = new Date().getTime();
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}
const visitData1 = [
  {
    date: '2010-01',
    scales: 1998,
  },
];
const TaskReport = ({ loading }: { loading: boolean }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="任务数量"
        action={
          <Tooltip title="系统中配置的连接任务的总数量">
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => (
          <Space>
            <AreaChartOutlined />

            {`条${numeral(1231).format('0,0')}`}
          </Space>
        )}
        footer={<Field label="日增加数" value={`${numeral(2).format('0,0')}条`} />}
        contentHeight={46}
      >
        {/* <Trend flag="up" style={{ marginRight: 16 }}>
          周同比
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          日同比
          <span className={styles.trendText}>11%</span>
        </Trend> */}
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="调度次数"
        action={
          <Tooltip title="调度中心触发的调度次数">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={() => `次${numeral(3221).format('0,0')}`}
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Field
              style={{ float: 'left' }}
              label="日调度次数"
              value={`${numeral(31).format('0,0')}次`}
            />
            <Trend flag="down" style={{ float: 'right' }}>
              成功率
              <span className={styles.trendText}>90%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        {/* <Area
          color="#975FE4"
          xField = 'x'
          height={46}
          forceFit
          yField="y"
          smooth
          data={visitData}
        /> */}
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="客户源"
        action={
          <Tooltip title="系统中目前有多少客户源">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={() => (
          <Space>
            <CommentOutlined />

            {`家${numeral(891).format('0,0')}`}
          </Space>
        )}
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend flag="down">
              周同比
              <span className={styles.trendText}>11%</span>
            </Trend>
            <Trend flag="up" style={{ marginRight: 16, float: 'right' }}>
              月同比
              <span className={styles.trendText}>12%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        {/* <Column xField="x" height={46} forceFit yField="y" data={visitData} /> */}
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="数据同步条数"
        action={
          <Tooltip title="一共同步了多少条数据">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={() => (
          <Space>
            <DashboardOutlined />
            {`条${numeral(1120000).format('0,0')}`}
          </Space>
        )}
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              监测站
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down" style={{ marginRight: 16 }}>
              设备
              <span className={styles.trendText}>11%</span>
            </Trend>
            <Trend flag="down">
              监测数据
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        {/* <Progress
          height={26}
          percent={0.78}
          color="#13C2C2"
          forceFit
          size={8}
          marker={[
            {
              value: 0.8,
              style: {
                stroke: '#13C2C2',
              },
            },
          ]}
        /> */}
      </ChartCard>
    </Col>
  </Row>
);

export default TaskReport;
