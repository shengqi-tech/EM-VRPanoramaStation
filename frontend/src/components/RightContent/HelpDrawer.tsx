import { CloseOutlined } from '@ant-design/icons';
import { Card, Drawer, Divider, List } from 'antd';
import React, { useState, useImperativeHandle, useEffect } from 'react';
import './HelpDrawer.less';
const HelpDrawer = React.forwardRef((props: any, ref: any) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const data = [
    {
      title: '2024年3月15日',
      des: '生态环境720全景自动监测站系统(EM720Station) V1.0.0 成功上线！',
    },
    {
      title: '2024年3月6日',
      des: '版本重要升级，添加通知、帮助功能！',
    },
  ];
  const handleOutsideClick = (e) => {
    const drawer = document.querySelector('.helpDrawer');
    const help = document.querySelector('.help');
    if (help && help.contains(e.target)) {
      return;
    }
    if (drawer && !drawer.contains(e.target)) {
      onClose();
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    async show() {
      if (open) {
        onClose();
      } else {
        showDrawer();
      }
    },
  }));

  return (
    <>
      <Drawer
        closable={false}
        mask={false}
        title="帮助"
        placement="right"
        onClose={onClose}
        open={open}
        extra={<CloseOutlined onClick={onClose} />}
        className="helpDrawer"
      >
        <Card
          onClick={() => {
            window.open('/md/help.html', '_blank');
          }}
          hoverable
          bodyStyle={{ display: 'none' }}
          cover={<img alt="example" src={require('@/assets/images/other/help.png')} />}
        ></Card>
        <Divider style={{ marginBottom: '10px' }} />
        <List
          header={<div>新功能</div>}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={<a>{item.title}</a>} description={item.des} />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
});

export default HelpDrawer;
