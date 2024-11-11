import {
  ProCard,
  ProFormGroup,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormRadio,
  ProFormInstance,
  ProFormDependency,
} from '@ant-design/pro-components';

import { FileAddFilled, PlusOutlined, MinusOutlined, GlobalOutlined } from '@ant-design/icons';

import { Space, Typography, Card } from 'antd';
import React, { FormEvent, useEffect, useRef, useState, useImperativeHandle } from 'react';
import styles from './index.less';
const { Text } = Typography;

const options = [
  {
    value: 'number',
    label: 'number',
  },
  {
    value: 'interger',
    label: 'interger',
  },
  {
    value: 'string',
    label: 'string',
  },
  {
    value: 'array',
    label: 'array',
  },
];

const optionsP = [
  {
    value: 'number',
    label: 'number',
  },
  {
    value: 'interger',
    label: 'interger',
  },
  {
    value: 'string',
    label: 'string',
  },
];

const initialValues = {
  transportFormat: 'x-www-form-urlencoded',
  parameters: {
    queryParameters: [
      {
        pname: '123',
        ptype: 'interger',
        pdes: '就是一个说明',
        pvalues: [{ value: '1' }],
      },
      {
        pname: '223',
        ptype: 'array',
        pdes: '就是一个说明',
        pvalues: [{ value: '1' }, { value: '2' }, { value: '3' }],
      },
    ],
    pathParameters: [
      {
        pathname: '223',
      },
    ],
  },
};

type ParametersProps = {
  parameters: JSON;
};

const Parameters = React.forwardRef((parametersPro: ParametersProps, ref: any) => {
  // 绑定一个 ProFormInstance 实例
  const formRef = useRef<ProFormInstance>();

  // const { parameters } = parametersPro;

  const [parameters, setParameters] = useState(parametersPro?.parameters);

  useImperativeHandle(ref, () => ({
    async getParameters(callback: any) {
      formRef.current?.validateFieldsReturnFormatValue?.().then((val) => {
        // 以下为格式化之后的表单值
        //console.log(val.date);
        callback(val);
      });
    },
    async autoSetPathParameters(paths: []) {
      const pathParameters = paths.map((path) => {
        return { pathname: path };
      });
      const newparameter = {
        transportFormat: parameters?.transportFormat,
        parameters: {
          queryParameters: parameters.parameters?.queryParameters,
          pathParameters: pathParameters,
        },
      };
      setParameters(newparameter);
      formRef?.current?.setFieldsValue(newparameter);
    },
  }));

  return (
    <div className={styles.parameters}>
      <ProForm formRef={formRef} layout="horizontal" initialValues={parameters} submitter={false}>
        <ProFormRadio.Group
          name="transportFormat"
          // label="Radio.Group"
          fieldProps={{
            defaultValue: 'x-www-form-urlencoded',
          }}
          options={[
            {
              label: 'x-www-form-urlencoded',
              value: 'x-www-form-urlencoded',
            },
            {
              label: 'form-data',
              value: 'form-data',
            },
          ]}
        />
        <ProFormGroup
          title={<Text type="warning">Query参数</Text>}
          collapsible
          style={{
            marginBlockEnd: '0px',
          }}
        >
          <Card style={{ width: '100%' }}>
            <ProFormList
              // name="parameters"
              name={['parameters', 'queryParameters']}
              creatorButtonProps={{
                creatorButtonText: '添加参数项',
              }}
              // min={1}
              copyIconProps={false}
              deleteIconProps={{ tooltipText: '删除' }}
              itemRender={({ listDom, action }, { index }) => (
                // <ProCard
                //   // bordered
                //   // style={{ marginBlockEnd: 8 }}
                //   // title={`参数${index + 1}`}
                //   extra={action}
                //   // bodyStyle={{ paddingBlockEnd: 0 }}
                // >
                //   {listDom}
                // </ProCard>
                <div
                  style={{
                    display: 'flex',
                    marginInlineEnd: 10,
                    marginBottom: 5,
                  }}
                >
                  {listDom}
                  <Space style={{ justifyContent: 'center' }}>{action}</Space>
                </div>
              )}
              creatorRecord={{ pname: '', ptype: 'interger', pvalues: [{ value: '' }] }}
              // initialValue={[{ pname: '', ptype: 'interger', pvalues: [{ value: '' }, { value: '' }] }]}
            >
              <Space>
                <ProFormText
                  width="lg"
                  style={{ padding: 0 }}
                  allowClear={false}
                  name="pname"
                  label="参数"
                  placeholder="请输入参数名称"
                  rules={[
                    {
                      required: true,
                      message: '参数名称必填项',
                    },
                  ]}
                />
                <ProFormText
                  width="sm"
                  style={{ padding: 0 }}
                  allowClear={false}
                  name="pdes"
                  placeholder="请输入参数描述"
                />
                {/* <ProForm.Item isListField style={{ marginBlockEnd: 0 }} label="参数值value"> */}
                <ProFormSelect
                  options={options}
                  // onChange={(value, option: React.ReactNode | Array<React.ReactNode>) =>
                  //   setMethod(value)
                  // }
                  fieldProps={{
                    allowClear: false,
                  }}
                  name="ptype"
                  className={styles.select}
                  rules={[
                    {
                      required: true,
                      message: '参数数据类型为必选项',
                    },
                  ]}
                />
                <ProFormDependency name={['ptype']}>
                  {({ ptype }) => {
                    return (
                      <ProFormList
                        name="pvalues"
                        creatorButtonProps={{
                          creatorButtonText: '',
                          icon: false,
                          position: 'top',

                          type: 'link',
                          style: {
                            width: '0px',
                            height: '0px',
                            marginBlockEnd: '0px',
                            display: 'none',
                          },
                        }}
                        min={1}
                        // copyIconProps={false}
                        copyIconProps={
                          ptype == 'array'
                            ? { Icon: PlusOutlined, tooltipText: '复制此项到末尾' }
                            : false
                        }
                        deleteIconProps={{ tooltipText: '删除', Icon: MinusOutlined }}
                        itemRender={({ listDom, action }) => (
                          <div
                            style={{
                              display: 'flex',
                              marginInlineEnd: 0,
                              marginRight: 20,
                              width: 340,
                            }}
                          >
                            {listDom}
                            {action}
                          </div>
                        )}
                      >
                        <ProFormText label="参数值" allowClear={false} width="sm" name="value" />
                      </ProFormList>
                    );
                  }}
                </ProFormDependency>

                {/* </ProForm.Item> */}
              </Space>
            </ProFormList>
          </Card>
        </ProFormGroup>

        {parameters?.parameters?.pathParameters?.length > 0 ? (
          <ProFormGroup
            title={<Text type="warning">Path参数</Text>}
            collapsible
            style={{
              marginTop: '10px',
            }}
          >
            <Card>
              <ProFormList
                // name="parameters"
                name={['parameters', 'pathParameters']}
                creatorButtonProps={false}
                // min={1}
                copyIconProps={false}
                deleteIconProps={false}
                itemRender={({ listDom, action }, { index }) => (
                  // <ProCard
                  //   // bordered
                  //   // style={{ marginBlockEnd: 8 }}
                  //   // title={`参数${index + 1}`}
                  //   extra={action}
                  //   // bodyStyle={{ paddingBlockEnd: 0 }}
                  // >
                  //   {listDom}
                  // </ProCard>
                  <div
                    style={{
                      display: 'flex',
                      marginInlineEnd: 10,
                      marginBottom: 5,
                    }}
                  >
                    {listDom}
                    <Space style={{ justifyContent: 'center' }}>{action}</Space>
                  </div>
                )}
                // creatorRecord={}
                // initialValue={[{ pname: '', ptype: 'interger', pvalues: [{ value: '' }, { value: '' }] }]}
              >
                <Space>
                  <ProFormText
                    width="lg"
                    style={{ padding: 0 }}
                    allowClear={false}
                    name="pathname"
                    label="参数"
                    fieldProps={{
                      readOnly: true,
                    }}
                    placeholder="请输入参数名称"
                    rules={[
                      {
                        required: true,
                        message: '参数名称必填项',
                      },
                    ]}
                  />
                  <ProFormText
                    width="sm"
                    style={{ padding: 0 }}
                    allowClear={false}
                    name="pathdes"
                    placeholder="请输入参数描述"
                  />
                  {/* <ProForm.Item isListField style={{ marginBlockEnd: 0 }} label="参数值value"> */}
                  <ProFormSelect
                    options={optionsP}
                    // onChange={(value, option: React.ReactNode | Array<React.ReactNode>) =>
                    //   setMethod(value)
                    // }
                    fieldProps={{
                      allowClear: false,
                    }}
                    name="pathtype"
                    className={styles.select}
                    rules={[
                      {
                        required: true,
                        message: '参数数据类型为必选项',
                      },
                    ]}
                  />

                  <ProFormText label="参数值" allowClear={false} width="sm" name="pathvalue" />
                  {/* </ProForm.Item> */}
                </Space>
              </ProFormList>
            </Card>
          </ProFormGroup>
        ) : null}
      </ProForm>
    </div>
  );
});

export default Parameters;
