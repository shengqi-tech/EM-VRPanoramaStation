import { useEffect, useState, useRef } from 'react';
import {
  Tabs,
  Card,
  List,
  Typography,
  Avatar,
  Skeleton,
  Menu,
  Dropdown,
  message,
  Tooltip,
  Button,
} from 'antd';
import { createFromIconfontCN, PlusOutlined } from '@ant-design/icons';
import { history, useModel, useParams } from 'umi';
import {
  findPanoramaByMap,
  setHomePage,
  deletePanorama,
  sort,
} from '@/services/swagger/panoramaController';
import styles from './index.less';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UploadPanorama from './UploadPanorama';

const { Meta } = Card;
const { Text } = Typography;

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const PanoramaList = () => {
  const uploadRef = useRef<any>();
  const params: any = useParams();
  const { instanceId } = params;

  const url = `/msManagement/panoramicConfig/${instanceId}`;

  const { panoramaData } = useModel('PanoramicTool.panoramaData', (ret) => ({
    panoramaData: ret.panoramaData,
  }));
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [activeKey, setActiveKey] = useState(0); // 使用对象来存储每个 Card 的菜单可见状态
  const [menuVisible, setMenuVisible] = useState({}); // 使用对象来存储每个 Card 的菜单可见状态

  const handleCardClick = (event, item: API.PanoramaVo) => {
    if (event.button === 2) {
      event.preventDefault(); // 阻止默认右键点击事件
      const newMenuVisible = { ...menuVisible, [String(item.ems_panorama_id)]: true };
      setMenuVisible(newMenuVisible);
    }
  };

  const handleMenuVisibleChange = (visible, item: API.PanoramaVo) => {
    const newMenuVisible = { ...menuVisible, [String(item.ems_panorama_id)]: visible };
    setMenuVisible(newMenuVisible);
  };

  //菜单项点击事件
  const handleMenuClick = async (event: any, item: API.PanoramaVo) => {
    const newMenuVisible = { ...menuVisible, [String(item.ems_panorama_id)]: false };
    setMenuVisible(newMenuVisible);
    let res: any;
    if (event.key == 1) {
      res = await setHomePage({
        ems_panorama_id: item.ems_panorama_id,
        ems_instance_id: instanceId,
      });
    } else if (event.key == 3) {
      res = await deletePanorama({
        ems_panorama_id: item.ems_panorama_id || 0,
      });
      // history.push(`${url}/${item.ems_panorama_id}`);
    }
    if (res?.code == 200) {
      message.success(res?.message);
      request();
    }
  };

  const request = () => {
    setLoading(true);
    findPanoramaByMap({
      ems_panorama_instanceid: instanceId,
    }).then((res) => {
      let list = res?.result?.list || [];
      setLoading(false);
      setDataSource(list);
    });
  };

  useEffect(() => {
    request();
  }, []);

  const list = [
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

  const changeLevel = (key: number) => {
    setActiveKey(key);
  };

  const handleDragEnd = async (result: any) => {
    const { draggableId, destination, source } = result;
    let list = dataSource?.filter((data) => {
      return data.ems_panorama_level == activeKey;
    });
    // 从原位置移除元素
    const [removed] = list.splice(source.index, 1);
    // 将元素插入到目标位置
    list.splice(destination.index, 0, removed);
    setDataSource(list);
    let next = list[destination.index + 1] || {};
    let res = await sort({
      sortId: draggableId,
      id: next.ems_panorama_id || null,
    });
    if (res?.code == 200) {
      message.success(res?.message);
      request();
    }
  };

  return (
    <div className={styles.PanoramaList}>
      {/* <Button className={styles.btnAddGroup}>添加分组</Button> */}
      <Tabs
        style={{ height: 165 }}
        tabPosition="left"
        tabBarGutter={6}
        defaultActiveKey={'0'}
        onChange={changeLevel}
        items={list.map((item) => {
          return {
            label: (
              <div>
                <Avatar
                  shape="square"
                  style={{ background: 'none', marginRight: '3px' }}
                  icon={item.icon}
                />
                {item.name}
              </div>
            ),
            key: String(item.id),
            children: (
              <div className={styles.bottomPanelList}>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="droppable-1" direction="horizontal">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ width: '100%' }}
                      >
                        <Skeleton active loading={loading}>
                          <List<API.PanoramaVo>
                            rowKey="ems_panorama_id"
                            grid={{
                              gutter: 0,
                            }}
                            dataSource={[
                              ...dataSource?.filter((data) => {
                                return data.ems_panorama_level == Number(item.id);
                              }),
                            ]}
                            renderItem={(item: API.PanoramaVo, i) => {
                              if (item && item.ems_panorama_id) {
                                return (
                                  <List.Item key={item.ems_panorama_id}>
                                    <Draggable
                                      draggableId={String(item.ems_panorama_id)}
                                      key={i}
                                      index={i}
                                    >
                                      {(p) => (
                                        <div
                                          ref={p.innerRef}
                                          {...p.draggableProps}
                                          {...p.dragHandleProps}
                                          key={String(item.ems_panorama_id)}
                                        >
                                          <Dropdown
                                            visible={menuVisible[item.ems_panorama_id]}
                                            onVisibleChange={(visible) =>
                                              handleMenuVisibleChange(visible, item)
                                            }
                                            overlay={
                                              <Menu
                                                onClick={(event) => {
                                                  handleMenuClick(event, item);
                                                }}
                                              >
                                                <Menu.Item key="1">设置为首页</Menu.Item>
                                                <Menu.Item key="2">编辑</Menu.Item>
                                                <Menu.Item key="3">删除</Menu.Item>
                                              </Menu>
                                            }
                                            trigger={['contextMenu']}
                                          >
                                            <Card
                                              onContextMenu={() => {
                                                history.push(`${url}/${item.ems_panorama_id}`);
                                                handleMenuVisibleChange(true, item);
                                              }}
                                              onClick={(event) => {
                                                handleCardClick(event, item);
                                                history.push(`${url}/${item.ems_panorama_id}`);
                                              }}
                                              className={
                                                item.ems_panorama_id ==
                                                panoramaData?.ems_panorama_id
                                                  ? styles.selectedCard
                                                  : styles.card
                                              }
                                              size="small"
                                              hoverable
                                              cover={
                                                <img
                                                  style={{ width: '130px', height: '80px' }}
                                                  alt="暂无"
                                                  src={`/systemfile${item?.ems_panorama_cover?.ems_sysfile_path}`}
                                                />
                                              }
                                            >
                                              {item.ems_panorama_default == 1 && (
                                                <Tooltip title="首页进入">
                                                  <IconFont
                                                    type="icon-enter"
                                                    className={styles.enterIcon}
                                                  />
                                                </Tooltip>
                                              )}

                                              <Meta
                                                title={
                                                  <Text
                                                    style={{ color: '#fff', fontSize: '14px' }}
                                                    color="#fff"
                                                    strong
                                                    ellipsis={{ tooltip: item.ems_panorama_name }}
                                                  >
                                                    {item.ems_panorama_name}
                                                  </Text>
                                                }
                                              />
                                            </Card>
                                          </Dropdown>
                                        </div>
                                      )}
                                    </Draggable>
                                  </List.Item>
                                );
                              }
                              return <List.Item></List.Item>;
                            }}
                          />
                        </Skeleton>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            ),
          };
        })}
      />
      <div className={styles.btnAddBox}>
        <Button
          className={styles.btnAdd}
          onClick={() => {
            uploadRef?.current?.show();
          }}
          type="ghost"
        >
          <PlusOutlined />
          <br />
          添加全景
        </Button>
      </div>
      <UploadPanorama
        ref={uploadRef}
        levelId={activeKey}
        instanceId={instanceId}
        refreshList={() => {
          request();
        }}
      />
    </div>
  );
};
export default PanoramaList;
