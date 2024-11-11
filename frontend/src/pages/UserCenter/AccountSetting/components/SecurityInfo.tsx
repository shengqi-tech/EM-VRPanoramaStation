import { Button, Upload, message, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { ProList } from '@ant-design/pro-components';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import EditPassword from './EditPassword';
import EditTelphone from './EditTelphone';
import EditEmail from './EditEmail';

const SecurityInfo: React.FC<{ currentUser: any }> = (props) => {
  const { currentUser } = props;
  const editPasswordRef = useRef<any>();
  const editTelphoneRef = useRef<any>();
  const editEmailRef = useRef<any>();
  const saftyMessage = [
    {
      id: 1,
      name: '登录密码',
      image: <UserOutlined />,
      desc: '密码至少8位字符，包含数字、大小写字母、特殊符号',
    },
    {
      id: 2,
      name: '绑定手机',
      image: <PhoneOutlined />,
      desc: `已绑定: ${
        currentUser?.ems_sysuser_mobilephone?.replace(/^(\d{3})\d{4}(\d{4})$/, `$1****$2`) || '无'
      }`,
    },
    {
      id: 3,
      name: '绑定邮箱',
      image: <MailOutlined />,
      desc: '绑定邮箱可以用来找回密码',
    },
  ];

  const handleEdit = (record) => {
    if (record.id === 1) {
      editPasswordRef.current.show(currentUser);
    } else if (record.id === 2) {
      editTelphoneRef.current.show(currentUser);
    } else if (record.id === 3) {
      editEmailRef.current.show(currentUser);
    }
  };

  return (
    <>
      <ProList<any>
        rowKey="id"
        headerTitle="安全设置"
        dataSource={saftyMessage}
        showActions="hover"
        metas={{
          title: {
            dataIndex: 'name',
          },
          avatar: {
            dataIndex: 'image',
            editable: false,
          },
          description: {
            dataIndex: 'desc',
          },
          content: {
            dataIndex: 'content',
          },
          actions: {
            render: (text, row, index, action) => [<a onClick={() => handleEdit(row)}>修改</a>],
          },
        }}
      />
      <EditPassword ref={editPasswordRef} />
      <EditTelphone ref={editTelphoneRef} />
      <EditEmail ref={editEmailRef} />
    </>
  );
};

export default SecurityInfo;
