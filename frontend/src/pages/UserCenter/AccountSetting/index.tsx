import {
  MoneyCollectOutlined,
  CheckCircleOutlined,
  ContactsOutlined,
  PhoneOutlined,
  CloseCircleOutlined,
  VerifiedOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import { message, Tag, Space, Avatar, Alert, Card, Divider, Typography, Row, Col } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  ProFormInstance,
  ProFormCascader,
  ProFormUploadButton,
  ProFormText,
  ProForm,
  ProCard,
  ProFormTextArea,
} from '@ant-design/pro-components';
import ProDescriptions from '@ant-design/pro-descriptions';
import {
  uploadUserFile,
  getCurrentUser,
  personalSetting,
} from '@/services/swagger/sysuserController';
import TeamManagement from './components/TeamManagement';
import styles from './index.less';
import Company from './components/Company';
import SecurityInfo from './components/SecurityInfo';
import { history, useModel } from 'umi';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const { Title, Text } = Typography;

const Personal: React.FC<{ customerid: number }> = (props) => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [avatarfile, setAvatarfile] = useState<any>(null);
  const { initialState, setInitialState } = useModel('@@initialState');

  const persionInfoColumns = [
    {
      dataIndex: 'ems_sysuser_avatarfile',
      render: (_, record) => (
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <Avatar size={128} src={`/systemfile${record.cover?.ems_sysfile_path}`} />
          <Title level={4}>{record.ems_sysuser_name}</Title>
          <Text type="secondary">{record.ems_sysuser_signature}</Text>
          <Divider style={{ margin: 0 }} dashed />
        </div>
      ),
    },
    {
      dataIndex: 'ems_sysuser_loginname',
      title: '登录账号',
      render: (_, record) => (
        <>
          {_}
          <a style={{ paddingLeft: 10 }}>
            {new Date(Date.parse(record.ems_sysuser_creatime)).toLocaleString('en-US', {
              timeZone: 'Asia/Shanghai',
            })}
          </a>
        </>
      ),
    },
    {
      dataIndex: 'ems_sysuser_realname',
      title: (
        <>
          <VerifiedOutlined style={{ marginRight: 3 }}></VerifiedOutlined>企业实名
        </>
      ),
      render: (_, record) => (
        <>
          {false ? (
            <>
              <Tag icon={<CheckCircleOutlined />} color="success">
                实名通过
              </Tag>
              <a>详情</a>
            </>
          ) : (
            <>
              <Tag icon={<CloseCircleOutlined />} color="error">
                暂未实名
              </Tag>
              <a>去实名</a>
            </>
          )}
        </>
      ),
    },
    {
      dataIndex: 'stations',
      title: (
        <>
          <MoneyCollectOutlined style={{ marginRight: 3 }} />
          全景监测站
        </>
      ),
      render: (_, record) => (
        <>
          <span>
            <Text strong>30座</Text>-<Text type="success">完成 3</Text>/
            <Text type="danger">27 未设置</Text>
          </span>
        </>
      ),
    },
    {
      dataIndex: 'roles',
      title: (
        <>
          <ContactsOutlined style={{ marginRight: 3 }} />
          角色
        </>
      ),

      render: (_, record) => (
        <>
          <div>
            <Space>
              {record?.roles?.map((role) => {
                return <span>{role.ems_role_name}</span>;
              })}
            </Space>
          </div>
        </>
      ),
    },
    {
      dataIndex: 'contact',
      title: (
        <>
          <PhoneOutlined style={{ marginRight: 3 }} />
          联系方式
        </>
      ),

      render: (_, record) => (
        <>
          <div>
            {record?.ems_sysuser_mobilephone?.replace(/^(\d{3})\d{4}(\d{4})$/, `$1****$2`)}-
            {record.ems_sysuser_address}
          </div>
        </>
      ),
    },
  ];

  const [currenttab, setcurrenttab] = useState('tab1');

  const changetab = (e) => {
    setcurrenttab(e);
  };

  const formRef = useRef<ProFormInstance<API.SysuserVo>>();

  const [formLayoutType, setFormLayoutType] = useState<LayoutType>('horizontal');

  const finish = async () => {
    let params: any = formRef.current?.getFieldsValue();
    params.ems_sysuser_id = currentUser?.ems_sysuser_id;
    if (params.ems_sysuser_avatarfile && params.ems_sysuser_avatarfile[0]) {
      params.ems_sysuser_avatarfile = avatarfile;
    } else {
      params.ems_sysuser_avatarfile = {};
    }
    const res = await personalSetting(params);
    refreshCurrentUser();
    message.success(res.message);
  };

  const refreshCurrentUser = () => {
    getCurrentUser().then((res) => {
      if (res.code == 200) {
        let currentUser: any = res.result;
        currentUser.cover = res.result?.ems_sysuser_avatarfile;
        setCurrentUser(currentUser);
        let form: any = res.result;
        if (form.ems_sysuser_avatarfile) {
          setAvatarfile(form?.ems_sysuser_avatarfile);
          const fileList: any = [
            {
              uid: form?.ems_sysuser_avatarfile?.ems_sysfile_id,
              name: form?.ems_sysuser_avatarfile?.ems_sysfile_name,
              status: 'done',
              url: `/systemfile${form?.ems_sysuser_avatarfile?.ems_sysfile_path}`,
              thumbUrl: `/systemfile${form?.ems_sysuser_avatarfile?.ems_sysfile_path}`,
            },
          ];
          form.ems_sysuser_avatarfile = fileList;
        } else {
          form.ems_sysuser_avatarfile = [];
        }
        formRef.current?.setFieldsValue(form);
      }
    });
  };

  useEffect(() => {
    refreshCurrentUser();
  }, []);

  const formItemLayout =
    formLayoutType === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 8 },
        }
      : null;

  const content = (
    <Alert message="个人设置：个人基本信息、安全信息以及企业认证等设置。" type="info" showIcon />
  );
  return (
    <PageContainer
      content={content}
      header={{
        avatar: {
          icon: <IconFont type="icon-personalsetting" />,
          size: 36,
          style: { background: '#1890ff' },
        },
        subTitle: '个人相关信息的设置',
      }}
    >
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div>
              <ProDescriptions
                bordered={false}
                column={1}
                contentStyle={{ width: '15%' }}
                dataSource={currentUser}
                columns={persionInfoColumns}
              />
              <Alert
                message="基本资料以实名信息为准，以下信息仅供参考，填写以下信息方便我们更好为您服务。"
                type="info"
                showIcon
              />
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <ProCard
            tabs={{
              tabPosition: 'top',
              activeKey: currenttab,
              onChange: changetab,
            }}
          >
            <ProCard.TabPane key="tab1" tab="基本信息">
              <ProForm<API.SysuserVo>
                onFinish={finish}
                formRef={formRef}
                grid={true}
                {...formItemLayout}
                layout={formLayoutType}
                submitter={{
                  render: (props, doms) => {
                    return formLayoutType === 'horizontal' ? (
                      <Row>
                        <Col span={14} offset={4}>
                          <Space>{doms}</Space>
                        </Col>
                      </Row>
                    ) : (
                      doms
                    );
                  },
                }}
                dateFormatter={(value, valueType) => {
                  return value.format('YYYY/MM/DD HH:mm:ss');
                }}
                autoFocusFirstInput
              >
                <ProFormText name="ems_sysuser_name" label="姓名" placeholder="请输入" tooltip="" />
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
                        formRef.current?.setFieldValue('ems_sysuser_avatarfile', fileList);
                        onSuccess('上传成功');
                      } else {
                        message.success('上传失败');
                        onError('上传失败');
                      }
                    },
                  }}
                  name="ems_sysuser_avatarfile"
                  className={styles.uploadlistinline}
                  label="头像"
                />
                <ProFormCascader
                  name="address"
                  label="地址"
                  fieldProps={{
                    options: [],
                  }}
                />
                <ProFormText
                  name="ems_sysuser_address"
                  label="详细地址"
                  placeholder="请输入"
                  tooltip=""
                />
                <ProFormTextArea name="ems_sysuser_signature" label="简介:" placeholder="请输入" />
              </ProForm>
            </ProCard.TabPane>
            <ProCard.TabPane key="tab2" tab="安全信息">
              <SecurityInfo currentUser={currentUser} />
            </ProCard.TabPane>
            <ProCard.TabPane key="tab3" tab="企业实名">
              <Company customerId={currentUser?.ems_sysuser_customerid} />
            </ProCard.TabPane>
            <ProCard.TabPane key="tab4" tab="团队管理">
              <TeamManagement currentUser={currentUser} />
            </ProCard.TabPane>
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Personal;
