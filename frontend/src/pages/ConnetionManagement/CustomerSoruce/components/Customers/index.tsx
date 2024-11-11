import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  UserAddOutlined,
  DeleteOutlined,
  LinkOutlined,
  InfoOutlined,
  PlusOutlined,
  VerifiedOutlined,
  SendOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import {
  Avatar,
  Card,
  Col,
  message,
  Dropdown,
  Form,
  List,
  Menu,
  Row,
  Select,
  Tooltip,
  Tag,
  Button,
  Cascader,
  Alert,
  Typography,
  DatePicker,
  Divider,
  Skeleton,
  Space,
} from 'antd';
import { PageContainer, getMenuData, RouteContext } from '@ant-design/pro-layout';
import numeral from 'numeral';
import type { FC } from 'react';
// import React from 'react';
import React, { useState, useRef } from 'react';
import { useRequest, history, useModel, FormattedMessage } from 'umi';

import styles from './style.less';
import dayjs from 'dayjs';
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
import { CheckCard } from '@ant-design/pro-card';

import { StatisticCard } from '@ant-design/pro-card';
import moment from 'moment';

import {
  LightFilter,
  ProFormCheckbox,
  ProFormDateRangePicker,
  ProFormText,
} from '@ant-design/pro-components';

import { findCustomerByMap } from '../../../../../services/swagger/customerController';

import AddOrEditActuator from './actuatorregister';
import DispatchLogDrawer from './dispatchlog';

const { Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

export function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

const CardInfo: React.FC<{
  activeUser: React.ReactNode;
  newUser: React.ReactNode;
}> = ({ activeUser, newUser }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>在线设备数</p>
      <p>{activeUser}</p>
    </div>
    <div>
      <p>监测站</p>
      <p>{newUser}</p>
    </div>
  </div>
);

export const Customers: React.FC<Record<string, any>> = (props) => {
  const actuatorRef = useRef<any>();
  const dispatchRef = useRef<any>();
  const [customer, setCustomer] = useState<API.CustomerVo>({});

  const [customerName, setCustomerName] = useState();
  const [customerArea, setCustomeArea] = useState([]);

  // 查询客户
  const {
    data: customers,
    loading,
    run,
    refresh: customersUseRequestrefresh,
  } = useRequest(
    () => {
      return findCustomerByMap({
        ems_customer_name: customerName,
      });
    },
    {
      formatResult: (response: any) => {
        return response.result.list;
      },
      refreshDeps: [],
      // loadMore: true,
    },
  );
  const list = customers || [];

  const onValuesChange = (changedValues: any, allValues: any) => {};

  const goToLinkConfig = (e: any, item: any) => {
    // history.push(`/connetionManagement/interfaceConfigureTool/${item.eme_customer_id}`);

    window.open(`/connetionManagement/interfaceConfigureTool/${item.eme_customer_id}}`, '_blank');
    //e.stopPropagation();
    // window.open(`http://192.168.2.3:3000/panoramaAdv?SiteMnCode=WZZ001`, '_blank');

    // const { match } = props;
    // const url = match.url === '/' ? '' : match.url;
    // // setCurrentCustomer(item);
    // history.push(`${url}/${item.eme_customer_id}`);
  };

  return (
    <div className={styles.filterCardList}>
      <Card bordered={false} style={{ marginBottom: 20 }}>
        <Form onValuesChange={onValuesChange}>
          <LightFilter
            initialValues={{
              name: '',
              datetimeRanger: [
                dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
                dayjs('2019-11-16 12:50:26').valueOf(),
              ],
              configstatus: [
                {
                  value: 'configed',
                  label: '已认领',
                },
                {
                  value: 'configing',
                  label: '未认领',
                },
              ],
            }}
            size="middle"
            onFinish={async (values) => {
              setCustomerName(values.name);
              customersUseRequestrefresh();
            }}
          >
            <ProFormDateRangePicker name="datetimeRanger" label="创建时间" />
            <ProFormText name="name" label="客户名称" />
            <ProFormCheckbox.Group
              name="configstatus"
              label="认领状态"
              options={['已认领', '未认领']}
            />
          </LightFilter>
        </Form>
      </Card>

      <List<API.CustomerVo>
        rowKey="ems_customer_id"
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        loading={loading}
        dataSource={[...list]}
        renderItem={(item) => {
          return (
            <List.Item key={item.ems_customer_id}>
              <Card
                hoverable
                actions={[
                  <Tooltip key="edit" title="连接配置">
                    <Space onClick={(e) => goToLinkConfig(e, item)}>
                      <LinkOutlined />
                      连接配置
                    </Space>
                  </Tooltip>,
                  <Tooltip key="register" title="执行器注册">
                    <Space
                      onClick={() => {
                        setCustomer(item);
                        actuatorRef?.current?.show();
                      }}
                    >
                      <VerifiedOutlined />
                      执行器注册
                    </Space>
                  </Tooltip>,
                  <Tooltip key="view" title="调度日志">
                    <Space
                      onClick={() => {
                        setCustomer(item);
                        dispatchRef?.current?.show();
                      }}
                    >
                      {/* <IconFont
                          type="icon-vr-m"
                          className={styles.icon_vr}
                          onClick={schedulerView}
                        /> */}
                      <SendOutlined />
                      调度日志
                    </Space>
                  </Tooltip>,
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      size="small"
                      src={`/systemfile${item.ems_customer_logofile?.ems_sysfile_path}`}
                    />
                  }
                  title={
                    <div style={{ alignItems: 'center', wordBreak: 'break-all' }}>
                      <span style={{ marginRight: 8, marginLeft: 8 }}>
                        {item.ems_customer_name}
                      </span>

                      {item.ems_customer_isrealname ? (
                        <Tag color="blue">已认领</Tag>
                      ) : (
                        <Tag color="red">待认领</Tag>
                      )}

                      <div>
                        <Tag color="blue">{item.ems_customer_city}</Tag>-
                        <span style={{ fontSize: 12, paddingLeft: 10, paddingRight: 6 }}>
                          {item.ems_customer_address}
                        </span>
                        {/* {item.ems_customer_customertypes?.map((customertype) => (
                            <Tag color="blue">{customertype.eme_customertype_name}</Tag>
                          ))} */}
                      </div>
                    </div>
                  }
                  description={
                    <Paragraph
                      className={styles.item}
                      ellipsis={{ rows: 2 }}
                      style={{ height: 18 }}
                    >
                      <Tooltip title={item.ems_customer_des}>{item.ems_customer_des}</Tooltip>
                    </Paragraph>
                  }
                />
                <div className={styles.cardItemContent}>
                  <CardInfo activeUser={formatWan(1000)} newUser={numeral(100).format('0,0')} />
                </div>
              </Card>
            </List.Item>
          );
        }}
      />
      <AddOrEditActuator ref={actuatorRef} customer={customer}></AddOrEditActuator>
      <DispatchLogDrawer ref={dispatchRef} customer={customer}></DispatchLogDrawer>
    </div>
  );
};

export default Customers;
