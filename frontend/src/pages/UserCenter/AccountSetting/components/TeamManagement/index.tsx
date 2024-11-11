import { ProCard, ProTable } from '@ant-design/pro-components';
import UserList from './UserList';
import AddStationToUser from './AddStationToUser';
import { Button, Avatar, Image } from 'antd';
import { useModel } from 'umi';
import React, { useRef, useState } from 'react';
import { findAssignInstance } from '@/services/swagger/instanceController';
import { findInstanceByMap } from '@/services/swagger/instanceController';
import './index.less';
const TeamManagement: React.FC<{ currentUser: any }> = (props) => {
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  const { currentUser } = props;
  const addStationToUserRef = useRef<any>();
  const customerRef = useRef<any>();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const selectUser = (e) => {
    setUser(e);
  };

  const columns = [
    {
      dataIndex: 'ems_instance_id',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      title: '监测站名称',
      key: 'ems_instance_name',
      dataIndex: 'ems_instance_name',
      width: 350,
      render: (_, record) => (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={<Image src={`/systemfile${record?.ems_instance_picfile?.ems_sysfile_path}`} />}
            />
            <span style={{ marginLeft: 8 }}>{record.ems_instance_name}</span>
          </div>
        </>
      ),
    },
    {
      title: '所属用户',
      dataIndex: 'user',
      ellipsis: true,
    },
    {
      title: '时间',
      dataIndex: 'time',
      ellipsis: true,
      valueType: 'dateTime',
    },

    {
      title: '建设地址',
      dataIndex: 'ems_instance_address',
      ellipsis: true,
    },
  ];

  return (
    <ProCard split={isMobile ? 'horizontal' : 'vertical'} ghost gutter={[8, 0]}>
      <ProCard
        title="团队成员"
        headStyle={{ paddingLeft: 0 }}
        colSpan={isMobile ? '100%' : '25%'}
        bodyStyle={{ padding: '16px 0' }}
      >
        <UserList ref={customerRef} currentUser={currentUser} selectUser={selectUser} />
      </ProCard>
      <ProCard
        title="监测站列表"
        style={{ height: '100%' }}
        bodyStyle={{ padding: 0 }}
        headStyle={{ paddingLeft: 0 }}
      >
        <ProTable
          className="stationListTable"
          toolbar={{
            subTitle: '',
            tooltip: '',
            search: {
              placeholder: '搜索监测站',
              onSearch: (value: string) => {},
            },
            actions: [
              <Button
                disabled={selectedRows.length === 0}
                key="key"
                type="primary"
                onClick={() => {
                  addStationToUserRef.current.show(selectedRows);
                }}
              >
                分配至用户
              </Button>,
            ],
          }}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
          params={{ ems_sysuser_id: user }}
          request={async (params) => {
            // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
            // 如果需要转化参数可以在这里进行修改
            const res = await findAssignInstance(params);
            const result = {
              data: res.result?.list || [],
              /** 列表的内容总数 */
              total: 10,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
            };
            return result;
          }}
          size="large"
          options={{ fullScreen: false, reload: false, setting: false, density: false }}
          rowKey="ems_instance_id"
          search={false}
          defaultSize="middle"
          columns={columns}
          tableAlertRender={false}
          pagination={{
            pageSize: 10,
          }}
        />
      </ProCard>
      <AddStationToUser ref={addStationToUserRef} currentUser={currentUser} />
    </ProCard>
  );
};

export default TeamManagement;
