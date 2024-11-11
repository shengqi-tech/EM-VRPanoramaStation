import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { Row, Col, message, Upload } from 'antd';
import React, { useState, useImperativeHandle, useRef } from 'react';
import { resetPwd } from '@/services/swagger/sysuserController';
const ResetPassword = React.forwardRef((props, ref: any) => {
  const formRef = useRef<any>();
  const [user, setUser] = useState({ id: -1, loginName: '', password: '' });
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    async show(user: any) {
      formRef.current?.setFieldValue('account', user.loginName);
      setUser(user);
      setVisible(true);
    },
  }));

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      width={600}
      formRef={formRef}
      visible={visible}
      onVisibleChange={(value) => {
        setVisible(value);
        formRef.current?.resetFields();
      }}
      title="重置密码"
      layout="horizontal"
      grid={true}
      rowProps={{
        gutter: [0, 8],
      }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={async (values) => {
        resetPwd({
          ems_sysuser_id: user.id,
          ems_sysuser_password: values.password,
        }).then((res) => {
          if (res.code === 200) {
            message.success(res.message);
          } else {
            message.error(res.message);
          }
          return true;
        });
      }}
    >
      <ProFormText
        disabled
        label="登录账号"
        name="account"
        initialValue={user.loginName}
        rules={[
          {
            required: true,
            message: '请输入登录名称',
          },
        ]}
        placeholder="请输入登录名称"
      />
      <ProFormText.Password
        label="账号密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
        placeholder="请输入密码"
      />
    </DrawerForm>
  );
});
export default ResetPassword;
