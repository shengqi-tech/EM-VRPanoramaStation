import { QuestionCircleOutlined, BellOutlined, DesktopOutlined } from '@ant-design/icons';
import { Space, Tooltip, Popover } from 'antd';
import React, { useRef } from 'react';
import { useModel, history } from 'umi';
import HelpDrawer from './HelpDrawer';
import Avatar from './AvatarDropdown';
import Notice from './Notice';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';
const GlobalHeaderRight: React.FC = () => {
  const helpDrawerRef = useRef<any>(null);
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }
  const { navTheme, layout } = initialState.settings;
  let className = styles.right;
  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <span className={`${styles.action}`}>
        <DesktopOutlined
          onClick={() => {
            history.push(`/home`);
          }}
        />
      </span>
      <Popover placement="bottomRight" title={false} content={<Notice />} trigger="click">
        <Tooltip placement="bottom" title="通知">
          <span className={`${styles.action}`}>
            <BellOutlined />
          </span>
        </Tooltip>
      </Popover>
      <Tooltip placement="bottom" title="帮助">
        <span
          className={`${styles.action} help`}
          onClick={() => {
            helpDrawerRef.current.show();
          }}
        >
          <QuestionCircleOutlined />
        </span>
      </Tooltip>
      <Avatar menu={true} />
      <HelpDrawer ref={helpDrawerRef} />
    </Space>
  );
};
export default GlobalHeaderRight;
