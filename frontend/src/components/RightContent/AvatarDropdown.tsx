import { loginOut } from '@/services/swagger/sysuserController';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import useMyLocalStorage from '@/utils/mylocalstorage';
export type GlobalHeaderRightProps = {
  menu?: boolean;
};

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

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { savaCurrentUser, savaToken, getToken } = useMyLocalStorage();
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        savaCurrentUser(undefined);
        savaToken('');
        let token = getToken();
        while (token != '') {
          token = getToken();
        }
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        outLogin();
        return;
      } else if (key === 'setting') history.push(`/userCenter/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.ems_sysuser_id) {
    return loading;
  }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'setting',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={`/systemfile${currentUser.ems_sysuser_avatarfile?.ems_sysfile_path}`}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.ems_sysuser_loginname}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
