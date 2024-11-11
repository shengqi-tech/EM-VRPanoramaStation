import {
  Tag,
  Alert,
  Card,
  Row,
  Col,
  Statistic,
  Tabs,
  DatePicker,
  Tooltip,
  Space,
  Table,
} from 'antd';
import numeral from 'numeral';
import {
  ThunderboltOutlined,
  DatabaseOutlined,
  BellOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import ChartCard from '@/components/ChartCard';
import DeviceChart from './DeviceChart';
import { Area, Liquid, WordCloud, Column, Gauge, Line } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { history, useParams, useModel } from 'umi';
import { GridContent } from '@ant-design/pro-components';
import { findInstanceByMap } from '@/services/swagger/instanceController';
import styles from './style.less';
import './style.less';
import { format } from 'fecha';

const { RangePicker } = DatePicker;

const PanoramicConfig: React.FC = (props) => {
  const params: any = useParams();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { instanceId } = params;
  const [instanceData, setInstanceData] = useState<API.InstanceVo>({});
  const salesData = [
    {
      x: '1月',
      y: 496,
    },
    {
      x: '2月',
      y: 255,
    },
    {
      x: '3月',
      y: 276,
    },
    {
      x: '4月',
      y: 236,
    },
    {
      x: '5月',
      y: 733,
    },
    {
      x: '6月',
      y: 747,
    },
    {
      x: '7月',
      y: 1138,
    },
    {
      x: '8月',
      y: 1133,
    },
    {
      x: '9月',
      y: 712,
    },
    {
      x: '10月',
      y: 556,
    },
    {
      x: '11月',
      y: 708,
    },
    {
      x: '12月',
      y: 1015,
    },
  ];
  const visitData = [
    {
      x: '2024-02-19',
      y: 7,
    },
    {
      x: '2024-02-20',
      y: 5,
    },
    {
      x: '2024-02-21',
      y: 4,
    },
    {
      x: '2024-02-22',
      y: 2,
    },
    {
      x: '2024-02-23',
      y: 4,
    },
    {
      x: '2024-02-24',
      y: 7,
    },
    {
      x: '2024-02-25',
      y: 5,
    },
    {
      x: '2024-02-26',
      y: 6,
    },
    {
      x: '2024-02-27',
      y: 5,
    },
    {
      x: '2024-02-28',
      y: 9,
    },
    {
      x: '2024-02-29',
      y: 6,
    },
    {
      x: '2024-03-01',
      y: 3,
    },
    {
      x: '2024-03-02',
      y: 1,
    },
    {
      x: '2024-03-03',
      y: 5,
    },
    {
      x: '2024-03-04',
      y: 3,
    },
    {
      x: '2024-03-05',
      y: 6,
    },
    {
      x: '2024-03-06',
      y: 5,
    },
  ];

  const lineConfig = {
    data: {
      type: 'fetch',
      value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/line-slider.json',
    },
    height: 350,
    xField: (d) => new Date(d.date),
    yField: 'close',
    axis: { x: { title: false }, y: { title: false, size: 36 } },
    slider: {
      x: { labelFormatter: (d) => format(d, 'YYYY/M/D') },
    },
  };

  const gaugeConfig = {
    height: 180,
    data: {
      target: 80,
      total: 450,
      name: 'score',
      thresholds: [50, 100, 150, 200, 300, 450],
    },
    paddingTop: -14,
    // paddingBttom: -50,
    marginBottom: -50,
    legend: true,
    scale: {
      color: {
        range: ['#00e400', '#ffff00', '#ff7e00', '#ff0000', '#99004c', '#7e0023'],
      },
    },
    style: {
      textContent: () => '优',
    },
  };

  const dataSource: any = [
    {
      id: 1,
      pollutant: 'PM2.5',
      value: '52',
      unit: 'mg/L',
      time: '03-13 08:00',
      level: '1级',
    },
    {
      id: 2,
      pollutant: 'PM2.5',
      value: '52',
      unit: 'mg/L',
      time: '03-13 08:00',
      level: '1级',
    },
    {
      id: 3,
      pollutant: 'PM2.5',
      value: '52',
      unit: 'mg/L',
      time: '03-13 08:00',
      level: '1级',
    },
    {
      id: 4,
      pollutant: 'PM2.5',
      value: '52',
      unit: 'mg/L',
      time: '03-13 08:00',
      level: '1级',
    },
    {
      id: 5,
      pollutant: 'PM2.5',
      value: '52',
      unit: 'mg/L',
      time: '03-13 08:00',
      level: '1级',
    },
    {
      id: 6,
      pollutant: 'PM2.5',
      value: '52',
      unit: 'mg/L',
      time: '03-13 08:00',
      level: '1级',
    },
    {
      id: 7,
      pollutant: 'PM2.5',
      value: '52',
      unit: 'mg/L',
      time: '03-13 08:00',
      level: '1级',
    },
  ];

  const columns = [
    {
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '污染物',
      dataIndex: 'pollutant',
      key: 'pollutant',
    },
    {
      title: '监测值',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '监测时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '等级',
      width: 150,
      dataIndex: 'level',
      key: 'level',
      render: (_, record) => (
        <Tag color="#108ee9" style={{ width: '80px', textAlign: 'center' }}>
          {_}
        </Tag>
      ),
    },
  ];

  useEffect(() => {
    findInstanceByMap({ ems_instance_id: instanceId }).then((res) => {
      const list = res.result?.list || [];
      const instanceData = list[0];
      setInstanceData(instanceData);
    });
  }, []);

  return (
    <PageContainer
      className="PanoramicConfig"
      onBack={() => {
        history.push(`/msManagement`);
      }}
      header={{
        avatar: { src: `/systemfile${instanceData.ems_instance_picfile?.ems_sysfile_path}` },
        title: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 8, marginLeft: 8 }}>{instanceData.ems_instance_name}</span>
            <Tag color="blue">{instanceData.ems_instance_no}</Tag>
          </div>
        ),
        subTitle: (
          <Space>
            <span>{`建设单位：武汉生栖科技有限公司`}</span>
            <span>{`建设时间：${instanceData.ems_instance_createtime || ''}`}</span>
          </Space>
        ),
      }}
      content={
        <div>
          <Alert
            message={`简述 : ${
              instanceData.ems_instance_des ? instanceData.ems_instance_des : '无'
            }`}
            type="info"
            showIcon
          />
        </div>
      }
      style={{
        background: '#F4F7FA',
      }}
    >
      <GridContent>
        <>
          <Row gutter={24}>
            <Col
              xl={18}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            >
              <Card title="站房详细信息" bordered={false}>
                <Row>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <Space>
                          <DatabaseOutlined />
                          <span>站房设备设施</span>
                        </Space>
                      }
                      suffix="个"
                      value={20}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <Space>
                          <BellOutlined />
                          <span>事故故障</span>
                        </Space>
                      }
                      suffix="件"
                      value={120}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <Space>
                          <ThunderboltOutlined />
                          <span>耗电量</span>
                        </Space>
                      }
                      suffix="kW·h"
                      value={1000}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <Space>
                          <HistoryOutlined />
                          <span>无故障运行时间</span>
                        </Space>
                      }
                      suffix="天"
                      value={2000}
                    />
                  </Col>
                </Row>
              </Card>
              <Card
                bordered={false}
                bodyStyle={{
                  padding: 0,
                }}
              >
                <div className={styles.detailCard}>
                  <Tabs
                    tabBarExtraContent={
                      <div className={styles.salesExtraWrap}>
                        <div className={styles.salesExtra}>
                          <a>今日</a>
                          <a>本周</a>
                          <a>本月</a>
                          <a>本年</a>
                        </div>
                        <RangePicker
                          //   value={[]}
                          //   onChange={handleRangePickerChange}
                          style={{
                            width: 256,
                          }}
                        />
                      </div>
                    }
                    size="large"
                    tabBarStyle={{
                      marginBottom: 24,
                    }}
                    items={[
                      {
                        key: '0',
                        label: '监测因子',
                        children: (
                          <Row>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                              <div className={styles.salesBar}>
                                <Table<any>
                                  style={{ height: '350px', paddingRight: '30px' }}
                                  rowKey={(record) => record.index}
                                  size="small"
                                  columns={columns}
                                  dataSource={dataSource}
                                  pagination={{
                                    style: {
                                      marginBottom: 0,
                                    },
                                    pageSize: 7,
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>
                        ),
                      },
                      {
                        key: '1',
                        label: '事故故障',
                        children: (
                          <Row>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                              <div className={styles.salesBar}>
                                <Column
                                  height={350}
                                  data={salesData}
                                  xField="x"
                                  yField="y"
                                  paddingBottom={12}
                                  paddingRight={20}
                                  axis={{
                                    x: {
                                      title: false,
                                    },
                                    y: {
                                      title: false,
                                    },
                                  }}
                                  scale={{
                                    x: { paddingInner: 0.4 },
                                  }}
                                  tooltip={{
                                    name: '件',
                                    channel: 'y',
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>
                        ),
                      },
                      {
                        key: '2',
                        label: '用电量',
                        children: (
                          <Row>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                              <div className={styles.salesBar}>
                                <Line {...lineConfig} />
                              </div>
                            </Col>
                          </Row>
                        ),
                      },
                    ]}
                  />
                </div>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <ChartCard
                style={{
                  marginBottom: 24,
                }}
                bordered={false}
                title="站房消耗流量"
                action={
                  <Tooltip title="流量说明">
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                total={`${numeral(8846).format('0,0')}MB`}
                footer={
                  <Space>
                    <span>日消耗量</span> <span>{numeral(1234).format('0,0')}MB</span>
                  </Space>
                }
                contentHeight={128}
              >
                <Area
                  xField="x"
                  yField="y"
                  shapeField="smooth"
                  height={137}
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
              <Card
                title="环境质量"
                style={{
                  marginBottom: 24,
                }}
                bodyStyle={{
                  textAlign: 'center',
                }}
                bordered={false}
              >
                <Gauge {...gaugeConfig} />
                <ul className="legend">
                  <span className="legend_01 legend_span "></span>
                  <span className="skipAutoFix">优</span>
                  <span className="legend_02 legend_span "></span>
                  <span className="skipAutoFix">良</span>
                  <span className="legend_03 legend_span "></span>
                  <span className="skipAutoFix">轻度污染</span>
                  <span className="legend_04 legend_span "></span>
                  <span className="skipAutoFix">中度污染</span>
                  <br />
                  <span className="legend_05 legend_span "></span>
                  <span className="skipAutoFix">重度污染</span>
                  <span className="legend_06 legend_span "></span>
                  <span className="skipAutoFix">严重污染</span>
                </ul>
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col
              xl={18}
              lg={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            >
              <Card title="站房设备一张图" bordered={false}>
                <DeviceChart />
              </Card>
            </Col>
            <Col
              xl={6}
              lg={12}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            >
              <Card
                title="流量剩余"
                bodyStyle={{
                  textAlign: 'center',
                  fontSize: 0,
                }}
                style={{
                  marginBottom: 24,
                }}
                bordered={false}
              >
                <Liquid height={160} percent={0.35} />
              </Card>
              {/* <Card
                title="流量剩余"
                bodyStyle={{
                  textAlign: 'center',
                  fontSize: 0,
                }}
                bordered={false}
              >
                <Liquid height={160} percent={0.35} />
              </Card> */}
            </Col>
          </Row>
        </>
      </GridContent>
    </PageContainer>
  );
};

export default PanoramicConfig;
