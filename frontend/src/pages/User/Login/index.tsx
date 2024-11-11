import React, { useState, useEffect, useRef } from 'react';
import PanoramaImg from '@/assets/images/login/panorama.jpg';
import { Viewer, Panorama, Common } from '@/utils/three/xThree';
import Footer from '@/components/Footer';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import { history, useModel } from 'umi';
import { login, smsCode, smsLogin } from '@/services/swagger/sysuserController';
import useMyLocalStorage from '@/utils/mylocalstorage';
import './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
    // closable
  />
);
const Login: React.FC = () => {
  const form = useRef<any>();
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { savaToken, getToken } = useMyLocalStorage();

  const handleSubmit = async (values: any) => {
    try {
      let msg;
      if (type === 'account') {
        msg = await login({ ...values });
      } else {
        msg = await smsLogin({ ...values });
      }
      // 登录

      if (msg.code === 200) {
        let token: any = msg?.result || '';
        savaToken(token);
        token = getToken();
        while (token === '') {
          token = getToken();
        }

        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
          await setInitialState((s) => ({
            ...s,
            currentUser: userInfo,
            token: token,
          }));
        }

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  const { code } = userLoginState;

  // 初始化
  useEffect(() => {
    let viewer: any;
    viewer = new Viewer({
      domId: 'loginPanorama',
    });
    window.viewer = viewer;
    viewer.viewHelper.visible = false;
    let panorama = new Panorama(viewer);
    panorama.addSphere(PanoramaImg);

    Common.autoRotate(true, 0.5);
    return () => {
      Common.autoRotate(false, 0.5);
      panorama?.dispose();
      window.viewer = null;
    };
  }, []);

  return (
    <div className="login-container">
      <div id="loginPanorama"></div>
      <div className="mask"></div>
      <div className="login">
        <LoginForm
          formRef={form}
          title="EM720Station"
          subTitle={'生态环境720全景自动监测站系统'}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <a
              key="type"
              onClick={() => {
                if (type === 'account') {
                  setType('mobile');
                } else {
                  setType('account');
                }
              }}
            >
              {type === 'account' ? '短信验证码登录' : '账号密码登录'}
            </a>,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.loginParams);
          }}
        >
          <div className="logoImgBox">
            <img alt="logo" src="/logo.svg" className="logoImg" />
          </div>
          {code === 500 && type === 'account' && (
            <LoginMessage content={userLoginState.message || ''} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名！'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码！'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {code === 500 && type === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="mobile"
                placeholder={'请输入手机号！'}
                rules={[
                  {
                    required: true,
                    message: '手机号是必填项！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                phoneName="mobile"
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="smsCode"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await smsCode({
                    mobile: phone,
                  });
                  if (result.code === 500) {
                    return;
                  }
                  // message.success(result.message);
                }}
              />
            </>
          )}
        </LoginForm>
        <Footer />
      </div>
    </div>
  );
};
export default Login;
