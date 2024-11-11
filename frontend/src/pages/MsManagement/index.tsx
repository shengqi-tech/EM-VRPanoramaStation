import React, { useEffect, useRef, useState } from 'react';
import { useModel, useRequest } from 'umi';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import {
  Col,
  Form,
  DatePicker,
  Row,
  Select,
  Input,
  Alert,
  Segmented,
  Button,
  Tooltip,
  Tag,
  Avatar,
  Space,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { CheckCard, ProCard, ProFormDependency } from '@ant-design/pro-components';
import {
  createFromIconfontCN,
  AppstoreOutlined,
  BarsOutlined,
  GlobalOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import styles from './style.less';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import StationCard from './components/StationCard';
import StationList from './components/StationList';
import StationMap from './components/StationMap';
import { findInstanceByMap } from '@/services/swagger/instanceController';
import { findSituationByMap } from '@/services/swagger/situationController';
const { Option } = Select;
const { RangePicker } = DatePicker;
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});

const TableList: React.FC = (props) => {
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  const { setStationListData } = useModel('Panorama.data', (ret) => ({
    setStationListData: ret.setStationListData,
  }));
  const formRef = useRef<any>();

  const [times, setTimes] = useState<any>([]);
  const [viewType, setViewType] = useState<string | number>('card'); //视图类型切换 卡片/列表
  const [showSearchFilter, setShowSearchFiltere] = useState(false);
  const [elements, setElements] = useState<any>([]);
  const [activities, setActivities] = useState<any>({});
  const [keyWord, setKeyWord] = useState<any>('');

  const { data: situationsData } = useRequest(
    () => {
      return findSituationByMap({});
    },
    {
      formatResult: (res: any) => {
        return res?.result;
      },
    },
  );

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    setKeyWord(value);
  };

  const changeViewType = (value: string | number) => {
    setViewType(value);
  };

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const Content = (
    <div>
      <Alert
        message="业务场景：使用VR全景技术实现生态环境监测数据上图的一种编辑、发布、展示系统，应用于地表水自动监测、污染源在线监测等监测场景,实现生态环境远程运维和非现场执法等业务功能，从而提供便捷、简单、直观和低廉的生态环境监测上图的数字化方案。"
        type="info"
        showIcon
      />
      <div className={styles.pageContentInput}>
        <Space>
          <Input.Search
            placeholder="请输入监测站名称或编号搜索"
            enterButton="搜索"
            size="large"
            onSearch={handleFormSubmit}
            style={{ maxWidth: 722, minWidth: isMobile ? '100%' : '600px', width: '100%' }}
          />
          <a
            style={{ display: 'flex' }}
            onClick={() => {
              setShowSearchFiltere(!showSearchFilter);
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>高级筛选</span>
            {showSearchFilter ? <UpOutlined /> : <DownOutlined />}
          </a>
        </Space>
      </div>
    </div>
  );

  const selectActivities = (values, elementId) => {
    if (values.length > 0) {
      if (!elements.includes(elementId)) {
        elements.push(elementId);
        setElements([...elements]);
        formRef.current?.setFieldValue('elementactivities', elements);
      }
    } else {
      const elementsArr = elements.filter((element) => {
        return element !== elementId;
      });
      setElements([...elementsArr]);
      formRef.current?.setFieldValue('elementactivities', elementsArr);
    }

    activities[elementId] = values;

    setActivities({ ...activities });
  };

  useEffect(() => {
    const activitiesArr = [].concat.apply([], Object.values(activities));
    let params: any = { ems_instance_activities: activitiesArr, nameOrNo: keyWord };
    if (times?.length > 0) {
      const starttime = times[0] || '';
      const endtime = times[1] || '';
      params.ems_instance_starttime = starttime;
      params.ems_instance_endtime = endtime;
    }
    findInstanceByMap(params).then((res) => {
      setStationListData(res.result?.list || []);
    });
  }, [activities, keyWord, times]);

  return (
    <PageContainer
      header={{
        avatar: {
          icon: <IconFont type="icon-zhanfangjiance" />,
          size: 36,
          style: { background: '#1890ff' },
        },
        subTitle: '为监测站提供720全景设计',
      }}
      content={Content}
    >
      {showSearchFilter ? (
        <>
          <ProCard bordered={false}>
            {isMobile ? (
              <Form
                colon
                ref={formRef}
                onValuesChange={(_, values) => {
                  const times =
                    values.times?.map((item) => {
                      return moment(item).format('YYYY/MM/DD');
                    }) || [];
                  setTimes(times);
                }}
                layout="horizontal"
              >
                <Form.Item name="situation" label="监测状况">
                  <CheckCard.Group
                    onChange={(value) => {
                      console.log('value', value);
                    }}
                    // defaultValue="A"
                    size="small"
                    style={{ width: '100%' }}
                  >
                    {situationsData?.map((item) => {
                      return (
                        <CheckCard
                          avatar={
                            <IconFont type={item.ems_situation_icon} className={styles.icon2} />
                          }
                          title={item.ems_situation_name}
                          description={item.ems_situation_des}
                          style={{ width: '100%' }}
                          value={item.ems_situation_id}
                          key={item.ems_situation_id}
                        />
                      );
                    })}
                  </CheckCard.Group>
                </Form.Item>
                <ProFormDependency name={['situation']}>
                  {({ situation }) => {
                    return situation == 1 ? (
                      <Form.Item name="elementactivities" label="要素活动">
                        <CheckCard.Group
                          multiple
                          onChange={(values) => {
                            setElements(values);
                          }}
                          value={elements}
                          size="small"
                          style={{ width: '100%' }}
                        >
                          {situationsData
                            ?.find((item) => {
                              return item.ems_situation_id == situation;
                            })
                            ?.ems_situation_elementVos?.map((elementvo) => {
                              return (
                                <CheckCard
                                  key={elementvo.ems_element_id}
                                  avatar={
                                    <IconFont
                                      type={elementvo.ems_element_icon}
                                      className={styles.icon}
                                    />
                                  }
                                  title={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <span style={{ marginRight: 8, marginLeft: 8 }}>
                                        {elementvo.ems_element_name}
                                      </span>
                                      <Tag color="blue">{elementvo.ems_element_des}</Tag>
                                    </div>
                                  }
                                  description={
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <TagSelect
                                        expandable
                                        className={styles.tagOption}
                                        onChange={(values) =>
                                          selectActivities(values, elementvo.ems_element_id)
                                        }
                                      >
                                        {elementvo.ems_element_activities?.map((activity) => {
                                          return (
                                            <TagSelect.Option
                                              value={activity.ems_activity_id}
                                              key={activity.ems_activity_id}
                                            >
                                              {activity.ems_activity_name}
                                            </TagSelect.Option>
                                          );
                                        })}
                                      </TagSelect>
                                    </div>
                                  }
                                  style={{ width: '100%' }}
                                  value={elementvo.ems_element_id}
                                />
                              );
                            })}
                        </CheckCard.Group>
                      </Form.Item>
                    ) : situation == 2 ? (
                      <Form.Item name="sectors" label="行业活动">
                        <CheckCard.Group multiple size="small">
                          {situationsData
                            ?.find((item) => {
                              return item.ems_situation_id == situation;
                            })
                            ?.ems_situation_sectorVos?.map((sectorvo) => {
                              return (
                                <CheckCard
                                  avatar={
                                    <IconFont
                                      type={sectorvo.ems_sector_icon}
                                      className={styles.icon}
                                    />
                                  }
                                  title={
                                    <Tooltip title={sectorvo.ems_sector_des}>
                                      <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ marginRight: 8, marginLeft: 8 }}>
                                          {sectorvo.ems_sector_name}
                                        </span>
                                        <Tag color="blue">{sectorvo.ems_sector_des}</Tag>
                                      </div>
                                    </Tooltip>
                                  }
                                  description={
                                    <>
                                      <TagSelect expandable className={styles.tagOption}>
                                        {sectorvo.ems_sector_sectors?.map((sector) => {
                                          return (
                                            <TagSelect.Option value={sector.ems_sector_id}>
                                              {sector.ems_sector_name}
                                            </TagSelect.Option>
                                          );
                                        })}
                                      </TagSelect>
                                      <TagSelect expandable className={styles.tagOption}>
                                        {sectorvo.ems_sector_activities?.map((activity) => {
                                          return (
                                            <TagSelect.Option value={activity.ems_activity_id}>
                                              {activity.ems_activity_name}
                                            </TagSelect.Option>
                                          );
                                        })}
                                      </TagSelect>
                                    </>
                                  }
                                  style={{ width: '100%' }}
                                  value={sectorvo.ems_sector_id}
                                />
                              );
                            })}
                        </CheckCard.Group>
                      </Form.Item>
                    ) : null;
                  }}
                </ProFormDependency>
                <Form.Item name="station" label="子站类型">
                  <TagSelect expandable>
                    <TagSelect.Option value="station1">常规固定站</TagSelect.Option>
                    <TagSelect.Option value="station2">超级站</TagSelect.Option>
                    <TagSelect.Option value="station3">简易式站房/小型式站房</TagSelect.Option>
                    <TagSelect.Option value="station4">水上固定站/水上浮标(船)站</TagSelect.Option>
                  </TagSelect>
                </Form.Item>
                <Form.Item name="testitem" label="监测因子">
                  <TagSelect expandable>
                    <TagSelect.Option value="testitem1">PM₂.₅</TagSelect.Option>
                    <TagSelect.Option value="testitem2">PM₁₀</TagSelect.Option>
                    <TagSelect.Option value="testitem3">CO</TagSelect.Option>
                    <TagSelect.Option value="testitem4">NOₓ</TagSelect.Option>
                    <TagSelect.Option value="testitem5">SO₂</TagSelect.Option>
                    <TagSelect.Option value="testitem6">O₃</TagSelect.Option>
                  </TagSelect>
                </Form.Item>
                <Row gutter={16}>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <Form.Item {...formItemLayout} name="rate" label="地区">
                      <Space>
                        <Select placeholder="请选择" defaultValue="区划">
                          <Option value="good">区划</Option>
                          <Option value="normal">流域</Option>
                        </Select>
                        <Select
                          placeholder="请选择"
                          defaultValue="湖北"
                          mode="multiple"
                          style={{ minWidth: 200 }}
                        >
                          <Option value="good">湖北</Option>
                          <Option value="normal">浙江</Option>
                        </Select>
                      </Space>
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <Form.Item {...formItemLayout} name="times" label="建站时间">
                      <RangePicker status="warning" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            ) : (
              <Form
                ref={formRef}
                onValuesChange={(_, values) => {
                  const times =
                    values.times?.map((item) => {
                      return moment(item).format('YYYY/MM/DD');
                    }) || [];
                  setTimes(times);
                }}
                layout={'inline'}
              >
                <StandardFormRow title="监测状况" block style={{ paddingBottom: 4 }}>
                  <Form.Item name="situation">
                    <CheckCard.Group
                      onChange={(value) => {
                        console.log('value', value);
                      }}
                      // defaultValue="A"
                      size="small"
                      style={{ width: '100%' }}
                    >
                      {situationsData?.map((item) => {
                        return (
                          <CheckCard
                            avatar={
                              <IconFont type={item.ems_situation_icon} className={styles.icon2} />
                            }
                            title={item.ems_situation_name}
                            description={item.ems_situation_des}
                            style={{ width: 340 }}
                            value={item.ems_situation_id}
                            key={item.ems_situation_id}
                          />
                        );
                      })}
                    </CheckCard.Group>
                  </Form.Item>
                </StandardFormRow>
                <ProFormDependency name={['situation']}>
                  {({ situation }) => {
                    return situation == 1 ? (
                      <StandardFormRow title="要素活动" block style={{ paddingBottom: 4 }}>
                        <Form.Item name="elementactivities">
                          <CheckCard.Group
                            multiple
                            onChange={(values) => {
                              setElements(values);
                            }}
                            value={elements}
                            size="small"
                            style={{ width: '100%' }}
                          >
                            {situationsData
                              ?.find((item) => {
                                return item.ems_situation_id == situation;
                              })
                              ?.ems_situation_elementVos?.map((elementvo) => {
                                return (
                                  <CheckCard
                                    key={elementvo.ems_element_id}
                                    avatar={
                                      <IconFont
                                        type={elementvo.ems_element_icon}
                                        className={styles.icon}
                                      />
                                    }
                                    title={
                                      <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ marginRight: 8, marginLeft: 8 }}>
                                          {elementvo.ems_element_name}
                                        </span>
                                        <Tag color="blue">{elementvo.ems_element_des}</Tag>
                                      </div>
                                    }
                                    description={
                                      <div
                                        onClick={(e) => {
                                          e.stopPropagation();
                                        }}
                                      >
                                        <TagSelect
                                          expandable
                                          className={styles.tagOption}
                                          onChange={(values) =>
                                            selectActivities(values, elementvo.ems_element_id)
                                          }
                                        >
                                          {elementvo.ems_element_activities?.map((activity) => {
                                            return (
                                              <TagSelect.Option
                                                value={activity.ems_activity_id}
                                                key={activity.ems_activity_id}
                                              >
                                                {activity.ems_activity_name}
                                              </TagSelect.Option>
                                            );
                                          })}
                                        </TagSelect>
                                      </div>
                                    }
                                    style={{ width: 340 }}
                                    value={elementvo.ems_element_id}
                                  />
                                );
                              })}
                          </CheckCard.Group>
                        </Form.Item>
                      </StandardFormRow>
                    ) : situation == 2 ? (
                      <StandardFormRow title="行业活动" block style={{ paddingBottom: 4 }}>
                        <Form.Item name="sectors">
                          <CheckCard.Group multiple size="small">
                            {situationsData
                              ?.find((item) => {
                                return item.ems_situation_id == situation;
                              })
                              ?.ems_situation_sectorVos?.map((sectorvo) => {
                                return (
                                  <CheckCard
                                    avatar={
                                      <IconFont
                                        type={sectorvo.ems_sector_icon}
                                        className={styles.icon}
                                      />
                                    }
                                    title={
                                      <Tooltip title={sectorvo.ems_sector_des}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <span style={{ marginRight: 8, marginLeft: 8 }}>
                                            {sectorvo.ems_sector_name}
                                          </span>
                                          <Tag color="blue">{sectorvo.ems_sector_des}</Tag>
                                        </div>
                                      </Tooltip>
                                    }
                                    description={
                                      <>
                                        <TagSelect expandable className={styles.tagOption}>
                                          {sectorvo.ems_sector_sectors?.map((sector) => {
                                            return (
                                              <TagSelect.Option value={sector.ems_sector_id}>
                                                {sector.ems_sector_name}
                                              </TagSelect.Option>
                                            );
                                          })}
                                        </TagSelect>
                                        <TagSelect expandable className={styles.tagOption}>
                                          {sectorvo.ems_sector_activities?.map((activity) => {
                                            return (
                                              <TagSelect.Option value={activity.ems_activity_id}>
                                                {activity.ems_activity_name}
                                              </TagSelect.Option>
                                            );
                                          })}
                                        </TagSelect>
                                      </>
                                    }
                                    style={{ width: 340 }}
                                    value={sectorvo.ems_sector_id}
                                  />
                                );
                              })}
                          </CheckCard.Group>
                        </Form.Item>
                      </StandardFormRow>
                    ) : null;
                  }}
                </ProFormDependency>
                <StandardFormRow title="子站类型" block style={{ paddingBottom: 4 }}>
                  <Form.Item name="station">
                    <TagSelect expandable>
                      <TagSelect.Option value="station1">常规固定站</TagSelect.Option>
                      <TagSelect.Option value="station2">超级站</TagSelect.Option>
                      <TagSelect.Option value="station3">简易式站房/小型式站房</TagSelect.Option>
                      <TagSelect.Option value="station4">
                        水上固定站/水上浮标(船)站
                      </TagSelect.Option>
                    </TagSelect>
                  </Form.Item>
                </StandardFormRow>
                <StandardFormRow title="监测因子" block style={{ paddingBottom: 4 }}>
                  <Form.Item name="testitem">
                    <TagSelect expandable>
                      <TagSelect.Option value="testitem1">PM₂.₅</TagSelect.Option>
                      <TagSelect.Option value="testitem2">PM₁₀</TagSelect.Option>
                      <TagSelect.Option value="testitem3">CO</TagSelect.Option>
                      <TagSelect.Option value="testitem4">NOₓ</TagSelect.Option>
                      <TagSelect.Option value="testitem5">SO₂</TagSelect.Option>
                      <TagSelect.Option value="testitem6">O₃</TagSelect.Option>
                    </TagSelect>
                  </Form.Item>
                </StandardFormRow>

                <StandardFormRow title="其它选项" grid last>
                  <Row gutter={16}>
                    <Col lg={8} md={10} sm={10} xs={24}>
                      <Form.Item {...formItemLayout} name="rate" label="地区">
                        <Space>
                          <Select placeholder="请选择" defaultValue="区划">
                            <Option value="good">区划</Option>
                            <Option value="normal">流域</Option>
                          </Select>
                          <Select
                            placeholder="请选择"
                            defaultValue="湖北"
                            mode="multiple"
                            style={{ minWidth: 200 }}
                          >
                            <Option value="good">湖北</Option>
                            <Option value="normal">浙江</Option>
                          </Select>
                        </Space>
                      </Form.Item>
                    </Col>
                    <Col lg={8} md={10} sm={10} xs={24}>
                      <Form.Item {...formItemLayout} name="times" label="建站时间">
                        <RangePicker status="warning" />
                      </Form.Item>
                    </Col>
                  </Row>
                </StandardFormRow>
              </Form>
            )}
          </ProCard>
          <br />
        </>
      ) : (
        ''
      )}
      <ProCard bordered={false}>
        <div style={{ marginBottom: '10px' }}>
          <Segmented
            onChange={changeViewType}
            value={viewType}
            options={[
              {
                label: '图文',
                value: 'card',
                icon: <AppstoreOutlined />,
              },
              {
                label: '列表',
                value: 'list',
                icon: <BarsOutlined />,
              },
            ]}
          />
        </div>
        {viewType == 'card' && <StationCard />}
        {viewType == 'list' && <StationList />}
      </ProCard>
    </PageContainer>
  );
};
export default TableList;
