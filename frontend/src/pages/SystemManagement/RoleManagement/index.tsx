import { ProCard, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { Button, Popconfirm, Space, Tag, message, Tooltip } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { findRoleByMap, deleteRole } from '@/services/swagger/roleController';
import EditRole from './components/EditRole';
import './index.less';
const RoleManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const editRoleRef = useRef<any>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'ems_role_name',
    },
    {
      title: '角色标识',
      dataIndex: 'ems_role_tag',
      render: (dom, entity) => {
        return (
          <>
            <Space size={[0, 'small']} wrap>
              <Tag>{dom}</Tag>
            </Space>
          </>
        );
      },
    },
    {
      title: '角色状态',
      dataIndex: 'ems_role_status',
      hideInForm: true,
      search: false,
      valueEnum: {
        0: {
          text: '停用',
          status: 'Default',
        },
        1: {
          text: '正常',
          status: 'Processing',
        },
      },
    },
    {
      title: '角色描述',
      dataIndex: 'ems_role_des',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'times',
      valueType: 'dateRange',
      fieldProps: { format: 'YYYY/MM/DD' },
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'ems_role_createtime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Tooltip title="编辑">
          <a
            style={{ color: 'rgb(33, 150, 243)' }}
            onClick={() => {
              editRoleRef.current.show(record);
            }}
          >
            <EditOutlined />
          </a>
        </Tooltip>,
        <Popconfirm
          title={`是否确认删除该用户`}
          okText="确认"
          cancelText="取消"
          onConfirm={(e) => {
            const ids: any = [record.ems_role_id];
            deleteRole({ ids: ids }).then((res) => {
              const { code } = res;
              if (code === 200) {
                message.success(res.message);
                actionRef.current?.reload();
              } else {
                message.error(res.message);
              }
            });
          }}
        >
          <Tooltip title="删除">
            <a style={{ color: 'red' }}>
              <DeleteOutlined />
            </a>
          </Tooltip>
        </Popconfirm>,
        // <Tooltip title="分配用户">
        //   <a style={{ color: 'rgb(33, 150, 243)' }}>
        //     <UserOutlined />
        //   </a>
        // </Tooltip>,
      ],
    },
  ];

  const refresh = () => {
    actionRef.current?.reload();
  };

  return (
    <PageContainer
      header={{
        subTitle: '',
      }}
    >
      <ProTable<TableListItem, TableListPagination>
        rowKey="ems_role_id"
        className="protable"
        headerTitle={
          <Space>
            <Button
              type="primary"
              key="add"
              onClick={() => {
                editRoleRef.current.show();
              }}
            >
              <PlusOutlined /> 新增
            </Button>
            <Button
              style={{
                background: `rgba(110, 200, 110,${selectedRowsState.length === 1 ? 1 : 0.5})`,
                border: 'none',
              }}
              type="primary"
              key="edit"
              onClick={() => {
                if (selectedRowsState.length > 0) {
                  if (selectedRowsState.length === 1) {
                    const role = selectedRowsState[0];
                    editRoleRef.current.show(role);
                  } else {
                    message.info('请选择一项进行修改!');
                  }
                } else {
                  message.info('请先选择角色！');
                }
              }}
            >
              <EditOutlined /> 修改
            </Button>
            <Popconfirm
              disabled={selectedRowsState.length == 0}
              title={`是否确认删除选中的${selectedRowsState.length}条角色`}
              okText="确认"
              cancelText="取消"
              onConfirm={(e) => {
                const ids: any = selectedRowsState?.map((item) => {
                  return item.ems_role_id;
                });
                console.log(ids, 123);
                deleteRole({ ids: ids }).then((res) => {
                  const { code } = res;
                  if (code === 200) {
                    message.success(res.message);
                    actionRef.current?.reload();
                  } else {
                    message.error(res.message);
                  }
                });
              }}
            >
              <Button
                danger
                style={{
                  background: `rgba(255, 0, 0,${selectedRowsState.length > 0 ? 1 : 0.4})`,
                  border: 'none',
                }}
                type="primary"
                key="delete"
                onClick={() => {
                  if (selectedRowsState.length > 0) {
                  } else {
                    message.info('请先选择用户！');
                  }
                }}
              >
                <DeleteOutlined /> 删除
              </Button>
            </Popconfirm>
          </Space>
        }
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={async (params) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          if (params.times && params.times.length > 0) {
            params.ems_role_starttime = params.times[0];
            params.ems_role_endtime = params.times[1];
          }
          const res = await findRoleByMap(params);
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
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <EditRole ref={editRoleRef} refresh={refresh} />
    </PageContainer>
  );
};
export default RoleManagement;
