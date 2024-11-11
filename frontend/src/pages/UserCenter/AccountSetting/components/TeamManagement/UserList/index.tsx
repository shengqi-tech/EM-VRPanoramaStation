import { useRequest } from 'umi';
import { List, Card, Typography, Avatar, Tag, Image, Space, Popconfirm } from 'antd';
import React, { useRef, useState, useImperativeHandle } from 'react';
import { findSysuserByMap } from '@/services/swagger/sysuserController';
import styles from './index.less';

const UserList = React.forwardRef((props: any, ref: any) => {
  const { currentUser, selectUser } = props;
  const [currentCard, setCurrentCard] = useState(-1);

  const { data: userList, loading: customerListLoading } = useRequest(
    () => {
      return findSysuserByMap({
        ems_sysuser_customerid: currentUser?.ems_sysuser_customerid,
      });
    },
    {
      formatResult: (res: any) => {
        const list = res?.result?.list || [];
        return list;
      },
    },
  );

  const selectCustomer = async (user) => {
    if (user.ems_sysuser_id == currentCard) {
      setCurrentCard(-1);
      selectUser(null);
    } else {
      setCurrentCard(user.ems_sysuser_id);
      selectUser(user.ems_sysuser_id);
    }
  };

  useImperativeHandle(ref, () => ({}));

  return (
    <div className={styles.cardList} style={{ width: '100%' }}>
      <List
        rowKey="ems_sysuser_id"
        loading={customerListLoading}
        dataSource={userList || []}
        renderItem={(item: any) => {
          return (
            <List.Item
              key={item.ems_sysuser_id}
              style={{ padding: '0px 10px 10px 0' }}
              onClick={() => selectCustomer(item)}
            >
              <Card
                hoverable
                size="small"
                className={currentCard == item.ems_sysuser_id ? styles.checkedCard : styles.card}
              >
                <Card.Meta
                  avatar={
                    <Image
                      className={styles.cardAvatar}
                      src={`/systemfile${item.ems_sysuser_avatarfile?.ems_sysfile_path}`}
                      alt="暂无"
                    />
                  }
                  title={item.ems_sysuser_name}
                  description={item.roles?.map((role) => {
                    return role.ems_role_name;
                  })}
                />
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
});

export default UserList;
