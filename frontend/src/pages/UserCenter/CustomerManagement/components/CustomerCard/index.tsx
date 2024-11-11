import { AimOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { List, Card, Typography, Avatar, Tag, Image, Space, Popconfirm, message } from 'antd';
import React, { useRef, useState, useImperativeHandle } from 'react';
import moment from 'moment';
import { findCustomerByMap, deleteCustomer } from '@/services/swagger/customerController';
import styles from './index.less';
import AvatarList from '../../../../../components/AvatarList';
import EditCustomer from './EditCustomer';

import { Scrollbars } from 'react-custom-scrollbars-2';
const { Paragraph, Text } = Typography;

const CustomerCards = React.forwardRef((props: any, ref: any) => {
  const { setCurrentCustomer } = props;
  const editCustomerRef = useRef<any>(null);
  const [currentCard, setCurrentCard] = useState(-1);
  const [customerName, setCustomerName] = useState();

  const {
    data: customerListData,
    loading: customerListLoading,
    refresh: refreshCustomer,
  } = useRequest(
    () => {
      return findCustomerByMap({
        ems_customer_name: customerName,
      });
    },
    {
      formatResult: (res: any) => {
        return res?.result?.list;
      },
      refreshDeps: [customerName],
    },
  );

  const customerList = customerListData || [];

  const selectCustomer = async (customer) => {
    if (customer.ems_customer_id == currentCard) {
      setCurrentCard(-1);
      setCurrentCustomer(null);
    } else {
      setCurrentCustomer(customer);
      setCurrentCard(customer.ems_customer_id);
    }
  };

  useImperativeHandle(ref, () => ({
    async refresh(value) {
      setCustomerName(value);
    },
    async add() {
      editCustomerRef.current.show();
    },
  }));

  return (
    <Scrollbars style={{ width: '100%', height: 640 }}>
      <div className={styles.cardList} style={{ width: '100%' }}>
        <List<Partial<API.CustomerVo>>
          rowKey="ems_customer_id"
          loading={customerListLoading}
          dataSource={customerList}
          renderItem={(item) => {
            if (item && item.ems_customer_id) {
              return (
                <List.Item
                  key={item.ems_customer_id}
                  style={{ padding: '0px 10px 10px 0' }}
                  onClick={() => selectCustomer(item)}
                >
                  <Card
                    hoverable
                    size="small"
                    className={
                      currentCard == item.ems_customer_id ? styles.checkedCard : styles.card
                    }
                    actions={[
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                          editCustomerRef.current.show(item);
                        }}
                        key="option1"
                      >
                        修改
                      </a>,
                      <Popconfirm
                        title="确认是否删除！"
                        okText="是"
                        cancelText="否"
                        onConfirm={async (e: any) => {
                          e.stopPropagation();
                          const res = await deleteCustomer({
                            ems_customer_id: item.ems_customer_id,
                          });
                          if (res.code === 200) {
                            message.success(res.message);
                          } else {
                            message.error(res.message);
                          }
                          refreshCustomer();
                        }}
                        onCancel={(e: any) => {
                          e.stopPropagation();
                        }}
                      >
                        <a
                          key="option2"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          删除
                        </a>
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta
                      avatar={
                        <Image
                          className={styles.cardAvatar}
                          src={`/systemfile${item.ems_customer_logofile?.ems_sysfile_path}`}
                          alt="暂无"
                        />
                      }
                      title={
                        <Space>
                          <Text
                            style={{ width: '150px' }}
                            ellipsis={{ tooltip: item.ems_customer_name }}
                          >
                            {item.ems_customer_name}
                          </Text>

                          {item.ems_customer_isrealname === 1 ? (
                            <Tag color="blue">已实名</Tag>
                          ) : (
                            <Tag color="red">待实名</Tag>
                          )}
                        </Space>
                      }
                      description={item.ems_customer_address}
                    />
                    <div className={styles.cardItemContent}>
                      <span>{moment(item.ems_customer_createtime).fromNow()}</span>
                      <div className={styles.avatarList}>
                        <span style={{ marginRight: 8, marginLeft: 8 }}>
                          <AimOutlined />
                        </span>
                        <span style={{ marginRight: 8, marginLeft: 8 }}>要素：</span>
                        <AvatarList size="small">
                          <AvatarList.Item src="icon-daqi" tips={'大气'} />
                        </AvatarList>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              );
            }
          }}
        />
      </div>
      <EditCustomer ref={editCustomerRef} refresh={refreshCustomer} />
    </Scrollbars>
  );
});

export default CustomerCards;
