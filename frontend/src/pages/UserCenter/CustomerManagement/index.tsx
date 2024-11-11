import {
  PlusOutlined,
  UsergroupAddOutlined,
  EditOutlined,
  DeleteOutlined,
  createFromIconfontCN,
  LockOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { history } from 'umi';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Input,
  Space,
  Alert,
  Avatar,
  Image,
  message,
  Tag,
  Popconfirm,
  Popover,
  Tooltip,
} from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import CustomerCards from './components/CustomerCard';
import ResetPassword from './components/ResetPassword';
import { findSysuserByMap, deleteSysuser } from '@/services/swagger/sysuserController';
import './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const { Search } = Input;

const CustomerManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const resetPasswordRef = useRef<any>();
  const customerRef = useRef<any>();
  const [currentCustomer, setCurrentCustomer] = useState<any>(null);
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户名称',
      dataIndex: 'userName',
      render: (dom, record) => (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={<Image src={`/systemfile${record?.avatar?.ems_sysfile_path}`} />} />
            <span style={{ marginRight: 8, marginLeft: 8 }}>
              <a
                onClick={() => {
                  const { id, companyId } = record;
                  history.push(`/customerManagement/view/${companyId}/${id}`);
                }}
              >
                {dom}
              </a>
            </span>
          </div>
        </>
      ),
    },
    {
      title: '登录名称',
      dataIndex: 'loginName',
      search: false,
    },
    {
      title: '公司',
      dataIndex: 'company',
      search: false,
      ellipsis: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      search: false,
    },
    {
      title: '地址',
      ellipsis: true,
      dataIndex: 'address',
      search: false,
    },
    {
      width: 100,
      title: '用户状态',
      dataIndex: 'status',
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
      title: '创建时间',
      dataIndex: 'times',
      valueType: 'dateRange',
      fieldProps: { format: 'YYYY/MM/DD' },
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      hideInForm: true,
      dataIndex: 'createTime',
      search: false,
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
              const { customerId, id } = record;
              history.push(`/customerManagement/edit/${customerId}/${id}`);
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
            const ids: any = [record.id];
            deleteSysuser({ ids: ids }).then((res) => {
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
        <Tooltip title="重置密码">
          <a
            style={{ color: 'rgb(33, 150, 243)' }}
            onClick={() => {
              resetPasswordRef.current.show(record);
            }}
          >
            <LockOutlined />
          </a>
        </Tooltip>,
        // <Tooltip title="分配管理">
        //   <a
        //     style={{ color: 'rgb(33, 150, 243)' }}
        //     onClick={() => {
        //       const { customerId, id } = record;
        //       history.push(`/customerManagement/distribute/${customerId}/${id}`);
        //     }}
        //   >
        //     <PartitionOutlined />
        //   </a>
        // </Tooltip>,
        ,
      ],
    },
  ];

  const onSearch = (value) => {
    customerRef.current?.refresh(value);
  };
  const content = (
    <Alert message="客户管理：管理客户企业信息，为客户管理账号。" type="info" showIcon />
  );

  const selectCustomer = (customer) => {
    setCurrentCustomer(customer);
  };

  return (
    <PageContainer
      content={content}
      header={{
        avatar: {
          icon: <IconFont type="icon-customer" />,
          size: 36,
          style: { background: '#1890ff' },
        },
        subTitle: '提供客户服务账号',
      }}
    >
      <ProCard split="vertical" ghost gutter={[8, 0]}>
        <ProCard
          title={<div style={{ width: '120%' }}>企业组织</div>}
          extra={
            <Space>
              <Search
                placeholder="请输入企业名称"
                allowClear
                onSearch={onSearch}
                style={{ width: '90%', marginLeft: '8%' }}
                enterButton
              />
              <Tooltip title="新增企业">
                <UsergroupAddOutlined
                  className="btn-add"
                  onClick={() => {
                    customerRef.current?.add();
                  }}
                />
              </Tooltip>
            </Space>
          }
          colSpan="23%"
        >
          <CustomerCards ref={customerRef} setCurrentCustomer={selectCustomer}></CustomerCards>
        </ProCard>
        <ProCard ghost style={{ height: '100%' }}>
          <ProTable<TableListItem, TableListPagination>
            className="protable"
            headerTitle={
              <Space>
                <Button
                  type="primary"
                  key="add"
                  onClick={() => {
                    history.push(
                      `/customerManagement/add/${currentCustomer?.ems_customer_id || -1}`,
                    );
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
                        const id = selectedRowsState[0].id;
                        history.push(
                          `/customerManagement/edit/${selectedRowsState[0]?.companyId}/${id}`,
                        );
                      } else {
                        message.info('请选择一项进行修改!');
                      }
                    } else {
                      message.info('请先选择用户！');
                    }
                  }}
                >
                  <EditOutlined /> 修改
                </Button>
                <Popconfirm
                  disabled={selectedRowsState.length == 0}
                  title={`是否确认删除选中的${selectedRowsState.length}条用户`}
                  okText="确认"
                  cancelText="取消"
                  onConfirm={(e) => {
                    const ids: any = selectedRowsState?.map((item) => {
                      return item.id;
                    });
                    deleteSysuser({ ids: ids }).then((res) => {
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
            rowKey="id"
            search={{
              labelWidth: 120,
            }}
            params={{ currentCustomer }}
            request={async (params) => {
              // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
              // 如果需要转化参数可以在这里进行修改
              if (params.times && params.times.length > 0) {
                params.startTime = params.times[0];
                params.endTime = params.times[1];
              }
              const res = await findSysuserByMap({
                ems_sysuser_starttime: params.startTime,
                ems_sysuser_endtime: params.endTime,
                ems_sysuser_name: params.userName,
                ems_sysuser_customerid: currentCustomer?.ems_customer_id,
              });
              const list: any = res.result?.list?.map((item) => {
                return {
                  id: item.ems_sysuser_id,
                  customerId: item.ems_sysuser_customerid,
                  userName: item.ems_sysuser_name,
                  loginName: item.ems_sysuser_loginname,
                  companyId: item?.ems_sysuser_customer?.ems_customer_id,
                  company: item?.ems_sysuser_customer?.ems_customer_name,
                  phone: item.ems_sysuser_mobilephone,
                  address: item.ems_sysuser_address,
                  createTime: item.ems_sysuser_creatime,
                  status: item.ems_sysuser_status,
                  avatar: item.ems_sysuser_avatarfile,
                };
              });
              const result = {
                data: list,
                /** 列表的内容总数 */
                total: res.result?.total,
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
          <ResetPassword ref={resetPasswordRef} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default CustomerManagement;
