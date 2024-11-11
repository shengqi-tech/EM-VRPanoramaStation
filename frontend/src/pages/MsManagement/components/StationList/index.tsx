import React, { useRef, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Table, Button, Tooltip, Popconfirm, Badge, Space, Tag, Avatar, Image } from 'antd';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { history, useRequest, useModel } from 'umi';
import './index.less';

export default () => {
  const { stationListData } = useModel('Panorama.data', (ret) => ({
    stationListData: ret.stationListData,
  }));

  const goToParanomicConfig = (id: any) => {
    history.push(`/msManagement/panoramicConfig/${id}`);
  };
  const handleView = (id, no) => {
    window.open(`/msManagement/panorama/${id}?no=${no}`, '_blank');
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
      tip: '监测站名称',
      width: 350,
      render: (_, record) => (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={<Image src={`/systemfile${record?.ems_instance_picfile?.ems_sysfile_path}`} />}
            />
            <span style={{ marginRight: 8, marginLeft: 8 }}>
              <a
                onClick={() => {
                  handleView(record.ems_instance_id, record.ems_instance_no);
                }}
              >
                {record.ems_instance_name}
              </a>
            </span>
            <Tag>{record.ems_instance_no}</Tag>
          </div>
        </>
      ),
    },
    {
      title: '站点类型',
      key: 'type',
      dataIndex: 'type',
      width: 300,
    },
    {
      title: '建设地址',
      width: 320,
      dataIndex: 'ems_instance_address',
      // render: (dom, record) => (
      //   <Tooltip title="浙江省杭州市临安市青山殿村">浙江省杭州市临安市青山殿村</Tooltip>
      // ),
    },
    {
      title: '建设时间',
      dataIndex: 'ems_instance_createtime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key={`edit-${record.ems_instance_id}`}>
          <Tooltip title="编辑">
            <EditOutlined />
          </Tooltip>
        </a>,
        // <a key={`delete-${record.ems_instance_id}`}>
        //   <Tooltip title="删除">
        //     <Popconfirm title="是否删除该项！" okText="是" cancelText="否">
        //       <DeleteOutlined />
        //     </Popconfirm>
        //   </Tooltip>
        // </a>,
        <a key={`opts-${record.ems_instance_id}`}>
          <Tooltip title="配置">
            <SettingOutlined
              onClick={() => {
                goToParanomicConfig(record.ems_instance_id);
              }}
            />
          </Tooltip>
        </a>,
      ],
    },
  ];

  return (
    <ProTable
      // request={request}
      className="stationTable"
      size="large"
      // headerTitle="监测站列表"
      options={{ fullScreen: false, reload: false, setting: false, density: false }}
      rowKey="ems_instance_id"
      search={false}
      defaultSize="middle"
      dataSource={stationListData || []}
      columns={columns}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};
