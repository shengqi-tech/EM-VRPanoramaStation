/*
 * @Author: hugangyong 609210276@qq.com
 * @Date: 2023-11-28 15:44:02
 * @LastEditors: hugangyong 609210276@qq.com
 * @LastEditTime: 2023-12-29 10:52:04
 * @FilePath: \em360station-backend\src\pages\ConnetionManagement\CustomerSoruce\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createFromIconfontCN } from '@ant-design/icons';

import type { TabsProps } from 'antd';
import {
  Tabs,
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

import {
  LightFilter,
  ProFormCheckbox,
  ProFormDateRangePicker,
  ProFormText,
} from '@ant-design/pro-components';

import Customers from './components/Customers';
import Actuators from './components/Actuators';
import DispatchLogs from './components/DispatchLogs';

export const CustomerSource: React.FC<Record<string, any>> = (props) => {
  const onValuesChange = (changedValues: any, allValues: any) => {};

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全部',
      children: <Customers></Customers>,
    },
    {
      key: '2',
      label: '执行器',
      children: <Actuators></Actuators>,
    },
    {
      key: '3',
      label: '调度日志',
      children: <DispatchLogs></DispatchLogs>,
    },
  ];

  const [activeKey, setActiveKey] = useState(items[0].key);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <>
      <Tabs tabPosition="top" activeKey={activeKey} items={items} onChange={onChange} />
    </>
  );
};

export default CustomerSource;
