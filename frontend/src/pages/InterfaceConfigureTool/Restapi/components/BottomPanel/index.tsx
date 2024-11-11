import { useEffect, useState } from 'react';
import {
  Tabs,
  Alert,
  Card,
  Button,
  List,
  Popconfirm,
  Typography,
  Tooltip,
  Avatar,
  Skeleton,
  message,
} from 'antd';
import {
  createFromIconfontCN,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { history, useRequest, useModel } from 'umi';
import { findPanoramaByMap, deletePanorama } from '@/services/swagger/panoramaController';
import styles from './index.less';

import ReactJson from 'react-json-view';

const { Meta } = Card;
const { Paragraph, Title, Text } = Typography;

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});

type BottomPanelProps = {
  height: number;
};

const BottomPanel = (props: BottomPanelProps) => {
  const { height } = props;
  const [currentLevelId, setCurrentLevelId] = useState<number>(0);

  const { testReuslt } = useModel('InterfaceConfigureTool.apiConfig', (ret) => ({
    testReuslt: ret.testResult,
  }));

  const changeTab = (value) => {
    setCurrentLevelId(value);
  };

  const list = [
    {
      id: '2',
      name: 'body',
      icon: <IconFont type="icon-hangpai1" className={styles.icon_level_air} />,
    },
    {
      id: '1',
      name: 'header',
      icon: <IconFont type="icon-dituleilouti" className={styles.icon_level_two} />,
    },
  ];

  return (
    <div className={styles.bottomPanel}>
      <Tabs
        // style={{ height: 165 }}
        size="small"
        tabPosition="top"
        tabBarGutter={0}
        onChange={changeTab}
        tabBarExtraContent={
          <div>
            <Tooltip title="上一步" placement="bottom">
              <CopyOutlined className={styles.icon} />
            </Tooltip>
            <Tooltip title="下一步" placement="bottom">
              <IconFont type="icon-xiayibu" className={styles.icon} />
            </Tooltip>
            <span className={styles.space}>|</span>
            Status
            <span className={styles.statusText}>200{testReuslt?.status}</span>
            Time
            <span className={styles.statusText}>81{testReuslt?.time}</span>
            Size
            <span className={styles.statusText}>30{testReuslt?.size}</span>
            {testReuslt?.date && (
              <>
                Date
                <span className={styles.statusText}>{testReuslt?.date}</span>
              </>
            )}
            {/* <IconButton
            aria-label="save-request-button"
            icon={<CopyIcon />}
            variant="ghost"
            size="sm"
            ml="2"
            disabled={!response || !response.body}
            onClick={handleCopyToClipboardClick}
          /> */}
          </div>
        }
        defaultActiveKey={'0'}
        items={list.map((item) => {
          return {
            label: item.name,

            key: String(item.id),
            children: (
              <div style={{ overflow: 'auto', height: height }}>
                {/* <Skeleton active loading={responseLoading}> */}
                <ReactJson
                  src={testReuslt}
                  style={{ overflow: 'auto', height: 'inherit' }}
                  theme="summerfruit"
                  // collapsed={true}
                />
                {/* </Skeleton> */}
              </div>
            ),
          };
        })}
      />
    </div>
  );
};
export default BottomPanel;
