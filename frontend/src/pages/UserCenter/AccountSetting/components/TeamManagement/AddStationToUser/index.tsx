import {
  DrawerForm,
  ProFormItem,
  ProFormSelect,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-components';
import { useModel } from 'umi';
import { List, Avatar, Card, message } from 'antd';
import { findSysuserByMap, assignInstance } from '@/services/swagger/sysuserController';
import React, { useState, useImperativeHandle, useRef, useEffect } from 'react';
const AddStationToUser = React.forwardRef((props: any, ref: any) => {
  const { currentUser } = props;
  const [visible, setVisible] = useState(false);
  const [stationList, setStationList] = useState<any>({});
  const formRef = useRef<any>();
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  useImperativeHandle(ref, () => ({
    async show(value: any) {
      setVisible(true);
      setStationList(value);
    },
  }));

  return (
    <DrawerForm
      width={isMobile ? undefined : 600}
      resize={{ minWidth: '100%' }}
      formRef={formRef}
      layout="horizontal"
      grid={true}
      rowProps={{
        gutter: [0, 8],
      }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onOpenChange={setVisible}
      title="分配至用户"
      open={visible}
      onFinish={async (values) => {
        let params: any = values;
        params.ems_instance_ids = stationList?.map((item) => {
          return item.ems_instance_id;
        });
        const res = await assignInstance(params);
        const { code } = res;
        if (code === 200) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
        return true;
      }}
    >
      <ProFormItem label="所选监测站" name="ems_instance_ids" style={{ width: '100%' }}>
        <Card bodyStyle={{ padding: '12px 12px 12px 24px' }}>
          <List
            itemLayout="horizontal"
            dataSource={stationList || []}
            renderItem={(item, index) => (
              <List.Item key={item?.ems_instance_id}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={`/systemfile${item?.ems_instance_picfile?.ems_sysfile_path}`} />
                  }
                  title={<a>{item.ems_instance_name}</a>}
                  description={item.ems_instance_address}
                />
              </List.Item>
            )}
          />
        </Card>
      </ProFormItem>

      <ProFormDateTimeRangePicker
        width="xl"
        name="ems_assign_expirationdate"
        label="有效时间"
        rules={[
          {
            required: true,
            message: '有效时间为必选项',
          },
        ]}
      />
      <ProFormSelect
        name="ems_sysuser_id"
        label="用户"
        rules={[
          {
            required: true,
            message: '用户为必选项',
          },
        ]}
        request={async (params) => {
          let { result } = await findSysuserByMap({
            ems_sysuser_customerid: currentUser?.ems_sysuser_customerid,
          });
          const options = result?.list
            ?.filter((item) => {
              return item.roles?.find((role) => {
                return role.ems_role_tag !== 'admin' && role.ems_role_tag !== 'systemadmin';
              });
            })
            ?.map((jtem) => {
              return {
                label: jtem.ems_sysuser_name,
                value: jtem.ems_sysuser_id,
              };
            });
          return options || [];
        }}
      />
    </DrawerForm>
  );
});

export default AddStationToUser;
