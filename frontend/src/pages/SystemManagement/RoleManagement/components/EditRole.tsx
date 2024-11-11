import {
  DrawerForm,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { updateRoleByMap, insertRoleByMap, getRoleView } from '@/services/swagger/roleController';
import { findItemByMap } from '@/services/swagger/itemController';
import React, { useState, useImperativeHandle, useRef, useEffect } from 'react';
const EditRole = React.forwardRef((props: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [role, setRole] = useState<any>({});
  const formRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    async show(value: any) {
      setVisible(true);
      if (value && value.ems_role_id) {
        const res: any = await getRoleView({ ems_role_id: value.ems_role_id });
        if (res.result) {
          res.result.ems_role_itemids = res.result.ems_role_items?.map((item) => {
            return item.ems_item_id;
          });
        }
        formRef.current?.setFieldsValue(res.result);
        setRole(res.result);
      } else {
        formRef?.current?.resetFields();
        setRole({});
      }
    },
  }));

  return (
    <DrawerForm
      width={600}
      formRef={formRef}
      layout="horizontal"
      grid={true}
      rowProps={{
        gutter: [0, 8],
      }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onOpenChange={setVisible}
      title={`${role?.ems_role_id ? '编辑' : '新建'}角色`}
      open={visible}
      onFinish={async (values) => {
        let params: any = values;
        let res: any;
        if (role && role.ems_role_id) {
          params.ems_role_id = role.ems_role_id;
          res = await updateRoleByMap(params);
        } else {
          res = await insertRoleByMap(params);
        }
        const { code } = res;
        if (code === 200) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
        props.refresh();
        return true;
      }}
    >
      <ProFormText
        name="ems_role_name"
        label="角色名称"
        placeholder="请输入角色名称"
        rules={[{ required: true, message: '角色名称为必填项' }]}
      />

      <ProFormText name="ems_role_tag" label="角色标识" disabled />
      <ProFormRadio.Group
        name="ems_role_status"
        label="角色状态"
        initialValue={1}
        options={[
          {
            label: '正常',
            value: 1,
          },
          {
            label: '停用',
            value: 0,
          },
        ]}
      />
      <ProFormTreeSelect
        label="菜单权限"
        name="ems_role_itemids"
        placeholder="请选择菜单权限"
        allowClear
        request={async () => {
          const res = await findItemByMap({});
          return res.result || [];
        }}
        rules={[{ required: true, message: '菜单权限为必选项' }]}
        fieldProps={{
          multiple: true,
          treeIcon: true,
          // treeLine: true,
          filterTreeNode: true,
          treeCheckable: true,
          showSearch: true,
          showCheckedStrategy: 'SHOW_ALL',
          // labelInValue: true,
          autoClearSearchValue: true,
          treeNodeFilterProp: 'ems_item_name',
          fieldNames: {
            label: 'ems_item_name',
            value: 'ems_item_id',
            children: 'ems_item_items',
          },
        }}
      />
      <ProFormTextArea name="ems_role_des" label="角色描述" placeholder="请输入角色描述" />
    </DrawerForm>
  );
});

export default EditRole;
