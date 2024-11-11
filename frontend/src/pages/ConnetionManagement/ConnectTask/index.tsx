import {
  PlusOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PauseCircleOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Image,
  Typography,
  Tag,
  Skeleton,
  Avatar,
  Tooltip,
  Badge,
  Select,
  Dropdown,
  Menu,
  Space,
  Table,
  Input,
  message,
  Popconfirm,
  Divider,
  Drawer,
} from 'antd';
import type { MenuProps } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { useState, useRef } from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { useRequest, history, useModel } from 'umi';
import { queryFakeList, getDevices } from './service';
// import type { DeviceModel, } from './data.d';
import styles from './style.less';
import moment from 'moment';
import AvatarList from '../../../components/Commoms/AvatarList';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { StatisticCard } from '@ant-design/pro-card';

// import IntroduceRow from './components/IntroduceRow'

import {
  findJobInfoByMap,
  remove as deleteJobInfo,
  start as startJobInfo,
  stop as stopJobInfo,
  triggerJob,
} from '../../../services/swagger/jobInfoController';

import { chartInfo } from '../../../services/swagger/reportController';

import JobAddOrEditModel from './addoredit';
import DispatchLogDrawer from './dispatchlog';

const { Paragraph } = Typography;
const getKey = (id: string, index: number) => `${id}-${index}`;

let triggerStatus = null;
let jobDesc = null;
const JobList: React.FC = (props) => {
  const [jobStatusActiveKey, setJobStatusActiveKey] = useState<React.Key | undefined>(-1);

  const actionRef = useRef<ActionType>();

  const JobRef = useRef<any>();

  const dispatchlogRef = useRef<any>();

  const [currentJob, setCurrentJob] = useState<API.XxlJobGroupVo>();

  const [counter, setCounter] = useState();

  const jobsQuery = async (
    // 第一个参数 params 查询表单和 params 参数的结合,表单搜索项会从 params 传入，
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: API.XxlJobInfoVo & {
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
        ...params,
        pageNum: params.current,
        // pageSize: 10,
        ...sort,
        ...filter,
        triggerStatus: triggerStatus,
        jobDesc: jobDesc,
      };

      const response = await findJobInfoByMap(queryParams);
      //hide();
      //message.success(response.message);

      const solutionList = {
        data: response?.result?.list,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: response.code === 200 ? true : false,
        /** 列表的内容总数 */
        total: response?.result?.total,
      };
      setCounter({ ...response?.result?.counter });
      return solutionList;
    } catch (error) {
      //hide();
      // message.error('查询失败请重试！');
      return false;
    }
  };

  // //获取统计数量
  // const { data: dispatchReport, loading: dispatchReportLoading } = useRequest(
  //   () => {
  //     return chartInfo({});
  //   },
  //   {
  //     // manual: true,
  //     formatResult: (response: any) => {
  //       return response.result;
  //     },
  //   },
  // );

  //查看
  const viewDetails = (e, item: DeviceModel.Device) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    setCurrentDevice(item);
    history.push(`${url}/${item.eme_device_id}`);
  };

  const optionItems: MenuProps['items'] = [
    {
      label: '执行一次',
      key: 'once',
    },
    {
      type: 'divider',
    },
    {
      label: '调度日志',
      key: 'dispatch',
    },
  ];

  const onOptionItemClick = async (e, record) => {
    let result;
    if (e.key == 'once') {
      result = await triggerJob({ id: record.id });
      if (result.code == 200) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    } else if (e.key == 'dispatchlog') {
      dispatchlogRef?.current.show();
      setCurrentJob(record);
    }
  };

  const columns: ProColumns<API.XxlJobInfoVo>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 50,
    },

    {
      title: '连接名',
      dataIndex: 'jobDesc',
      ellipsis: true,
      valueType: 'text',
      width: 120,
    },
    {
      title: '客户源',
      dataIndex: 'jobGroupVo',
      // fixed: 'right',
      width: '20%',
      render: (_, record) => (
        <Tooltip title={''}>
          <Avatar
            src={
              <Image
                src={`/systemfile${record?.jobGroupVo?.customerVo?.ems_customer_logofile?.ems_sysfile_path}`}
              />
            }
          />
          {record?.jobGroupVo?.customerVo?.ems_customer_name}--
          <Tag color={'blue'}>{record?.jobGroupVo?.customerVo?.ems_customer_region}</Tag>
        </Tooltip>
      ),
    },

    {
      title: '创建时间',
      dataIndex: 'addTime',
      width: 150,
      valueType: 'dateTime',
      // sorter: (a, b) => a.eme_section_settingtime - b.eme_section_settingtime,
    },
    {
      title: '调度配置',
      width: 150,
      dataIndex: 'scheduleConf',
      ellipsis: true,
      // valueType: (item) => ({
      //   type: 'progress',
      //   status: ProcessMap[item.status],
      // }),
      render: (_, record) => {
        return record.scheduleConf == '' ? (
          <Tooltip title="没有配置调度配置，只能使用手动方式执行一次">
            <Badge dot>
              <NotificationOutlined style={{ fontSize: 16 }} />
            </Badge>
          </Tooltip>
        ) : (
          record.scheduleConf
        );
      },
    },

    {
      title: '状态',
      width: 140,
      dataIndex: 'triggerStatus',
      valueType: 'select',

      valueEnum: {
        0: {
          text: '未启动',
          status: 'Error',
        },
        1: {
          text: '运行中',
          status: 'Success',
        },
      },
      filters: [
        {
          text: '停止',
          value: 0,
        },
        {
          text: '运行',
          value: 1,
        },
        {
          text: '所有',
          value: 2,
        },
      ],
      // render: (triggerStatus: any) =>
      // triggerStatus == 0 || triggerStatus == 1 ? (
      //     <Switch
      //       checkedChildren="在库"
      //       unCheckedChildren="出库"
      //       defaultChecked={triggerStatus == 0}
      //       size="small"
      //     />
      //   ) : (
      //     <Switch
      //       checkedChildren="在线"
      //       unCheckedChildren="离线"
      //       defaultChecked={triggerStatus == 2}
      //       size="small"
      //     />
      //   ),
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
    },

    // {
    //   title: '所在地',

    //   dataIndex: 'progress',
    //   valueType: 'textarea',
    //   copyable: true,
    //   ellipsis: true,
    //   // valueType: (item) => ({
    //   //   type: 'progress',
    //   //   status: ProcessMap[item.status],
    //   // }),
    // },
    {
      title: '上次同步时间',
      dataIndex: 'triggerLastTime',
      width: 150,
      valueType: 'dateTime',
      // sorter: (a, b) => a.eme_section_settingtime - b.eme_section_settingtime,
    },
    {
      title: '下次执行时间',
      dataIndex: 'triggerNextTime',
      width: 150,
      valueType: 'dateTime',
      // sorter: (a, b) => a.eme_section_settingtime - b.eme_section_settingtime,
    },

    {
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        record.scheduleType == 'NONE' ? (
          ''
        ) : record.triggerStatus == 0 ? (
          <Tooltip key="start" title="启动">
            <Popconfirm
              title="是否启动该项！"
              okText="是"
              cancelText="否"
              onConfirm={(e) => {
                // e.stopPropagation();
                startJobInfo({ id: record.id });
                actionRef?.current?.reload();
              }}
            >
              <PlayCircleOutlined style={{ color: 'orange' }} />
            </Popconfirm>
            {/* <a
              key="link"
              onClick={(e) => {
                e.stopPropagation();
                startJobInfo({ id: record.id });
                actionRef?.current?.reload();
              }}
            >
              <PlayCircleOutlined style={{ color: 'orange' }} />
            </a> */}
          </Tooltip>
        ) : (
          <Tooltip key="stop" title="停止">
            {/* <a
              key="link"
              onClick={(e) => {
                e.stopPropagation();
                stopJobInfo({ id: record.id });
                actionRef?.current?.reload();
              }}
            >
              <PauseCircleOutlined style={{ color: 'gray' }} />
            </a> */}
            <Popconfirm
              title="是否停止该项！"
              okText="是"
              cancelText="否"
              onConfirm={(e) => {
                // e.stopPropagation();
                stopJobInfo({ id: record.id });
                actionRef?.current?.reload();
              }}
            >
              <PauseCircleOutlined style={{ color: 'gray' }} />
            </Popconfirm>
          </Tooltip>
        ),
        <Tooltip key="edit" title="编辑">
          <a
            key="link"
            onClick={(e) => {
              e.stopPropagation();
              JobRef?.current?.show();
              setCurrentJob(record);
            }}
          >
            <EditOutlined />
          </a>
        </Tooltip>,
        <Tooltip key="delete" title="删除">
          <Popconfirm
            title="是否删除该项！"
            okText="是"
            cancelText="否"
            onConfirm={() => {
              deleteJobInfo({ id: record.id }).then((res) => {
                if (res.code == 200) {
                  message.success(res.message);
                } else {
                  message.error(res.message);
                }
                // refreshPanoramaList();
                actionRef?.current?.reload();
              });
            }}
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>
        </Tooltip>,

        // menu={{ items: optionItems}} onClick={(e)=>{onOptionItemClick(e,record)}}
        <Dropdown
          overlay={
            <Menu onClick={(e) => onOptionItemClick(e, record)}>
              <Menu.Item key="once">执行一次</Menu.Item>
              <Divider style={{ margin: '6px' }}></Divider>
              <Menu.Item key="dispatchlog">调度日志</Menu.Item>
            </Menu>
          }
        >
          <EllipsisOutlined />
        </Dropdown>,
      ],
    },
  ];

  const [selectedRowsState, setSelectedRows] = useState<InstanceModel.Instance[]>([]);

  const { data, loading } = useRequest(
    () => {
      // return getProducts({
      //   pageSize: 8,
      // });
    },
    {
      formatResult: (response: any) => {
        return response.result;
      },
    },
  );

  const productlist = data?.list || [];

  const userOpt = (item: DeviceModel.Device) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    setCurrentScene(item);
    history.push(`${url}/instancemanage/${item.eme_device_id}`);
  };

  // const nullData: Partial<DeviceModel.Device> = {};

  //添加新任务
  const onSubmit = async (value: boolean) => {
    if (value) actionRef?.current?.reload();
  };

  const renderBadge = (count: number, active = false) => {
    return (
      <Badge
        showZero
        count={count}
        style={{
          marginBlockStart: -2,
          marginInlineStart: 4,
          color: active ? '#1890FF' : '#999',
          backgroundColor: active ? '#E6F7FF' : '#eee',
        }}
      />
    );
  };
  return (
    <Card>
      <ProTable<API.XxlJobInfoVo>
        columns={columns}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
            {/* <span>{`容器数量: ${selectedRows.reduce(
                (pre, item) => pre + item.containers,
                0,
              )} 个`}</span>
              <span>{`调用量: ${selectedRows.reduce(
                (pre, item) => pre + item.callNumber,
                0,
              )} 次`}</span> */}
          </Space>
        )}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a>批量删除</a>
            </Space>
          );
        }}
        actionRef={actionRef}
        request={jobsQuery}
        // dataSource={tableListDataSource}
        scroll={{ x: 1300 }}
        size="small"
        options={{ fullScreen: false, reload: true, setting: true, density: false }}
        search={false}
        rowKey="id"
        headerTitle="连接列表"
        toolbar={{
          menu: {
            items: [
              {
                key: -1,
                label: (
                  <span>
                    全部{renderBadge(counter?.running + counter?.stop, jobStatusActiveKey === -1)}
                  </span>
                ),
              },
              {
                key: 1,
                label: <span>运行中{renderBadge(counter?.running, jobStatusActiveKey === 1)}</span>,
              },
              {
                key: 0,
                label: <span>未启动{renderBadge(counter?.stop, jobStatusActiveKey === 0)}</span>,
              },
            ],
            onChange(key) {
              if (key == -1) triggerStatus = null;
              else triggerStatus = key;
              setJobStatusActiveKey(key);
              actionRef?.current?.reload();
            },
          },
          actions: [
            <Input.Search
              placeholder="输入连接名"
              enterButton
              size="middle"
              onChange={(e) => {
                if (e == null || e.target.value == '') jobDesc = null;
                else jobDesc = e.target.value;
                actionRef?.current?.reload();
              }}
            />,

            <Button
              key="addDevice"
              onClick={() => {
                // setCurrentProduct({});
                // setProductModalVisible(true)
                // setIsClick(true);
                setCurrentJob(null);
                JobRef?.current?.show();
              }}
            >
              <PlusOutlined />
              创建连接
            </Button>,
          ],
        }}
        pagination={{
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          // <Input.Search key="show" enterButton >查看日志</Input.Search>,
        ]}
      />
      <JobAddOrEditModel ref={JobRef} job={currentJob} onSubmit={onSubmit} />
      <DispatchLogDrawer ref={dispatchlogRef} job={currentJob} />
    </Card>
  );
};

export default JobList;
