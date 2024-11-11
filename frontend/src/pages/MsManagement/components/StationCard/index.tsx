import React, { useRef, useState, useEffect } from 'react';
import {
  Card,
  List,
  Tooltip,
  Avatar,
  Popconfirm,
  Button,
  Typography,
  Tag,
  Image,
  Switch,
  Space,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  createFromIconfontCN,
  ToolOutlined,
  SyncOutlined,
  CloudOutlined,
} from '@ant-design/icons';
import { setHare } from '@/services/swagger/instanceController';
import { history, useRequest, useModel } from 'umi';
import AddOrEditStation from '../AddOrEditStation';
import Tour from './tour';
import styles from './index.less';
import './index.less';
import moment from 'moment';
const { Text } = Typography;
const { Meta } = Card;
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
let flag = true;
const StationCard: React.FC = () => {
  const stationRef = useRef<any>();
  const vrRef = useRef<any>();
  const [status, setStatus] = useState(false);

  const start = () => {
    setStatus(true);
  };

  const onSetStatus = (data: boolean) => {
    setStatus(data);
  };
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  const { stationListData } = useModel('Panorama.data', (ret) => ({
    stationListData: ret.stationListData,
  }));

  const handleInfo = (id, no) => {
    history.push(`/msManagement/stationDetail/${id}`);
  };

  const handleView = (id, no) => {
    window.open(`/msManagement/panorama/${id}?no=${no}`, '_blank');
  };

  const goToParanomicConfig = (id: number) => {
    history.push(`/msManagement/panoramicConfig/${id}`);
  };

  useEffect(() => {
    if (stationListData && stationListData.length > 0 && flag) {
      flag = false;
      setStatus(true);
    }
  }, [stationListData]);

  const changeStationHare = (id, value) => {
    const isshare = value ? 1 : 0;
    setHare({ ems_instance_id: id, ems_instance_isshare: isshare }).then((res) => {
      message.success(res.message);
    });
  };

  return (
    <>
      <List
        pagination={{ pageSize: 8 }}
        rowKey="ems_instance_id"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        // loading={loading}
        dataSource={[...stationListData]}
        renderItem={(item, index) => {
          if (item && item.ems_instance_id) {
            return (
              <List.Item key={item.ems_instance_id}>
                <Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                  cover={
                    <>
                      <Image
                        height={200}
                        alt="监测站图"
                        src={`/systemfile${item?.ems_instance_picfile?.ems_sysfile_path}`}
                      ></Image>
                      <div style={{ top: '5px', position: 'absolute', zIndex: 1 }}>
                        <Switch
                          onChange={(value) => {
                            changeStationHare(item.ems_instance_id, value);
                          }}
                          size="small"
                          checkedChildren="共享"
                          unCheckedChildren="不开放"
                          defaultChecked={item.ems_instance_isshare === 1 ? true : false}
                          style={{ float: 'right' }}
                        />
                      </div>
                      <div style={{ top: '5px', left: '5px', position: 'absolute' }}>
                        <IconFont
                          type="icon-zhanfangjiance"
                          className={styles.icon_monitorStation}
                        />
                      </div>

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
                  actions={
                    !isMobile
                      ? [
                          <Tooltip key="info" title="站房详情">
                            <InfoCircleOutlined
                              onClick={() => {
                                handleInfo(item.ems_instance_id, item.ems_instance_no);
                              }}
                            />
                          </Tooltip>,
                          <Tooltip key="view" title="VR浏览">
                            <IconFont
                              type="icon-vr-m"
                              className={`icon_vr ${index === 0 && 'tour-first'}`}
                              onClick={() => {
                                handleView(item.ems_instance_id, item.ems_instance_no);
                              }}
                            />
                          </Tooltip>,
                          <Tooltip key="edit" title="编辑">
                            <EditOutlined
                              onClick={() => {
                                stationRef?.current?.show(item);
                              }}
                            />
                          </Tooltip>,
                          <Tooltip key="edit" title="配置">
                            <SettingOutlined
                              onClick={() => {
                                goToParanomicConfig(item.ems_instance_id);
                              }}
                            />
                          </Tooltip>,
                        ]
                      : [
                          <Tooltip key="view" title="VR浏览">
                            <IconFont
                              ref={vrRef}
                              type="icon-vr-m"
                              className={`icon_vr ${index === 0 && 'tour-first'}`}
                              onClick={() => {
                                handleView(item.ems_instance_id, item.ems_instance_no);
                              }}
                            />
                          </Tooltip>,
                        ]
                  }
                  className={item.ems_instance_isalarm ? styles.alarmdiv : ''}
                >
                  <Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size="large"
                        style={{ background: 'none' }}
                        icon={<IconFont type="icon-shui" className={styles.icon_monitorStation} />}
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
                  {/* <div className={styles.cardContent}>
                    <CloudOutlined />
                    <Text>武汉生栖有限公司</Text>
                    <Text type="secondary">2023-11-24 13:35:23</Text>
                  </div> */}

                  <div className={styles.cardItemContent}>
                    <span>
                      {moment(
                        item.ems_instance_updatetime
                          ? item.ems_instance_updatetime
                          : item.ems_instance_createtime,
                      ).fromNow()}
                      <span style={{ marginLeft: 3 }}>
                        <SyncOutlined style={{ color: 'gray' }} />
                      </span>
                    </span>

                    <div className={styles.avatarList}>
                      <span style={{ marginRight: 8, marginLeft: 12 }}>
                        <ToolOutlined style={{ color: 'gray' }} />
                      </span>

                      <Text
                        type="secondary"
                        style={{ width: '120px' }}
                        ellipsis={{ tooltip: item.ems_instance_name }}
                      >
                        {item.ems_instance_name}
                      </Text>
                    </div>
                  </div>
                </Card>
              </List.Item>
            );
          }
          // return (
          //   <List.Item>
          //     <Button
          //       type="dashed"
          //       className={styles.newButton}
          //       onClick={() => {
          //         stationRef?.current?.show();
          //       }}
          //     >
          //       <PlusOutlined />
          //       新增监测站
          //     </Button>
          //   </List.Item>
          // );
        }}
      />

      <AddOrEditStation ref={stationRef} refreshList={() => {}} />
      <Tour run={status} onSetStatus={onSetStatus} />
    </>
  );
};
export default StationCard;
