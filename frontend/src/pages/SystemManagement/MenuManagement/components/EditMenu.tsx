import {
  DrawerForm,
  ProFormDigit,
  ProFormTreeSelect,
  ProFormText,
  ProFormRadio,
} from '@ant-design/pro-components';
import { findItemByMap, insertItem, updateItem } from '@/services/swagger/itemController';
import React, { useState, useImperativeHandle, useRef, useEffect } from 'react';
import { message } from 'antd';
const EditMenu = React.forwardRef((props: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState<any>({});
  const formRef = useRef<any>();

  useEffect(() => {
    if (visible) {
      if (menu?.ems_item_parentid === 0) {
        menu.ems_item_parentid = null;
      }
      formRef.current?.setFieldsValue(menu);
    } else {
      formRef.current?.resetFields();
    }
  }, [visible]);

  useImperativeHandle(ref, () => ({
    async show(menu: any) {
      setMenu(menu);
      setVisible(true);
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
      title={`${menu?.ems_item_id ? '编辑' : '新建'}菜单`}
      open={visible}
      onFinish={async (values) => {
        let params: any = values;
        let res: any;
        if (menu && menu.ems_item_id) {
          params.ems_item_id = menu.ems_item_id;
          res = await updateItem(params);
        } else {
          res = await insertItem(params);
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
      <ProFormTreeSelect
        label="上级菜单"
        name="ems_item_parentid"
        placeholder="请选择上级菜单"
        allowClear
        secondary
        request={async () => {
          const res = await findItemByMap({});
          return res.result || [];
        }}
        fieldProps={{
          treeIcon: true,
          treeLine: true,
          filterTreeNode: true,
          showSearch: true,
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
      <ProFormRadio.Group
        name="ems_item_type"
        label="菜单类型"
        options={[
          {
            label: '目录',
            value: 0,
          },
          {
            label: '菜单',
            value: 1,
          },
          {
            label: '按钮',
            value: 2,
          },
          {
            label: '其他',
            value: 3,
          },
        ]}
        rules={[{ required: true, message: '菜单类型为必选项' }]}
      />
      <ProFormText
        name="ems_item_name"
        label="菜单名称"
        placeholder="请输入菜单名称"
        rules={[{ required: true, message: '菜单名称为必填项' }]}
      />
      <ProFormText name="ems_item_code" label="菜单标识" placeholder="请输入菜单标识" />
      <ProFormText name="ems_item_path" label="请求地址" placeholder="请输入请求地址" />
      <ProFormDigit
        name="ems_item_order"
        label="显示排序"
        placeholder=""
        tooltip="数字越小越靠前"
      />
      <ProFormText name="ems_item_icon" tooltip="iconfont的名称" label="图标" placeholder="" />
    </DrawerForm>
  );
});

export default EditMenu;
