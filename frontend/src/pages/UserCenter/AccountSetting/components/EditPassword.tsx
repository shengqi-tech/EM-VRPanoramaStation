import { ProFormText, ProFormCaptcha, StepsForm } from '@ant-design/pro-components';
import { stringify } from 'querystring';
import { history, useModel } from 'umi';
import { Divider, message, Drawer, Button, Result } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { smsCode, checkCode, resetPwd, loginOut } from '@/services/swagger/sysuserController';
import React, { useState, useImperativeHandle, useRef } from 'react';
const EditPassword = React.forwardRef((props, ref: any) => {
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));

  const [visible, setVisible] = useState(false);
  const formRef = useRef<ProFormInstance>();

  const [tel, setTel] = useState('');
  const [step, setStep] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<number>();
  useImperativeHandle(ref, () => ({
    async show(currentUser: any) {
      formRef.current?.resetFields();
      setTel(currentUser?.ems_sysuser_mobilephone);
      setCurrentUserId(currentUser?.ems_sysuser_id);
      setVisible(true);
    },
  }));

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const outLogin = async () => {
    await loginOut();
    const { query = {}, search, pathname } = history.location;
    const { redirect } = query;
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  return (
    <StepsForm
      current={step}
      onCurrentChange={(value) => {
        setStep(value);
      }}
      formRef={formRef}
      onFinish={async (values) => {
        setVisible(false);
        message.success('提交成功');
      }}
      formProps={{
        validateMessages: {
          required: '此项为必填项',
        },
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Drawer
            width={isMobile ? undefined : 600}
            title="修改密码"
            onClose={() => {
              setStep(0);
              formRef.current?.resetFields();
              setVisible(false);
            }}
            open={visible}
            footer={submitter}
            destroyOnClose
          >
            {dom}
          </Drawer>
        );
      }}
      submitter={{
        render: (props) => {
          if (props.step === 0) {
            return (
              <Button type="primary" onClick={() => props.onSubmit?.()}>
                立即验证
              </Button>
            );
          }

          if (props.step === 1) {
            return [
              <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                确定
              </Button>,
            ];
          }

          return [];
        },
      }}
    >
      <StepsForm.StepForm
        layout="horizontal"
        name="base"
        title="验证身份"
        onFinish={async (formData) => {
          const { code } = formData;
          const result = await checkCode({
            mobile: tel,
            code: code,
          });
          if (result.code === 500) {
            message.error(result.message);
            return false;
          } else if (result.code === 200) {
            message.success('身份验证成功！');
          }

          return true;
        }}
      >
        <ProFormText
          name="tel"
          label="手机号"
          placeholder="请输入手机号"
          readonly
          initialValue={tel?.replace(/^(\d{3})\d{4}(\d{4})$/, `$1****$2`)}
        />
        <ProFormCaptcha
          label="验证码"
          phoneName="phone"
          name="code"
          placeholder="请输入验证码"
          rules={[
            {
              pattern: /^\d+$/,
              message: '验证码只能输入数字！',
            },
          ]}
          onGetCaptcha={async () => {
            const result = await smsCode({
              mobile: tel,
            });
            if (result.code === 500) {
              return;
            }
            message.success(`手机号 ${tel} 验证码发送成功!`);
          }}
        />
        <Divider />
        <p style={{ color: 'gray' }}> 1.接收验证码的手机号为您账号中绑定的安全手机号</p>
        <p style={{ color: 'gray' }}>
          2.发送验证码后，您可以在手机短信中获取(1分钟内未收到，建议在垃圾短信中查看)
        </p>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        layout="horizontal"
        name="checkbox"
        title="修改登录密码"
        onFinish={async (formData) => {
          const { password } = formData;
          const result = await resetPwd({
            ems_sysuser_id: currentUserId,
            ems_sysuser_password: password,
          });
          if (result.code === 500) {
            message.error(result.message);
            return false;
          } else if (result.code === 200) {
            message.success('修改密码成功！');
          }

          return true;
        }}
      >
        <ProFormText.Password
          name="password"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          label="新的登录密码"
          placeholder="请输入新的登录密码"
          rules={[
            {
              required: true,
              message: '密码是必填项！',
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: '密码至少包含一个字母和一个数字，且长度不少于8位',
            },
          ]}
        />
        <ProFormText.Password
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="password2"
          label="确认新的登录密码"
          placeholder="请输入新的登录密码"
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('您输入的新密码不匹配！'));
              },
            }),
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm layout="horizontal" name="time" title="完成">
        <Result
          status="success"
          title="修改成功，请牢记新的登录密码"
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                outLogin();
              }}
            >
              重新登录
            </Button>,
            <Button
              key="buy"
              onClick={() => {
                setStep(0);
                setVisible(false);
              }}
            >
              关闭
            </Button>,
          ]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
});

export default EditPassword;
