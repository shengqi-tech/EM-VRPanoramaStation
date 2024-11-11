import {
  Tag,
  Alert,
  Card,
  Button,
  List,
  Table,
  Popconfirm,
  Image,
  Typography,
  Tooltip,
  Avatar,
  Space,
  message,
} from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import {
  createFromIconfontCN,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import { history, useParams } from 'umi';
import { findPanoramaByMap, deletePanorama } from '@/services/swagger/panoramaController';
import { findInstanceByMap } from '@/services/swagger/instanceController';
import styles from './index.less';
import './index.less';
import AddOrEditPanorama from './AddOrEditPanorama';
import UploadPanorama from './UploadPanorama';

const { Paragraph, Title, Text } = Typography;
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const PanoramicConfig: React.FC = (props) => {
  const params: any = useParams();
  const { instanceId } = params;

  const actionRef = useRef<any>();
  const panoramaRef = useRef<any>();
  const uploadRef = useRef<any>();
  const [currentLevelId, setCurrentLevelId] = useState<number>(0);
  const [instanceData, setInstanceData] = useState<API.InstanceVo>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const leftCardLables: any = [
    {
      id: 2,
      name: '空中',
      icon: <IconFont type="icon-hangpai1" className={styles.icon_level_air} />,
    },
    {
      id: 1,
      name: '二楼',
      icon: <IconFont type="icon-dituleilouti" className={styles.icon_level_two} />,
    },
    {
      id: 0,
      name: '一楼',
      icon: <IconFont type="icon-a-bianzu123" className={styles.icon_level_one} />,
    },
  ];

  const goToParanomicTool = (panorama: API.PanoramaViewVo) => {
    window.open(
      `/msManagement/panoramicConfig/${panorama.ems_panorama_instanceid}/${panorama.ems_panorama_id}`,
      '_blank',
    );
  };

  const columns = [
    {
      dataIndex: 'ems_panorama_id',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      title: '场景名称',
      key: 'ems_panorama_name',
      dataIndex: 'ems_panorama_name',
      render: (_, record) => (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Space size={24}>
              <Image
                width={80}
                src={`/systemfile${record?.ems_panorama_cover?.ems_sysfile_path}`}
              />
              <Text
                style={{ width: '100px', fontSize: '16px' }}
                ellipsis={{ tooltip: record?.ems_panorama_name }}
              >
                <a
                  onClick={() => {
                    goToParanomicTool(record);
                  }}
                >
                  {record?.ems_panorama_name}
                </a>
              </Text>
              <Tag color="#108ee9">
                {
                  leftCardLables?.find((item) => {
                    return item.id === record.ems_panorama_level;
                  }).name
                }
              </Tag>
            </Space>
          </div>
        </>
      ),
    },
    {
      title: '创建时间',
      key: 'ems_panorama_createtime',
      dataIndex: 'ems_panorama_createtime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key={`edit-${record.ems_panorama_id}`}
          onClick={(e) => {
            if (e && e.stopPropagation) {
              e.stopPropagation();
              panoramaRef?.current?.show(record);
            }
          }}
        >
          <Tooltip title="编辑">
            <EditOutlined />
          </Tooltip>
        </a>,
        <a key={`delete-${record.ems_panorama_id}`}>
          <Tooltip title="删除">
            <Popconfirm
              title="是否删除该项！"
              okText="是"
              cancelText="否"
              onConfirm={() => {
                deletePanorama({ ems_panorama_id: record.ems_panorama_id }).then((res) => {
                  if (res.code == 200) {
                    message.success(res.message);
                  } else {
                    message.error(res.message);
                  }
                  actionRef.current.reload();
                });
              }}
            >
              <DeleteOutlined />
            </Popconfirm>
          </Tooltip>
        </a>,
        <a key={`opts-${record.ems_panorama_id}`}>
          <Tooltip title="配置">
            <SettingOutlined
              onClick={() => {
                goToParanomicTool(record);
              }}
            />
          </Tooltip>
        </a>,
      ],
    },
  ];

  const request = async (
    // 第一个参数 params 查询表单和 params 参数的结合,表单搜索项会从 params 传入，
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: any & {
      pageSize: number;
      current: number;
    },
    sort,
    filter,
  ) => {
    //const hide = message.loading('正在查询');
    try {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      const queryParams = {
        ems_panorama_level: currentLevelId,
        ems_panorama_instanceid: instanceId,
        ...params,
        pageNum: params.current,
        ...sort,
        ...filter,
      };

      const response = await findPanoramaByMap(queryParams);

      const list = {
        data: response?.result?.list,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: response.code === 200 ? true : false,
        /** 列表的内容总数 */
        total: response?.result?.total,
      };

      return list;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    findInstanceByMap({ ems_instance_id: instanceId }).then((res) => {
      const list = res.result?.list || [];
      const instanceData = list[0];
      setInstanceData(instanceData);
    });
  }, []);

  return (
    <PageContainer
      className="PanoramicConfig"
      onBack={() => {
        history.push(`/msManagement`);
      }}
      header={{
        avatar: { src: `/systemfile${instanceData.ems_instance_picfile?.ems_sysfile_path}` },
        title: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 8, marginLeft: 8 }}>{instanceData.ems_instance_name}</span>
          </div>
        ),
        tags: <Tag color="blue">{instanceData.ems_instance_no}</Tag>,
      }}
      content={
        <div>
          {instanceData.ems_instance_des && (
            <Alert message={`简述 : ${instanceData.ems_instance_des}`} type="info" showIcon />
          )}
        </div>
      }
      style={{
        background: '#F4F7FA',
      }}
    >
      <Card>
        <Typography>
          <Title level={4}>数字孪生设计</Title>
          <Paragraph>
            包含了站点各楼层的全景布置、转场的设计、标签热点布置、实时工况设备绑定、图像数据融合等。
          </Paragraph>
        </Typography>
        <ProCard.Group
          title="场景管理"
          extra={
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={(e) => {
                if (e && e.stopPropagation) {
                  e.stopPropagation();
                  uploadRef?.current?.show();
                }
              }}
            >
              打开上传
            </Button>
          }
          split="vertical"
        >
          {/* 左侧模块 */}
          <ProCard colSpan="20%">
            <div className={styles.leftCardList}>
              <List
                rowKey="id"
                loading={false}
                dataSource={leftCardLables}
                renderItem={(item: any) => {
                  return (
                    <List.Item key={item.id} onClick={() => setCurrentLevelId(item.id)}>
                      <Card
                        hoverable
                        className={`${styles.card} ${
                          currentLevelId == item.id ? styles.checkedCard : styles.card
                        }`}
                      >
                        <Card.Meta
                          avatar={
                            <Avatar
                              shape="square"
                              size="large"
                              style={{ background: 'none' }}
                              icon={item.icon}
                            />
                          }
                          title={<Text ellipsis={{ tooltip: item.name }}>{item.name}</Text>}
                        />
                      </Card>
                    </List.Item>
                  );
                }}
              />
            </div>
          </ProCard>
          {/* 右侧模块 */}
          <ProCard>
            <ProTable
              request={request}
              actionRef={actionRef}
              className="stationTable"
              size="large"
              options={{ fullScreen: false, reload: false, setting: false, density: false }}
              rowKey="ems_panorama_id"
              params={{ currentLevelId }}
              search={false}
              defaultSize="middle"
              columns={columns}
              rowSelection={{
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                defaultSelectedRowKeys: [],
                onChange: (_, selectedRows) => {
                  setSelectedRowKeys(selectedRows);
                },
              }}
              tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
                <Space size={24}>
                  <span>
                    已选 {selectedRowKeys.length} 项
                    <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                      取消选择
                    </a>
                  </span>
                </Space>
              )}
              tableAlertOptionRender={() => {
                return (
                  <Space size={16}>
                    <a>批量删除</a>
                  </Space>
                );
              }}
              pagination={{
                pageSize: 10,
              }}
            />
          </ProCard>
        </ProCard.Group>
        <AddOrEditPanorama
          instanceid={instanceId}
          ref={panoramaRef}
          refreshList={() => {
            actionRef.current.reload();
          }}
        />
        <UploadPanorama
          ref={uploadRef}
          levelId={currentLevelId}
          instanceId={instanceId}
          refreshList={() => {
            actionRef.current.reload();
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default PanoramicConfig;
