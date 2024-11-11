import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Area } from '@ant-design/plots';
import { Card, Col, Row, Table, Tag, Tooltip } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import numeral from 'numeral';
import { findSyslogByMap } from '@/services/swagger/syslogController';
import React from 'react';
import type { DataItem } from '../data.d';
import NumberInfo from './NumberInfo';

const TopSearch = ({
  loading,
  visitData2,
  dropdownGroup,
}: {
  loading: boolean;
  visitData2: DataItem[];
  dropdownGroup: React.ReactNode;
}) => {
  const columns = [
    {
      title: '',
      dataIndex: 'ems_syslog_id',
      key: 'index',
      search: false,
    },
    {
      title: '操作人员',
      dataIndex: 'ems_syslog_opername',
      key: 'user',
    },
    {
      title: '系统模块',
      dataIndex: 'ems_syslog_title',
      key: 'module',
    },
    {
      title: '操作地址',
      dataIndex: 'ems_syslog_operip',
      search: false,
      key: 'ip',
    },
    {
      title: '操作地点',
      dataIndex: 'addr',
      key: 'addr',
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作状态',
      dataIndex: 'ems_syslog_status',
      key: 'status',
      valueEnum: {
        0: {
          text: '正常',
          status: 'Success',
        },
        1: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '消耗时间',
      dataIndex: 'ms',
      search: false,
      key: 'ms',
    },
    {
      title: '访问操作',
      dataIndex: 'opts',
      key: 'opts',
      render: () => {
        return (
          <Tag icon={<SearchOutlined />} color="#2db7f5">
            详细信息
          </Tag>
        );
      },
    },
  ];
  return (
    <Card
      loading={loading}
      bordered={false}
      title="用户访问日志"
      extra={dropdownGroup}
      style={{
        height: '100%',
      }}
    >
      <Row gutter={68}>
        <Col
          sm={12}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <NumberInfo
            subTitle={
              <span>
                用户访问数量
                <Tooltip title="指标说明">
                  <InfoCircleOutlined
                    style={{
                      marginLeft: 8,
                    }}
                  />
                </Tooltip>
              </span>
            }
            gap={8}
            total={numeral(12321).format('0,0')}
            status="up"
            subTotal={17.1}
          />
          <Area
            xField="x"
            yField="y"
            shapeField="smooth"
            height={45}
            axis={false}
            padding={-12}
            style={{ fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)', fillOpacity: 0.4 }}
            data={visitData2}
          />
        </Col>
        <Col
          sm={12}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <NumberInfo
            subTitle={
              <span>
                人均搜索次数
                <Tooltip title="指标说明">
                  <InfoCircleOutlined
                    style={{
                      marginLeft: 8,
                    }}
                  />
                </Tooltip>
              </span>
            }
            total={2.7}
            status="down"
            subTotal={26.2}
            gap={8}
          />
          <Area
            xField="x"
            yField="y"
            shapeField="smooth"
            height={45}
            padding={-12}
            style={{ fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)', fillOpacity: 0.4 }}
            data={visitData2}
            axis={false}
          />
        </Col>
      </Row>
      <ProTable
        rowKey={(record) => record.index}
        size="small"
        request={async (
          params: any & {
            pageSize: number;
            current: number;
          },
          sort,
          filter,
        ) => {
          try {
            const queryParams = {
              ...params,
              pageNum: params.current,
              ...sort,
              ...filter,
            };
            const res = await findSyslogByMap(queryParams);
            const list = {
              data: res?.result?.list || [],
              success: res.code === 200 ? true : false,
              total: res?.result?.total,
            };

            return list;
          } catch (error) {
            return false;
          }
        }}
        columns={columns}
        editable={{
          type: 'multiple',
        }}
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle=""
        toolBarRender={false}
      />
    </Card>
  );
};
export default TopSearch;
