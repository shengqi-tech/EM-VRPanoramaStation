import { Descriptions, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { history } from 'umi';
import React from 'react';

const View: React.FC = () => {
  return (
    <PageContainer
      onBack={() => {
        history.push(`/systemManagement/roleManagement`);
      }}
    >
      <ProCard>
        <Descriptions title="基本信息" column={2}>
          <Descriptions.Item label="用户名称">熊</Descriptions.Item>
          <Descriptions.Item label="部门">研发</Descriptions.Item>
          <Descriptions.Item label="用户性别">男</Descriptions.Item>
          <Descriptions.Item label="地址">浙江省杭州市西湖区万塘路18号</Descriptions.Item>
          <Descriptions.Item label="手机号码">1810000000</Descriptions.Item>
          <Descriptions.Item label="邮箱">123456@qq.com</Descriptions.Item>
          <Descriptions.Item label="登录账号">admin</Descriptions.Item>
          <Descriptions.Item label="用户状态">正常</Descriptions.Item>
          <Descriptions.Item label="角色">管理员</Descriptions.Item>
        </Descriptions>
        <Divider
          style={{
            marginBottom: 32,
          }}
        />
        <Descriptions title="其他信息" column={2}>
          <Descriptions.Item label="创建者">admin</Descriptions.Item>
          <Descriptions.Item label="创建时间">2023-11-23 21:19:59</Descriptions.Item>
          <Descriptions.Item label="最后登录IP">125.120.28.30</Descriptions.Item>
          <Descriptions.Item label="最后登录时间">2024-01-25 14:59:51</Descriptions.Item>
          <Descriptions.Item label="备注">无</Descriptions.Item>
        </Descriptions>
      </ProCard>
    </PageContainer>
  );
};

export default View;
