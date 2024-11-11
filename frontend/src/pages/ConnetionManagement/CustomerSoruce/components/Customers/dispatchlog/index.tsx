import React, { useRef, useState, useEffect, useImperativeHandle } from 'react';
import { useRequest, useModel, useIntl, FormattedMessage } from 'umi';

import { FooterToolbar } from '@ant-design/pro-layout';
import moment from 'moment';
import {
  Card,
  Input,
  Button,
  Descriptions,
  Divider,
  Alert,
  Statistic,
  Table,
  Tag,
  Form,
  Row,
  Col,
  message,
  Typography,
  Avatar,
  Image,
  List,
  Space,
  Tooltip,
  Badge,
  notification,
} from 'antd';

import {
  ProTable,
  DrawerForm,
  LightFilter,
  ProFormRadio,
  ProFormDateRangePicker,
  CheckCard,
} from '@ant-design/pro-components';
import type { ProFormInstance, ProColumns } from '@ant-design/pro-components';

import styles from './style.less';

import { findLogByMap, logDetailCat } from '../../../../../../services/swagger/jobLogController';

import { values } from 'lodash';
import {
  FilterOutlined,
  BugOutlined,
  InfoCircleOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3192392_pors2ew3ri.js',
});

const { Paragraph, Text, Title } = Typography;

const Context = React.createContext({ excutorlog: '没有日志' });

export type ActuatorRegisterDrawerProps = {
  customer?: API.CustomerVo;
};

const DispatchLogDrawer = React.forwardRef((props: ActuatorRegisterDrawerProps, ref: any) => {
  // 绑定一个 ProFormInstance 实例
  const formRef = useRef<ProFormInstance<API.XxlJobGroup>>();
  const actionRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const { customer } = props;
  const onVisibleChange = async (visible: boolean) => {
    setVisible(visible);
  };
  // const [api, contextHolder] = notification.useNotification();

  // const [api, contextHolder] = notification.useNotification();

  const goExcutorLog = async (joblog: API.XxlJobLogVo) => {
    // window.open(`/connetionManagement/${joblog.id}`, '_blank');
    const result = await logDetailCat({
      id: joblog?.id,
      fromLineNum: 1,
    });
    notification.open({
      message: `执行日志`,
      description: <div dangerouslySetInnerHTML={{ __html: result?.content?.logContent }} />,
      duration: 0,
    });
  };

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      readonly: true,
    },

    {
      title: '调度信息',
      dataIndex: 'triggerTime',

      // formItemProps: (form, { rowIndex }) => {
      //   return {
      //     rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
      //   };
      // },
      // // 第一行不允许编辑
      // editable: (text, record, index) => {
      //   return index !== 0;
      // },
      render: (_, record) => (
        <>
          <Space>
            {record?.triggerCode == 200 ? (
              <Badge status="success" text="hugangyong"></Badge>
            ) : (
              <Badge status="error" text="hugangyong"></Badge>
            )}

            <Tooltip
              title={<div dangerouslySetInnerHTML={{ __html: record.triggerMsg }} />}
              // color="#108ee9"
              placement="right"
            >
              <Button type="link" icon={<InfoCircleOutlined />}>
                调度详情
              </Button>
            </Tooltip>
          </Space>

          <div>{moment.utc(record?.triggerTime).local().format('YYYY-MM-DD HH:mm:ss')}</div>
        </>
      ),
      // width: '30%',
    },

    {
      title: '执行信息',
      dataIndex: 'jobGroup',
      tooltip: '执行器以及执行的任务的过程信息',
      // formItemProps: (form, { rowIndex }) => {
      //   return {
      //     rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
      //   };
      // },
      // // 第一行不允许编辑
      // editable: (text, record, index) => {
      //   return index !== 0;
      // },
      render: (_, record) => (
        <>
          <Space>
            {record?.handleCode == 200 ? (
              <Avatar style={{ backgroundColor: 'green' }} size={12}>
                Y
              </Avatar>
            ) : (
              <Avatar style={{ backgroundColor: 'red' }} size={12}>
                N
              </Avatar>
            )}
            <span>{record?.jobId} --</span>
            <span>{record?.executorHandler}</span>
            <Badge size="small" count={1000} overflowCount={record?.executorFailRetryCount}>
              重试次数
            </Badge>
          </Space>
          <div>
            <Space>
              {record?.handleTime
                ? moment.utc(record?.handleTime).local().format('YYYY-MM-DD HH:mm:ss')
                : '20**-**-**  **:**:**'}

              {/* <Tooltip
              title={<div dangerouslySetInnerHTML={{ __html: excutorlog }} />}
              color="#108ee9"
            > */}

              <Button type="dashed" onClick={() => goExcutorLog(record)}>
                <BugOutlined /> 执行日志
              </Button>
            </Space>
            {/* </Tooltip> */}
          </div>
        </>
      ),
      // width: '15%',
    },
    {
      title: '告警',
      dataIndex: 'alarmStatus',
      valueEnum: {
        0: {
          text: '默认',
          status: 'Default',
        },
        1: {
          text: '无需告警',
          status: 'Success',
        },
        2: {
          text: '告警成功',
          status: 'Success',
        },
        3: {
          text: '告警失败',
          status: 'Error',
        },
      },

      // formItemProps: (form, { rowIndex }) => {
      //   return {
      //     rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
      //   };
      // },
      // // 第一行不允许编辑
      // editable: (text, record, index) => {
      //   return index !== 0;
      // },

      // width: '30%',
    },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   width: '15%',
    //   render: (text, record, _, action) => [
    //     <a
    //       key="editable"
    //       onClick={() => {
    //         action?.startEditable?.(record.id);
    //       }}
    //     >
    //       编辑
    //     </a>,
    //     <a
    //       key="delete"
    //       onClick={() => {
    //         setJobHandlerDataSource(jobHandlerDataSource.filter((item) => item.id !== record.id));
    //       }}
    //     >
    //       删除
    //     </a>,
    //   ],
    // },
  ];

  // const structuresSelectOptions = async (productmode: string) => {
  //   const selectOptions: any = [];

  //   structures?.map((structure: EcoEnvironmentModel.Structure) => {
  //     selectOptions.push({
  //       value: structure.eme_structure_id + '-' + structure.eme_structure_istest,
  //       // value: structure.eme_structure_id,
  //       label: structure.eme_structure_name,
  //     });
  //   });
  //   return selectOptions;
  // };
  const dispatchLogsQuery = async (
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
        ems_customer_name: customer?.ems_customer_name,
        ...sort,
        ...filter,
      };

      const response = await findLogByMap(queryParams);
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

      return solutionList;
    } catch (error) {
      //hide();
      // message.error('查询失败请重试！');
      return false;
    }
  };

  useEffect(() => {
    actionRef?.current?.reload();
  }, [customer]);

  useImperativeHandle(ref, () => ({
    async show(result: any) {
      setVisible(true);
    },
  }));

  return (
    <div>
      <DrawerForm<API.XxlJobGroupVo>
        formKey="modal-form-001"
        title={`${customer?.ems_customer_name}调度日志`}
        // getContainer={false}
        // closable={false}
        className={styles.dispatchLog}
        // initialValues={actuator}
        // readonly
        visible={visible}
        onVisibleChange={(visible) => onVisibleChange(visible)}
        // style={{ position: 'absolute' }}
        width="720px"
        // submitter={{
        //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,//固定页脚
        // }}
        style={{ padding: '0px' }}
        // 通过formRef进行绑定
        formRef={formRef}
        submitter={false}
      >
        <ProTable<API.XxlJobInfoVo>
          columns={columns}
          // rowSelection={{
          //   // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          //   // 注释该行则默认不显示下拉选项
          //   selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          //   defaultSelectedRowKeys: [1],
          // }}
          // tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          //   <Space size={24}>
          //     <span>
          //       已选 {selectedRowKeys.length} 项
          //       <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
          //         取消选择
          //       </a>
          //     </span>
          //     {/* <span>{`容器数量: ${selectedRows.reduce(
          //       (pre, item) => pre + item.containers,
          //       0,
          //     )} 个`}</span>
          //     <span>{`调用量: ${selectedRows.reduce(
          //       (pre, item) => pre + item.callNumber,
          //       0,
          //     )} 次`}</span> */}
          //   </Space>
          // )}
          // tableAlertOptionRender={() => {
          //   return (
          //     <Space size={16}>
          //       <a>批量删除</a>
          //       <a>导出数据</a>
          //     </Space>
          //   );
          // }}
          actionRef={actionRef}
          request={dispatchLogsQuery}
          // dataSource={tableListDataSource}
          // scroll={{ x: 750 }}
          size="small"
          options={{ fullScreen: false, reload: false, setting: false, density: false }}
          search={false}
          rowKey="id"
          headerTitle="调度日志"
          toolbar={{
            // menu: {
            //   items: [
            //     {
            //       key: -1,
            //       label: (
            //         <span>
            //           {/* 全部{renderBadge(counter?.running + counter?.stop, jobStatusActiveKey === -1)} */}
            //         </span>
            //       ),
            //     },
            //     {
            //       key: 1,
            //       label: (
            //         <span>
            //           {/* 运行中{renderBadge(counter?.running, jobStatusActiveKey === 1)} */}
            //         </span>
            //       ),
            //     },
            //     {
            //       key: 0,
            //       label: (
            //         <span>
            //           {/* 未启动{renderBadge(counter?.stop, jobStatusActiveKey === 0)} */}
            //         </span>
            //       ),
            //     },
            //   ],
            //   onChange(key) {
            //     if (key == -1) triggerStatus = null;
            //     else triggerStatus = key;
            //     setJobStatusActiveKey(key);
            //     actionRef?.current?.reload();
            //   },
            // },
            actions: [
              <LightFilter
                initialValues={{
                  sex: 'man',
                }}
                bordered
                collapseLabel={<FilterOutlined />}
                onFinish={async (values) => console.log(values)}
              >
                <ProFormDateRangePicker name="time" placeholder="日期" />
                <ProFormRadio.Group
                  name="radio"
                  radioType="button"
                  options={[
                    {
                      value: 'weekly',
                      label: '今天',
                    },
                    {
                      value: 'quarterly',
                      label: '本周',
                    },
                    {
                      value: 'monthly',
                      label: '本月',
                    },
                  ]}
                />
              </LightFilter>,
            ],
          }}
          pagination={{
            showSizeChanger: true,
          }}
          toolBarRender={() => [
            // <Input.Search key="show" enterButton >查看日志</Input.Search>,
          ]}
        />
      </DrawerForm>
    </div>
  );
});

export default DispatchLogDrawer;
