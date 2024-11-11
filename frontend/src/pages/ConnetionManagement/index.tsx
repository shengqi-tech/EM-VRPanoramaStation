import { PlusOutlined, AppstoreOutlined, BarsOutlined, LinkOutlined } from '@ant-design/icons';
import { Card, Segmented, Alert } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import type { DeviceModel } from './data.d';
import styles from './style.less';
import moment from 'moment';
import AvatarList from '../../../components/Commoms/AvatarList';

import TaskReport from './components/TaskReport';
import CustomerSource from './CustomerSoruce';
import ConnectTask from './ConnectTask';

const ConnectionManagement: React.FC = (props) => {
  // const handleQuery = async (
  //   // 第一个参数 params 查询表单和 params 参数的结合,表单搜索项会从 params 传入，
  //   // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
  //   params: DeviceModel.Device & API.PageParams,
  //   sort,
  //   filter,
  // ) => {
  //   //const hide = message.loading('正在查询');
  //   try {

  //     // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
  //   // 如果需要转化参数可以在这里进行修改
  //   const response:API.ApiResponse<DeviceModel.DeviceList> = await loadDevices.run({
  //     pageNum: params.current,
  //     // eme_user_customerid:customerid,
  //     ...params,...sort, ...filter
  //   });
  //   //hide();
  //   //message.success(response.message);
  //   const devices : DeviceModel.Device[] = response.result.list;

  //   const solutionList = {
  //       data: devices,
  //       /** 列表的内容总数 */
  //       total: response.result.total,
  //       // success 请返回 true，
  //       // 不然 table 会停止解析数据，即使有数据
  //       success: response.code===200?true:false,
  //   };

  //   return Promise.resolve(solutionList);

  //   } catch (error) {
  //     //hide();
  //     // message.error('查询失败请重试！');
  //     return false;
  //   }
  // };

  //查看

  const { data, loading } = useRequest(
    () => {
      // return getProducts({
      //   pageSize: 8,
      // });
    },
    {
      formatResult: (response: any) => {
        return response.result;
      },
    },
  );

  const content = (
    <div className={styles.pageHeaderContent}>
      <Alert
        message="连接管理：管理与客户源之间的连接，连接采用任务调度的方式进行管理。"
        type="info"
        showIcon
      />
      <TaskReport />
      {/* <StatisticCard.Group size='small'>
          <Divider />
          <StatisticCard
            statistic={{
              title: '全部',
              tip: '当前指定产品的设备总数',
              value: 10,
            }}
          />
          <Divider />
          <StatisticCard
            statistic={{
              title: '已出库',
              value: 5,
              tip:'当前已发货的设备总数',
              status: 'default',
            }}
          />
            <Divider />
          <StatisticCard
            statistic={{
              title: '当前在线',
              value: 3,
              tip:'当前在线的设备总数',
              status: 'processing',
            }}
          />
  
  
          </StatisticCard.Group> */}
    </div>
  );

  const extraContent = (
    <div className={styles.extraImg}>
      <img
        alt="这是一个标题"
        src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
      />
    </div>
  );

  const [viewType, setViewType] = useState<string | number>('connecttask'); //视图类型切换 卡片/列表

  const changeViewType = (value: string | number) => {
    setViewType(value);
  };

  return (
    <PageContainer
      content={content}
      header={{
        avatar: {
          icon: <LinkOutlined />,
          size: 36,
          style: { background: '#1890ff' },
        },
        subTitle: '提供数据连接管理',
      }}
    >
      <Card>
        <div style={{ marginBottom: '10px' }}>
          <Segmented
            onChange={changeViewType}
            value={viewType}
            options={[
              {
                label: '连接列表',
                value: 'connecttask',
                icon: <AppstoreOutlined />,
              },
              {
                label: '客户源',
                value: 'customersource',
                icon: <BarsOutlined />,
              },
            ]}
          />
        </div>
        {viewType == 'connecttask' && <ConnectTask />}
        {viewType == 'customersource' && <CustomerSource />}
      </Card>
    </PageContainer>
  );
};

export default ConnectionManagement;
