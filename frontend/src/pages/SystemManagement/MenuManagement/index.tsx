import { ProCard, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { Button, Popconfirm, Space, Tag, message, Tooltip } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { findItemByMap, deleteItem } from '@/services/swagger/itemController';
import EditMenu from './components/EditMenu';
import './index.less';
const IconFont = createFromIconfontCN({
  scriptUrl: '/iconfont/iconfont.js',
});

const MenuManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const editRoleRef = useRef<any>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'ems_item_name',
      render: (dom, entity) => {
        return (
          <>
            <Space>
              <IconFont type={entity.ems_item_icon} />
              {dom}
            </Space>
          </>
        );
      },
    },

    {
      title: '排序',
      dataIndex: 'ems_item_order',
      search: false,
    },
    {
      title: '请求地址',
      dataIndex: 'ems_item_path',
      search: false,
    },
    {
      title: '菜单类型',
      dataIndex: 'ems_item_type',
      hideInForm: true,
      search: false,
      valueEnum: {
        0: {
          text: '目录',
        },
        1: {
          text: '菜单',
        },
        2: {
          text: '按钮',
        },
        3: {
          text: '其他',
        },
      },
      render: (dom, entity) => {
        return <Tag>{dom}</Tag>;
      },
    },
    {
      title: '菜单标识',
      dataIndex: 'ems_item_code',
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
      dataIndex: 'ems_item_createtime',
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
          title={`是否确认删除该菜单`}
          okText="确认"
          cancelText="取消"
          onConfirm={(e) => {
            const ids: any = [record.ems_item_id];
            deleteItem({ ids: ids }).then((res) => {
              const { code } = res;
              if (code === 200) {
                message.success(res.message);
                actionRef.current?.reload();
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
        rowKey="ems_item_id"
        className="protable"
        expandable={{ childrenColumnName: 'ems_item_items' }}
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
                  return item.ems_item_id;
                });
                deleteItem({ ids: ids }).then((res) => {
                  const { code } = res;
                  if (code === 200) {
                    message.success(res.message);
                    actionRef.current?.reload();
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
            params.ems_item_starttime = params.times[0];
            params.ems_item_endtime = params.times[1];
          }
          const res = await findItemByMap(params);
          const result = {
            data: res.result || [],
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
      <EditMenu ref={editRoleRef} refresh={refresh} />
    </PageContainer>
  );
};
export default MenuManagement;
