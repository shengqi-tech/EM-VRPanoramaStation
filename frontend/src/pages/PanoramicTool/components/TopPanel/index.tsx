import { RollbackOutlined, DesktopOutlined } from '@ant-design/icons';
import { useModel, useParams, history } from 'umi';
import { Button, Segmented, Tooltip, Space, Typography } from 'antd';
import { createFromIconfontCN, QrcodeOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import styles from './index.less';
const { Paragraph } = Typography;

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const TopPanel = () => {
  const params: any = useParams();
  const { instanceId } = params;

  const handleView = () => {
    const no = panoramaData?.ems_panorama_instance?.ems_instance_no;
    window.open(`/msManagement/panorama/${instanceId}?no=${no}`, '_blank');
  };
  const { panoramaData } = useModel('PanoramicTool.panoramaData', (ret) => ({
    panoramaData: ret.panoramaData,
  }));
  return (
    <div className={styles.topPanel}>
      <div className={styles.leftBox}>
        <Button
          icon={<RollbackOutlined />}
          className={styles.loginoutBtn}
          onClick={() => {
            window.close();
          }}
        >
          退出
        </Button>
      </div>

      <div className={styles.title}>
        {panoramaData?.ems_panorama_instance?.ems_instance_name} - {panoramaData?.ems_panorama_name}
      </div>

      <div className={styles.style}>
        <Space>
          <Tooltip
            placement="bottom"
            title={
              <Space direction="vertical" align="center">
                <QRCode
                  value={
                    window.location.origin +
                    `/msManagement/panorama/${instanceId}?no=${panoramaData?.ems_panorama_instance?.ems_instance_no}`
                  }
                  size={128}
                />
                <a
                  href={
                    window.location.origin +
                    `/msManagement/panorama/${instanceId}?no=${panoramaData?.ems_panorama_instance?.ems_instance_no}`
                  }
                >
                  VR浏览地址
                </a>
              </Space>
            }
          >
            <div className={styles.share}>
              <QrcodeOutlined className={styles.iconCode} />
              <span>分享</span>
            </div>
          </Tooltip>
          <div
            className={styles.share}
            onClick={() => {
              handleView();
            }}
          >
            <DesktopOutlined className={styles.iconCode} />
            <span>预览</span>
          </div>
          <Segmented
            options={[
              {
                label: '',
                value: 'List',
                icon: <IconFont type="icon-suno" className={styles.icon} />,
              },
              {
                label: '',
                value: 'Kanban',
                icon: <IconFont type="icon-night" className={styles.icon} />,
              },
            ]}
          />
        </Space>
      </div>
    </div>
  );
};
export default TopPanel;
