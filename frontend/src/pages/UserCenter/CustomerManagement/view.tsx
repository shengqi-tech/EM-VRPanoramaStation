import { CloseCircleOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { history, useParams } from 'umi';
import {
  ProFormItem,
  ProForm,
  ProFormSwitch,
  ProFormSelect,
  ProFormText,
  ProFormCheckbox,
  ProFormTextArea,
  ProCard,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, message, Image, Row } from 'antd';
import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { findCustomerByMap } from '@/services/swagger/customerController';
import { uploadUserFile, getSysuserView } from '@/services/swagger/sysuserController';
import { findRoleByMap } from '@/services/swagger/roleController';
import './index.less';
const fieldLabels = {
  username: '用户名称',
  company: '所属公司',
  phone: '手机号码',
  email: '邮箱',
  account: '登录名称',
  password: '登录密码',
  address: '地址',
  role: '角色',
  status: '用户状态',
  remark: '备注',
  avatar: '头像',
};

const View: FC<Record<string, any>> = () => {
  const formRef = useRef<any>();
  const params: any = useParams();
  const { customerId } = params;
  const [avatarfile, setAvatarfile] = useState<any>(null);

  useEffect(() => {
    if (params && params.id) {
      getSysuserView({ ems_sysuser_id: params.id }).then((res) => {
        const { code, result } = res;
        if (code === 200) {
          let form: any = {
            role: result?.roles?.map((item) => {
              return item.ems_role_id;
            }),
            address: result?.ems_sysuser_address,
            account: result?.ems_sysuser_loginname,
            phone: result?.ems_sysuser_mobilephone,
            username: result?.ems_sysuser_name,
            password: result?.ems_sysuser_password,
            remark: result?.ems_sysuser_signature,
            status: result?.ems_sysuser_status === 1 ? true : false,
          };
          if (result?.ems_sysuser_avatarfile && result?.ems_sysuser_avatarfile?.ems_sysfile_id) {
            setAvatarfile(result?.ems_sysuser_avatarfile);
            form.avatar = [
              {
                uid: result?.ems_sysuser_avatarfile?.ems_sysfile_id,
                name: result?.ems_sysuser_avatarfile?.ems_sysfile_name,
                status: 'done',
                url: `/systemfile${result?.ems_sysuser_avatarfile?.ems_sysfile_path}`,
                thumbUrl: `/systemfile${result?.ems_sysuser_avatarfile?.ems_sysfile_path}`,
              },
            ];
          }
          formRef.current.setFieldsValue(form);
        }
      });
    }
  }, [params]);

  return (
    <PageContainer
      onBack={() => {
        history.push(`/customerManagement`);
      }}
      className="edit"
    >
      <ProForm
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        hideRequiredMark
        submitter={false}
        formRef={formRef}
      >
        <ProCard
          title={<strong>基本信息</strong>}
          bordered={false}
          headerBordered
          style={{ marginBottom: '24px' }}
        >
          <Row>
            <Col span={6}>
              <ProFormText
                readonly
                label={fieldLabels.username}
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名称',
                  },
                ]}
                placeholder="请输入用户名称"
              />
              <ProFormText
                readonly
                label={fieldLabels.phone}
                name="phone"
                rules={[
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                  },
                ]}
                placeholder="请输入手机号码"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                  addonAfter: <PhoneOutlined />,
                }}
              />
              <ProFormText
                readonly
                label={fieldLabels.account}
                name="account"
                rules={[
                  {
                    required: true,
                    message: '请输入登录名称',
                  },
                ]}
                placeholder="请输入登录名称"
              />
              <ProFormSwitch
                readonly
                label={fieldLabels.status}
                name="status"
                checkedChildren={'正常'}
                unCheckedChildren={'停用'}
              />
            </Col>
            <Col span={8} offset={2}>
              <ProFormSelect
                readonly
                label={fieldLabels.company}
                name="company"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
                initialValue={customerId ? Number(customerId) : 0}
                request={async (params) => {
                  let { result } = await findCustomerByMap({});
                  const options = result?.list?.map((item) => {
                    return {
                      label: item.ems_customer_name,
                      value: item.ems_customer_id,
                    };
                  });
                  return options || [];
                }}
                placeholder="请选择"
              />
              <ProFormText
                readonly
                label={fieldLabels.email}
                name="email"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                  addonAfter: <MailOutlined />,
                }}
                placeholder="请输入邮箱"
              />
              <ProFormText
                readonly
                label={fieldLabels.address}
                name="address"
                placeholder="请输入地址"
              />
              <ProFormCheckbox.Group
                readonly
                name="role"
                label={fieldLabels.role}
                rules={[
                  {
                    required: true,
                    message: '请选择至少一种角色！',
                  },
                ]}
                request={async (params) => {
                  let { result } = await findRoleByMap({});
                  const options = result?.list?.map((item) => {
                    return {
                      label: item.ems_role_name,
                      value: item.ems_role_id,
                    };
                  });
                  return options || [];
                }}
              />
            </Col>
            <Col span={8}>
              <ProFormItem label="头像" name="avatar">
                <Image width={200} src={`/systemfile${avatarfile?.ems_sysfile_path}`} />
              </ProFormItem>
            </Col>
          </Row>
        </ProCard>
        <ProCard title={<strong>其他信息</strong>} bordered={false} headerBordered>
          <Row gutter={16}>
            <Col span={24}>
              <ProFormTextArea
                readonly
                labelCol={{ span: 1 }}
                wrapperCol={{ span: 15 }}
                label={fieldLabels.remark}
                name="remark"
              />
            </Col>
          </Row>
        </ProCard>
      </ProForm>
    </PageContainer>
  );
};
export default View;
