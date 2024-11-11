import React, { useRef, useState, useEffect, useImperativeHandle } from 'react';
import { useRequest, useModel, useIntl, FormattedMessage } from 'umi';

import { FooterToolbar } from '@ant-design/pro-layout';
import moment from 'moment';
import {
  Card,
  Result,
  Button,
  Descriptions,
  Divider,
  Alert,
  Statistic,
  Avatar,
  Tag,
  Form,
  Row,
  Col,
  message,
  Typography,
  List,
  Space,
} from 'antd';

import { EditableProTable, DrawerForm, ProFormText, ProForm } from '@ant-design/pro-components';
import type { ProFormInstance, ProColumns } from '@ant-design/pro-components';

import styles from './style.less';

import {
  findJobGroupByMap,
  updateJobGroup,
  insertJobGroup,
} from '../../../../../../services/swagger/jobGroupController';

import { values } from 'lodash';
import { TrademarkCircleOutlined, createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3192392_pors2ew3ri.js',
});

const { Paragraph, Text } = Typography;

export type ActuatorRegisterDrawerProps = {
  customer?: API.CustomerVo;
};

const ActuatorRegisterDrawer = React.forwardRef((props: ActuatorRegisterDrawerProps, ref: any) => {
  // 绑定一个 ProFormInstance 实例
  const formRef = useRef<ProFormInstance<API.XxlJobGroup>>();

  const [visible, setVisible] = useState(false);
  const { customer } = props;

  const [actuator, setActuator] = useState<API.XxlJobGroup>();

  const [jobHandlerDataSource, setJobHandlerDataSource] = useState([]);

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: '10%',
      readonly: true,
    },
    {
      title: '编号',
      dataIndex: 'id',
      tooltip: '数据库中的唯一编号',
      // formItemProps: (form, { rowIndex }) => {
      //   return {
      //     rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
      //   };
      // },
      // // 第一行不允许编辑
      // editable: (text, record, index) => {
      //   return index !== 0;
      // },
      width: '15%',
    },
    {
      title: 'JobHandler名字',
      dataIndex: 'jobhName',
      tooltip: '执行器中处理具体任务的单元',
      // formItemProps: (form, { rowIndex }) => {
      //   return {
      //     rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
      //   };
      // },
      // // 第一行不允许编辑
      // editable: (text, record, index) => {
      //   return index !== 0;
      // },
      width: '30%',
    },

    {
      title: '用途说明',
      dataIndex: 'jobhDecs',
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },

    {
      title: '操作',
      valueType: 'option',
      width: '15%',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setJobHandlerDataSource(jobHandlerDataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
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

  const onVisibleChange = async (visible: boolean) => {
    setVisible(visible);
  };

  const onLineData1 = [
    {
      ip: '192.168.1.2',
      port: 8001,
    },
    {
      ip: '192.168.3.2',
      port: 19202,
    },
    {
      ip: '192.168.1.5',
      port: 3756,
    },
    {
      ip: '192.168.1.2',
      port: 37,
    },
  ];

  const [onlineData, setOnlineData] = useState();

  useEffect(() => {
    findJobGroupByMap({ customerId: customer?.ems_customer_id }).then((res) => {
      if (res.result?.list && res.result?.list.length > 0) {
        const actuator = res.result?.list[0];
        actuator.jobHandlers = JSON.parse(actuator.jobHandlers || '');
        setJobHandlerDataSource(actuator.jobHandlers);
        const addList = actuator.addressList?.split(',') || [];

        setOnlineData(
          addList.map((item) => {
            const regex = /^(https?:\/\/[^:/]+)(?::(\d{1,5}))?(\/.*)?$/;
            const matches = item.match(regex);
            return {
              ip: matches[1],
              port: matches[2],
            };
          }),
        );
        setActuator(actuator);
        formRef?.current?.setFieldsValue(actuator);
      } else {
        setActuator(null);
        setJobHandlerDataSource([]);
        setOnlineData(onLineData1);
        formRef?.current?.resetFields();
      }
    });
  }, [customer]);

  useImperativeHandle(ref, () => ({
    async show(result: any) {
      setVisible(true);
    },
  }));

  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  return (
    <div>
      <DrawerForm<API.XxlJobGroupVo>
        formKey="modal-form-001"
        title={`${customer?.ems_customer_name}注册执行器`}
        // getContainer={false}
        // closable={false}
        className={styles.actuator}
        initialValues={actuator}
        // readonly
        visible={visible}
        onVisibleChange={(visible) => onVisibleChange(visible)}
        // style={{ position: 'absolute' }}
        width="640px"
        // submitter={{
        //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,//固定页脚
        // }}

        // 通过formRef进行绑定
        formRef={formRef}
        onFinish={async (values) => {
          formRef.current?.validateFieldsReturnFormatValue?.().then(async (val) => {
            // 以下为格式化之后的表单值
            // val.jobHandlers = JSON.stringify(val.jobHandlers);
            let result;
            val.jobHandlers = JSON.stringify(jobHandlerDataSource);
            if (actuator && actuator.id) {
              val.id = actuator?.id;
              val.customerId = actuator?.customerId;
              result = await updateJobGroup({ ...val });
            } else {
              val.customerId = customer?.ems_customer_id;
              result = await insertJobGroup(val);
            }
            if (result.code == 200) {
              setVisible(false);
              message.success(result.message);
            } else {
              message.error(result.message);
            }
          });
        }}
      >
        <Alert
          icon={<TrademarkCircleOutlined size={24} />}
          message={
            <Space>
              <IconFont type="icon-vr-m" className={styles.icon_vr} />
              {customer?.ems_customer_name}
              <Tag color="#ffbf00">{customer?.ems_customer_city}</Tag>
            </Space>
          }
          description={
            <>
              <span>执行器于</span>
              <Text type="danger" strong>
                {moment.utc(actuator?.updateTime).local().format('YYYY-MM-DD HH:mm:ss')}
              </Text>
              <span>创建，用于进行全景数据的自动化对接工作。</span>
            </>
          }
          type="info"
          showIcon
        />
        <Divider style={{ marginBottom: '8px', marginTop: '10px' }} />
        <ProFormText
          // key={`title${actuator?.title}`}
          label="执行器名称"
          rules={[{ required: true, message: '执行器名称为必填项' }]}
          // width="lg"
          name="title"
          tooltip="执行器名称，便于人来管理执行器"
        />
        <ProFormText
          // key={`appname${actuator?.appname}`}
          label="AppName"
          rules={[{ required: true, message: 'AppName为必填项' }]}
          // width="lg"
          name="appname"
          tooltip="执行器心跳注册分组依据；为空则关闭自动注册"
        />
        <ProForm.Item
          label="任务详情"
          name="jobHandlers"
          // initialValue={defaultData}
          trigger="onValuesChange"
        >
          <EditableProTable
            rowKey="id"
            // headerTitle="设置JobHandler"
            // maxLength={5}
            // name="jobHandlers"
            recordCreatorProps={{
              position: 'bottom',
              record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
            }}
            loading={false}
            // toolBarRender={}
            columns={columns}
            // request={async () => ({
            //   data: jobHandlerDefaultDataSource,
            //   success: true,
            // })}
            value={jobHandlerDataSource}
            onChange={setJobHandlerDataSource}
            editable={{
              type: 'multiple',
              editableKeys,
              onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);
                // await waitTime(2000);
              },
              onChange: setEditableRowKeys,
            }}
          />
        </ProForm.Item>

        <Divider style={{ margin: '0 0 15px' }} />
        <Space>
          {/* <h4 style={{ fontWeight: 'bolder' }}> OnLine 机器地址(可以是分布式多节点)</h4>{' '} */}
          <Text style={{ fontWeight: 'bolder' }} strong>
            OnLine 机器地址
          </Text>
          <Text type="danger" italic>
            (执行器运行后会自动注册于此，可以是分布式多节点)
          </Text>
        </Space>
        <List
          pagination={{ position: 'bottom', pageSize: 3, size: 'small' }}
          dataSource={onlineData}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: ColorList[index % 4], verticalAlign: 'middle' }}
                    size="default"
                  >
                    {item.port}
                  </Avatar>
                }
                title={item.ip}
                description="一个在线运行的执行器的服务器Ip地址和端口"
              />
            </List.Item>
          )}
        />
      </DrawerForm>
    </div>
  );
});

export default ActuatorRegisterDrawer;
