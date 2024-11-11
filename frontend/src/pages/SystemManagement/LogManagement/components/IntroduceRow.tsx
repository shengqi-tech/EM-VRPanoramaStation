import { InfoCircleOutlined } from '@ant-design/icons';
import { Area, Column, Pie } from '@ant-design/plots';
import { Col, Progress, Row, Tooltip } from 'antd';
import { ChartCard, Field } from './Charts';
import numeral from 'numeral';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};
const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: any[] }) => {
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="登录访问量"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(8846).format('0,0')}
          footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
          contentHeight={108}
        >
          <Area
            xField="x"
            yField="y"
            shapeField="smooth"
            height={108}
            axis={false}
            style={{
              fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
              fillOpacity: 0.6,
              width: '100%',
            }}
            padding={-20}
            data={visitData}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="操作日志量"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(6560).format('0,0')}
          footer={<Field label="日操作量" value={numeral(120).format('0,0')} />}
          contentHeight={108}
        >
          <Column
            xField="x"
            yField="y"
            padding={-20}
            axis={false}
            height={108}
            data={visitData}
            scale={{ x: { paddingInner: 0.4 } }}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="日志系统模块量"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={150}
          footer={<Field label="访问量" value={numeral(1234).format('0,0')} />}
        >
          <Pie
            height={150}
            radius={0.8}
            innerRadius={0.5}
            angleField="y"
            colorField="x"
            data={
              [
                {
                  x: '登录',
                  y: 4544,
                },
                {
                  x: '角色管理',
                  y: 3321,
                },
                {
                  x: '菜单管理',
                  y: 3113,
                },
                {
                  x: '监测站管理',
                  y: 2341,
                },
                {
                  x: '连接管理',
                  y: 1231,
                },
                {
                  x: '其他',
                  y: 1231,
                },
              ] as any
            }
            legend={false}
            label={{
              position: 'spider',
              text: (item: { x: number; y: number }) => {
                return `${item.x}: ${numeral(item.y).format('0,0')}`;
              },
            }}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="系统模块量"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={150}
          footer={<Field label="访问量" value={numeral(1234).format('0,0')} />}
        >
          <Pie
            height={150}
            radius={0.8}
            innerRadius={0.5}
            angleField="y"
            colorField="x"
            data={
              [
                {
                  x: '登录',
                  y: 4544,
                },
                {
                  x: '角色管理',
                  y: 3321,
                },
                {
                  x: '菜单管理',
                  y: 3113,
                },
                {
                  x: '监测站管理',
                  y: 2341,
                },
                {
                  x: '连接管理',
                  y: 1231,
                },
                {
                  x: '其他',
                  y: 1231,
                },
              ] as any
            }
            legend={false}
            label={{
              position: 'spider',
              text: (item: { x: number; y: number }) => {
                return `${item.x}: ${numeral(item.y).format('0,0')}`;
              },
            }}
          />
        </ChartCard>
      </Col>
    </Row>
  );
};
export default IntroduceRow;
