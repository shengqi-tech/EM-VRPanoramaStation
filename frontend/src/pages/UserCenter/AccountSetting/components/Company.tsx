import { Button, Upload, message, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import {
  findCustomerByMap,
  uploadCustomerLogoFile,
  updateCustomer,
} from '@/services/swagger/customerController';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

const Company: React.FC<{ customerId: number }> = (props) => {
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));

  const { customerId } = props;
  const customerRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<any>({});

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const saveCustomer = async () => {
    let params = dataSource;
    const res = await updateCustomer(params);
    message.success(res.message);
    refreshCustomer();
  };

  const refreshCustomer = () => {
    if (customerId) {
      findCustomerByMap({ ems_customer_id: customerId }).then((res) => {
        const { code, result } = res;
        if (code === 200) {
          if (result?.list && result?.list[0]) {
            setDataSource(result?.list[0]);
          }
        }
      });
    }
  };

  useEffect(() => {
    refreshCustomer();
  }, []);

  const customercolumns = [
    {
      title: '企业名称',
      dataIndex: 'ems_customer_name',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '账号类型',
      dataIndex: 'ems_customer_type', //待名称出来后替换
      hideInSearch: true,
    },
    {
      title: '企业证件类型',
      dataIndex: 'ems_customer_authtype', //待名称出来后替换
      hideInSearch: true,
    },
    {
      title: '认证状态',
      dataIndex: 'ems_customer_isrealname', //待名称出来后替换
      hideInSearch: true,
      editable: false,
      valueEnum: {
        0: {
          text: '待实名',
          status: 'Default',
        },
        1: {
          text: '已实名',
          status: 'Success',
        },
      },
    },
    {
      title: '认证时间',
      valueType: 'dateTime',
      editable: false,
      dataIndex: 'ems_customer_realnametime', //待名称出来后替换
      hideInSearch: true,
    },
    {
      title: '法人姓名',
      dataIndex: 'ems_customer_legalperson', //待名称出来后替换
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '法人证件类型',
      dataIndex: 'ems_customer_legalidtype', //待名称出来后替换
      hideInSearch: true,
    },
    {
      title: '组织机构代码',
      dataIndex: 'ems_customer_organizationcode', //待名称出来后替换
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '企业Logo',
      dataIndex: 'ems_customer_logofile',
      hideInSearch: true,
      editable: false,
      render: (record) => [
        <Upload
          listType="picture-card"
          showUploadList={false}
          maxCount={1}
          className="avatar-uploader"
          customRequest={async (options) => {
            setLoading(true);
            const { onSuccess, onError, file }: any = options;
            const { result, code }: any = await uploadCustomerLogoFile({ file: file });
            setLoading(false);
            if (code == 200) {
              dataSource.ems_customer_logofile = result;
              setDataSource({ ...dataSource });
              onSuccess('上传成功');
            } else {
              message.success('上传失败');
              onError('上传失败');
            }
          }}
        >
          {record?.ems_sysfile_path ? (
            <img style={{ width: '100px' }} src={`/systemfile${record?.ems_sysfile_path}`} />
          ) : (
            uploadButton
          )}
        </Upload>,
      ],
    },
    {
      title: '企业邮箱',
      dataIndex: 'ems_customer_email',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '企业地址',
      dataIndex: 'ems_customer_address',
      hideInSearch: true,
    },
    {
      title: '省',
      dataIndex: 'ems_customer_state',
      hideInSearch: true,
    },
    {
      title: '市',
      dataIndex: 'ems_customer_city',
      hideInSearch: true,
    },
    {
      title: '区',
      dataIndex: 'ems_customer_region',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'ems_customer_des',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [
        <Popconfirm
          title="是否提交！"
          okText="是"
          cancelText="否"
          onConfirm={() => {
            saveCustomer;
          }}
        >
          <Button type="primary">修改认证主体</Button>
        </Popconfirm>,
      ],
    },
  ];

  const authenticationcolumns = [
    {
      title: '认证类型',
      dataIndex: 'eme_customer_name',
      hideInSearch: true,
    },
    {
      title: '认证内容',
      dataIndex: 'eme_customer_name',
      hideInSearch: true,
    },
    {
      title: '当前状态',
      dataIndex: 'eme_customer_name',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'eme_customer_name',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [<a key="primary">查看</a>, <a key="primary">撤回</a>],
    },
  ];

  return (
    <>
      <ProDescriptions
        actionRef={customerRef}
        bordered={true}
        column={isMobile ? 1 : 2}
        contentStyle={{ width: '35%' }}
        title="企业实名认证"
        dataSource={dataSource}
        editable={{
          onSave: async (keypath, newInfo, oriInfo) => {
            setDataSource(newInfo);
            return true;
          },
        }}
        columns={customercolumns}
      />
      {/* <ProTable
        search={false}
        // toolBarRender={false}
        // headerTitle={'认证记录'}
        toolbar={{
          title: '认证记录',
        }}
        size="small"
        onSubmit={async (value) => {
          // const success = await handleAdd(value);
          // if (success) {
          //   handleModalVisible(false);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
        }}
        rowKey="eme_custormer_auth"
        // type="form"
        columns={authenticationcolumns}
        rowSelection={{}}
      /> */}
    </>
  );
};

export default Company;
