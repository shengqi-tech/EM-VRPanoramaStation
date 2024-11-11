import {
  ProCard,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-components';

import { FileAddFilled, PlusOutlined, MinusOutlined, GlobalOutlined } from '@ant-design/icons';

import { Space } from 'antd';
import React, { FormEvent, useEffect, useRef, useState, useImperativeHandle } from 'react';
import styles from './index.less';

const options = [
  {
    value: '0',
    label: 'number',
  },
  {
    value: '1',
    label: 'interger',
  },
  {
    value: '2',
    label: 'string',
  },
  {
    value: '3',
    label: 'array',
  },
];

const Parameters = () => {
  const [method, setMethod] = useState<string>('');

  return (
    <div className={styles.parameters}>
      <ProForm layout="horizontal" submitter={false}>
        <ProFormRadio.Group
          name="radio"
          // label="Radio.Group"
          options={[
            {
              label: 'x-www-form-urlencoded',
              value: 'a',
            },
            {
              label: 'form-data',
              value: 'b',
            },
          ]}
        />
        <ProFormList
          name="attributes"
          creatorButtonProps={{
            creatorButtonText: '添加参数项',
          }}
          min={1}
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
          creatorRecord={{ name: '', items: [{ name: '' }] }}
          initialValue={[{ name: '', items: [{ name: '' }, { name: '' }] }]}
        >
          <Space>
            <ProFormText
              width="lg"
              style={{ padding: 0 }}
              allowClear={false}
              name="name"
              label="参数名称"
            />
            {/* <ProForm.Item isListField style={{ marginBlockEnd: 0 }} label="参数值value"> */}
            <ProFormSelect
              options={options}
              onChange={(value, option: React.ReactNode | Array<React.ReactNode>) =>
                setMethod(value)
              }
              className={styles.select}
            />
            <ProFormList
              name="items"
              creatorButtonProps={{
                creatorButtonText: '',
                icon: false,
                position: 'top',

                type: 'link',
                style: { width: '0px', height: '0px', marginBlockEnd: '0px', display: 'none' },
              }}
              min={1}
              // copyIconProps={false}
              copyIconProps={{ Icon: PlusOutlined, tooltipText: '复制此项到末尾' }}
              deleteIconProps={{ tooltipText: '删除', Icon: MinusOutlined }}
              itemRender={({ listDom, action }) => (
                <div
                  style={{
                    display: 'flex',
                    marginInlineEnd: 0,
                    marginRight: 20,
                    width: 540,
                  }}
                >
                  {listDom}
                  {action}
                </div>
              )}
            >
              <ProFormText label="参数值" allowClear={false} width="lg" name={['name']} />
            </ProFormList>

            {/* </ProForm.Item> */}
          </Space>
        </ProFormList>
      </ProForm>
    </div>
  );
};

export default Parameters;
