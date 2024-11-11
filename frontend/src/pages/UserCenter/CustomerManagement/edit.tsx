import { CloseCircleOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { history, useParams } from 'umi';
import {
  FooterToolbar,
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
import { Card, Col, message, Popover, Row } from 'antd';
import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { findCustomerByMap } from '@/services/swagger/customerController';
import {
  uploadUserFile,
  insertSysuser,
  updateSysuser,
  getSysuserView,
} from '@/services/swagger/sysuserController';
import { findRoleByMap } from '@/services/swagger/roleController';
import './index.less';
type InternalNamePath = (string | number)[];
const fieldLabels = {
  username: '用户名称',
  company: '所属公司',
  phone: '手机号码',
  email: '邮箱',
  account: '登录账号',
  password: '登录密码',
  address: '地址',
  role: '角色',
  status: '用户状态',
  remark: '备注',
  avatar: '头像',
};

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}
const AdvancedForm: FC<Record<string, any>> = () => {
  const formRef = useRef<any>();
  const params: any = useParams();
  const { customerId } = params;
  const [avatarfile, setAvatarfile] = useState<any>(null);
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as 'name' | 'url' | 'owner' | 'approver' | 'dateRange' | 'type';
      return (
        <li key={key} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined />
          <div>{err.errors[0]}</div>
          <div>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span>
        <Popover
          title="表单校验信息"
          content={errorList}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };
  const onFinish = async (values: Record<string, any>) => {
    try {
      let form: any = {
        ems_sysuser_password: values.password,
        ems_role_ids: values.role,
        ems_sysuser_address: values.address,
        ems_sysuser_avatarfile: avatarfile,
        ems_sysuser_customerid: values.company,
        ems_sysuser_loginname: values.account,
        ems_sysuser_mobilephone: values.phone,
        ems_sysuser_name: values.username,
        ems_sysuser_signature: values.remark,
        ems_sysuser_email: values.email,
        ems_sysuser_status: values.status ? 1 : 0,
      };
      let res: any;
      if (params && params.id) {
        form.ems_sysuser_id = params.id;
        res = await updateSysuser(form);
      } else {
        res = await insertSysuser(form);
      }
      if (res.code === 200) {
        message.success('提交成功');
      } else if (res.code === 500) {
        message.error(res.message);
      }
    } catch {}
  };
  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  useEffect(() => {
    if (params && params.id) {
      getSysuserView({ ems_sysuser_id: params.id }).then((res) => {
        const { code, result } = res;
        if (code === 200) {
          let form: any = {
            role: result?.roles?.map((item) => {
              return item.ems_role_id;
            }),
            email: result?.ems_sysuser_email,
            address: result?.ems_sysuser_address,
            account: result?.ems_sysuser_loginname,
            phone: result?.ems_sysuser_mobilephone,
            username: result?.ems_sysuser_name,
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
        submitter={{
          render: (props, dom) => {
            return (
              <FooterToolbar>
                {getErrorInfo(error)}
                {dom}
              </FooterToolbar>
            );
          },
        }}
        formRef={formRef}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
                disabled={params && params.id}
                label={fieldLabels.account}
                name="account"
                rules={[
                  {
                    required: true,
                    message: '请输入登录账号',
                  },
                ]}
                placeholder="请输入登录账号"
              />
              <ProFormText label={fieldLabels.address} name="address" placeholder="请输入地址" />
              {!(params && params.id) && (
                <ProFormSwitch
                  initialValue={true}
                  label={fieldLabels.status}
                  name="status"
                  checkedChildren={'正常'}
                  unCheckedChildren={'停用'}
                />
              )}
            </Col>
            <Col span={8} offset={2}>
              <ProFormSelect
                label={fieldLabels.company}
                name="company"
                rules={[
                  {
                    required: true,
                    message: '请选择所属公司',
                  },
                ]}
                initialValue={Number(customerId) > 0 ? Number(customerId) : null}
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
              {!(params && params.id) && (
                <ProFormText.Password
                  label={fieldLabels.password}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
                  placeholder="请输入密码"
                />
              )}
              <ProFormCheckbox.Group
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
              {params && params.id && (
                <ProFormSwitch
                  initialValue={true}
                  label={fieldLabels.status}
                  name="status"
                  checkedChildren={'正常'}
                  unCheckedChildren={'停用'}
                />
              )}
            </Col>
            <Col span={8}>
              <ProFormUploadButton
                fieldProps={{
                  listType: 'picture-card',
                  maxCount: 1,
                  customRequest: async (options) => {
                    const { onSuccess, onError, file }: any = options;
                    const { result, code }: any = await uploadUserFile({ file: file });
                    if (code == 200) {
                      const fileList: any = [
                        {
                          uid: result?.ems_sysfile_id,
                          name: result?.ems_sysfile_name,
                          status: 'done',
                          url: `/systemfile${result?.ems_sysfile_path}`,
                          thumbUrl: `/systemfile${result?.ems_sysfile_path}`,
                        },
                      ];
                      setAvatarfile(result);
                      formRef.current?.setFieldValue('avatar', fileList);
                      onSuccess('上传成功');
                    } else {
                      message.success('上传失败');
                      onError('上传失败');
                    }
                  },
                }}
                name="avatar"
                label={fieldLabels.avatar}
                width="md"
              />
            </Col>
          </Row>
        </ProCard>
        <ProCard title={<strong>其他信息</strong>} bordered={false} headerBordered>
          <Row gutter={16}>
            <Col span={24}>
              <ProFormTextArea
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
export default AdvancedForm;
