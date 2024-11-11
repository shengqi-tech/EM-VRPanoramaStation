import { ProFormText, ProFormCaptcha, StepsForm } from '@ant-design/pro-components';
import { Divider, message, Drawer, Button, Result, Alert } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useModel } from 'umi';
import { smsCode } from '@/services/swagger/sysuserController';
import React, { useState, useImperativeHandle, useRef } from 'react';
const EditEmail = React.forwardRef((props, ref: any) => {
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
            title="修改邮箱"
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
          // const result = await checkCode({
          //   mobile: tel,
          //   code: code,
          // });
          // if (result.code === 500) {
          //   message.error(result.message);
          //   return false;
          // } else if (result.code === 200) {
          //   message.success('身份验证成功！');
          // }
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
        {/* <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setStep(1);
            }}
          >
            立即验证
          </Button>
        </div> */}
      </StepsForm.StepForm>
      <StepsForm.StepForm
        layout="horizontal"
        name="checkbox"
        title="修改邮箱"
        onFinish={async (formData) => {
          return true;
        }}
      >
        <Alert
          style={{ marginBottom: '20px' }}
          message="我们不会泄漏您的邮箱信息"
          type="info"
          showIcon
        />
        <ProFormText
          name="tel"
          label="邮箱"
          placeholder="请输入邮箱"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        />
        <ProFormCaptcha
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
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
      </StepsForm.StepForm>
      <StepsForm.StepForm layout="horizontal" name="time" title="完成">
        <Result
          status="success"
          title="修改成功，您的邮箱号码为XXX.email"
          extra={[
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

export default EditEmail;
