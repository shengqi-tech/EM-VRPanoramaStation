import {
  CloseCircleOutlined,
  createFromIconfontCN,
  ToolOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { history, useParams } from 'umi';
import {
  FooterToolbar,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormCheckbox,
  ProCard,
} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Col,
  message,
  Popover,
  Row,
  List,
  Image,
  Typography,
  Space,
  Tag,
  Avatar,
} from 'antd';
import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { findCustomerByMap } from '@/services/swagger/customerController';
import { findInstanceByMap } from '@/services/swagger/instanceController';
import { insertSysuser, updateSysuser, getSysuserView } from '@/services/swagger/sysuserController';
import { findRoleByMap } from '@/services/swagger/roleController';
import moment from 'moment';
import './index.less';
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const { Meta } = Card;
const { Text } = Typography;
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
const Distribute: FC<Record<string, any>> = () => {
  const formRef = useRef<any>();
  const params: any = useParams();
  const { customerId } = params;
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
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

  const handleCardClick = (id) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
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
      findInstanceByMap({}).then((res) => {
        setDataSource(res.result?.list || []);
      });
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
            </Col>
            <Col span={8} offset={2}>
              <ProFormSelect
                label={fieldLabels.company}
                readonly
                name="company"
                rules={[
                  {
                    required: true,
                    message: '请选择所属公司',
                  },
                ]}
                initialValue={Number(customerId)}
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
            </Col>
            <Col span={8}>
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
          </Row>
        </ProCard>
        <ProCard title={<strong>分配管理</strong>} bordered={false} headerBordered>
          <List
            pagination={{ pageSize: 10 }}
            rowKey="ems_instance_id"
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 5,
              xxl: 5,
            }}
            dataSource={dataSource}
            renderItem={(item: any, index) => {
              return (
                <List.Item key={item.ems_instance_id}>
                  <Card
                    className={selectedCards.includes(item.ems_instance_id) ? 'checkedCard' : ''}
                    onClick={() => handleCardClick(item.ems_instance_id)}
                    hoverable
                    bodyStyle={{ paddingBottom: 20 }}
                    cover={
                      <>
                        <img
                          height={200}
                          alt="监测站图"
                          src={`/systemfile${item?.ems_instance_picfile?.ems_sysfile_path}`}
                        ></img>
                        <div style={{ top: '155px', left: '5px', position: 'absolute' }}>
                          <Text
                            mark
                            ellipsis={{ tooltip: item.ems_instance_address }}
                            style={{ float: 'left', color: 'white' }}
                          >
                            {item.ems_instance_address}
                          </Text>
                          <Text style={{ float: 'left', color: 'white' }}>
                            {item.ems_instance_constructionendtime
                              ? item.ems_instance_constructionendtime
                              : '----'}
                            建设
                          </Text>
                        </div>
                      </>
                    }
                  >
                    <Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size="large"
                          style={{ background: 'none' }}
                          icon={<IconFont type="icon-shui" className="icon_monitorStation" />}
                        />
                      }
                      title={
                        <Space>
                          <Text
                            style={{ width: '100px' }}
                            ellipsis={{ tooltip: item.ems_instance_name }}
                          >
                            {item.ems_instance_name}
                          </Text>

                          <Tag color="blue" style={{ float: 'right' }}>
                            {item.ems_instance_no}
                          </Tag>
                        </Space>
                      }
                      description={
                        <>
                          <Text type="secondary" ellipsis={{ tooltip: item.ems_instance_address }}>
                            {item.ems_instance_address}
                          </Text>
                          <div style={{ fontSize: '10px' }}>PM₂.₅ PM₁₀ CO NOₓ O₃ SO₂</div>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }}
          />
        </ProCard>
      </ProForm>
    </PageContainer>
  );
};
export default Distribute;
