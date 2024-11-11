import React, { useRef, useState, useEffect, useImperativeHandle } from 'react';
import { useRequest, useModel, useIntl, FormattedMessage } from 'umi';

import {
  Card,
  Button,
  Descriptions,
  Alert,
  Statistic,
  Avatar,
  Tag,
  Space,
  Tooltip,
  Typography,
  message,
  Empty,
} from 'antd';
import { AimOutlined, createFromIconfontCN } from '@ant-design/icons';

import type { ProFormInstance } from '@ant-design/pro-form';

import {
  ProFormDependency,
  ProForm,
  ProFormGroup,
  CheckCard,
  DrawerForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';

import styles from './style.less';

import { update, values } from 'lodash';

import Cron from 'qnn-react-cron';
import { findCustomerByMap } from '../../../../services/swagger/customerController';
import { findJobGroupByMap } from '../../../../services/swagger/jobGroupController';
import { insertJobInfo, updateJobInfo } from '../../../../services/swagger/jobInfoController';

import { FooterToolbar } from '@ant-design/pro-layout';
import { ProList } from '@ant-design/pro-components';

import { number } from 'yargs';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3192392_pors2ew3ri.js',
});

const { Paragraph } = Typography;

export type AddOrEditDrawerProps = {
  job?: API.XxlJobInfoVo;
  // trigger:React.ReactNode;
  onSubmit: (success: boolean) => Promise<void>;
};

const JobAddOrEditModel = React.forwardRef((props: AddOrEditDrawerProps, ref: any) => {
  const [visible, setVisible] = useState(false);

  // 绑定一个 ProFormInstance 实例
  const formRef = useRef<ProFormInstance<API.XxlJobInfoVo>>();

  const { onSubmit, job } = props;

  let cronFns;

  const [customerid, setCustomerid] = useState();

  let [cronValue, setCronValue] = React.useState();

  const onVisibleChange = async (visible: boolean) => {
    setVisible(visible);
  };

  //修改切换、新增等重置页面的内容
  useEffect(() => {
    if (job && Object.keys(job).length > 0) {
      formRef.current?.setFieldsValue(job);
      setCronValue(job?.scheduleConf);
      setCustomerid(job.jobGroupVo?.customerId);
    } else formRef.current?.resetFields();
  }, [job]);

  //获取客户源
  const {
    data: customersOptions,
    loading: methodsLoading,
    // run: fetchCustomers,
  } = useRequest(
    () => {
      return findCustomerByMap({});
    },
    {
      // manual: true,
      formatResult: (response: any) => {
        const selectOptions: any = [];
        response.result?.list?.map((customer: API.CustomerVo) => {
          selectOptions.push({
            value: customer.ems_customer_id,
            label: (
              <Space>
                <Avatar
                  size={24}
                  src={`/systemfile${customer?.ems_customer_logofile?.ems_sysfile_path}`}
                ></Avatar>
                {customer.ems_customer_name}
                <Tag> {customer.ems_customer_city}</Tag>
              </Space>
            ),
          });
        });
        return selectOptions;
      },
    },
  );

  //切换客户
  const {
    data: jobgroup,
    loading: jobHandlersLoading,
    // run: fetchCustomers,
  } = useRequest(
    () => {
      return findJobGroupByMap({
        customerId: customerid,
      });
    },
    {
      // manual: true,
      formatResult: (response: any) => {
        // let jobHrs: any = [];
        let jobgroup;
        if (response.result?.list && response.result?.list.length > 0) {
          jobgroup = response.result?.list[0];
          // jobHrs = JSON.parse(jobgroup?.jobHandlers);
          // jobHrs = jobHrs.map((jobHr) => {
          //   jobHr.jobhGroupId = jobgroup.id;
          //   return jobHr;
          // });
        }
        return jobgroup;
      },
      refreshDeps: [customerid],
    },
  );

  const jobHandlers =
    jobgroup?.jobHandlers && JSON.parse(jobgroup?.jobHandlers)
      ? JSON.parse(jobgroup?.jobHandlers).map((jobHr) => {
          jobHr.jobhGroupId = jobgroup.id;
          return jobHr;
        })
      : [];

  const jobHandlersHtml = jobHandlers?.map((actutor: any) => {
    return {
      title: (
        <div style={{ display: 'flex', alignItems: 'center' }} key={actutor.id}>
          {/* <IconFont type="icon-vr-m" /> */}
          <AimOutlined />
          <span style={{ marginRight: 8, marginLeft: 8 }}>{actutor.jobhName}</span>
        </div>
      ),
      description: (
        <Tooltip placement="bottom" title={actutor.jobhDecs}>
          <Paragraph ellipsis={{ rows: 1 }} style={{ opacity: 0.45, marginBottom: 0 }}>
            {actutor.jobhDecs}
          </Paragraph>
        </Tooltip>
      ),
      value: actutor.jobhName,
    };
  });

  const info = jobgroup?.title || job?.jobGroupVo?.title;

  useImperativeHandle(ref, () => ({
    async show(result: any) {
      setVisible(true);
      // await findJobGroupByMap({ customerId: customer?.ems_customer_id }).then((res) => {
      //   if (res.result?.list && res.result?.list.length > 0) {
      //     const actuator = res.result?.list[0];
      //     actuator.jobHandlers = JSON.parse(actuator.jobHandlers || '');
      //     setJobHandlerDataSource(actuator.jobHandlers);
      //     setActuator(actuator);
      //     formRef.current?.setFieldsValue(actuator);
      //   }
      // });
    },
  }));

  return (
    <div>
      <DrawerForm<API.XxlJobInfoVo>
        formKey="modal-form-XxlJobInfoVo"
        title={`连接${job ? '编辑' : '添加'}`}
        width="640px"
        visible={visible}
        onVisibleChange={(visible) => onVisibleChange(visible)}
        // trigger={trigger}
        // submitter={{
        //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,//固定页脚
        // }}
        // getContainer={false}
        // closable={false}

        // style={{ position: 'absolute' }}
        // 通过formRef进行绑定
        formRef={formRef}
        initialValues={job}
        onFinish={async (values) => {
          formRef.current?.validateFieldsReturnFormatValue?.().then(async (val) => {
            // 以下为格式化之后的表单值
            //console.log(val.date);
            let result;
            if (job) {
              const handlejob = { ...job, ...val };

              if (!handlejob.scheduleConf) {
                handlejob.scheduleType = 'NONE';
              } else if (handlejob.scheduleConf?.includes('*')) {
                handlejob.scheduleType = 'CRON';
              } else {
                handlejob.scheduleType = 'FIX_RATE';
              }

              handlejob.glueType = 'BEAN';
              const jobH = jobHandlers?.find((jobHandler) => {
                return jobHandler.jobhName == handlejob.executorHandler;
              });
              handlejob.executorHandler = jobH.jobhName;
              handlejob.jobGroup = parseInt(jobH.jobhGroupId);
              result = await updateJobInfo(handlejob);
            } else {
              const handlejob = { ...val };

              handlejob.author = 'hugangyong';
              handlejob.alarmEmail = '609210276@qq.com';

              if (!handlejob.scheduleConf) {
                handlejob.scheduleType = 'NONE';
              } else if (handlejob.scheduleConf?.includes('*')) {
                handlejob.scheduleType = 'CRON';
              } else {
                handlejob.scheduleType = 'FIX_RATE';
              }

              handlejob.glueType = 'BEAN';
              const jobH = jobHandlers?.find((jobHandler) => {
                return jobHandler.jobhName == handlejob.executorHandler;
              });
              handlejob.executorHandler = jobH.jobhName;
              handlejob.jobGroup = parseInt(jobH.jobhGroupId);
              // handlejob.executorParam=""

              handlejob.executorRouteStrategy = 'FIRST';

              handlejob.executorFailRetryCount = 1;

              handlejob.misfireStrategy = 'DO_NOTHING';

              handlejob.executorBlockStrategy = 'SERIAL_EXECUTION';

              handlejob.executorTimeout = 10;
              // handlejob.childJobId=

              result = await insertJobInfo(handlejob);
            }
            if (result.code == 200) {
              setVisible(false);
              onSubmit(true);
              message.success(result.message);
            } else {
              message.error(result.message);
            }
          });
        }}
      >
        <ProFormSelect
          label="客户源"
          placeholder="请选择客户源"
          // request={() => {
          //   return Promise.resolve({
          //     success: true,
          //     data: customersSelect || [],
          //   });
          // }}
          // fieldProps={{
          //   optionItemRender(item) {
          //     return item.ems_customer_name;
          //   },
          // }}
          options={customersOptions}
          rules={[
            {
              required: true,
              message: '客户源为必选项',
            },
          ]}
          onChange={(item) => {
            setCustomerid(item);
          }}
          // width="md"
          name={['jobGroupVo', 'customerVo', 'ems_customer_id']}
        />
        <h4 style={{ fontWeight: 'bolder' }}>任务配置</h4>
        <ProFormText
          key={`jobDesc${job?.id}`}
          label="任务名称"
          rules={[{ required: true, message: '任务名称为必填项' }]}
          // width="lg"
          name="jobDesc"
          tooltip="任务描述(名称)"
        />

        {jobHandlers && jobHandlers.length > 0 ? (
          <>
            <ProForm.Item
              label="任务类型"
              // name={['jobGroupVo', 'id']}
              name="executorHandler"
              rules={[
                {
                  required: true,
                  message: '任务类型必选项',
                },
              ]}
              style={{ marginBottom: '5px' }}
            >
              <CheckCard.Group
                // loading={checkGroupLoading}
                size="small"
                options={jobHandlersHtml || []}
                // defaultValue={formRef.current?.getFieldValue('eme_product_nodetype')?.eme_nodetype_id}
                className={styles.checkgroudStyle}
              ></CheckCard.Group>
            </ProForm.Item>
            <Alert message={info} type="warning" showIcon closable />
          </>
        ) : (
          <Empty description={<span>没有执行器，请先建设执行器</span>}></Empty>
        )}

        <h4 style={{ fontWeight: 'bolder', marginTop: '20px' }}>调度配置</h4>
        <ProFormText
          tooltip="手动输入数字，以秒为单位"
          placeholder="请输入或选择执行周期"
          name="scheduleConf"
          allowClear
        />
        <Cron
          value={cronValue}
          onOk={(value: any) => {
            console.log('cron:', cronValue);
          }}
          getCronFns={(_cronFns: any) => {
            cronFns = _cronFns;
          }}
          footer={[
            <Button
              key="cencel"
              style={{ marginRight: 10 }}
              onClick={() => {
                setCronValue(null);
                let jobinfo = formRef.current?.getFieldsValue?.();
                jobinfo.scheduleConf = '';
                formRef.current?.setFieldsValue(jobinfo);
              }}
              size="small"
              type="link"
            >
              重置
            </Button>,
            <Button
              key="getValue"
              onClick={() => {
                const value = cronFns.getValue();
                setCronValue(value);
                let jobinfo = formRef.current?.getFieldsValue?.();
                jobinfo.scheduleConf = value;
                formRef.current?.setFieldsValue(jobinfo);
              }}
              size="small"
              type="link"
            >
              生成
            </Button>,
          ]}
        />

        <ProFormGroup
          collapsible
          label="高级设置(*暂时不处理)"
          style={{ marginTop: '20px' }}
        ></ProFormGroup>

        {/* 使用dependencies进行绑定依赖 */}
        {/* <ProFormSelect
          key={`${product?.eme_product_protocol?.eme_protocol_id}eme_product_protocol`}
          // name="eme_product_protocol"
          name={['eme_product_protocol', 'eme_protocol_id']}
          // label='网关协议/联网方式'
          label="网关协议/联网方式" //label={`网关协议/联网方式《${eme_product_nodetypeid}》合同约定生效方式`}
          // width="md"
          // fieldNames={{ label: 'eme_protocol_name', value: 'eme_protocol_id', options: {} }}
          // dependencies 的内容会注入 request 中
          // defaultValue={defaulSelect}
          dependencies={['eme_product_nodetype', 'eme_nodetype_id']}
          request={
            async (params) => protocolsSelectOptions(params?.eme_product_nodetype.eme_nodetype_id)
            // console.log("a");
          }
          rules={[
            {
              required: true,
              message: '网关协议/联网方式为必填项',
            },
          ]}
        /> */}
      </DrawerForm>
    </div>
  );
});

export default JobAddOrEditModel;
