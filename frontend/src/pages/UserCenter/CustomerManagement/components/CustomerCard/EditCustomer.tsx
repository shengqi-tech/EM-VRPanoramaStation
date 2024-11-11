import {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormItem,
  CheckCard,
} from '@ant-design/pro-components';
import { Row, Col, message, Upload } from 'antd';
import React, { useState, useImperativeHandle, useRef, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined, createFromIconfontCN } from '@ant-design/icons';
import {
  uploadCustomerLogoFile,
  insertCustomer,
  updateCustomer,
} from '@/services/swagger/customerController';
import './EditCustomer.less';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});

const EditCustomer = React.forwardRef((props: any, ref: any) => {
  const formRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [customer, setCustomer] = useState<any>({});
  const [logoFile, setLogoFile] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );
  useEffect(() => {
    if (visible) {
      if (customer?.ems_customer_logofile) {
        setLogoFile(customer.ems_customer_logofile);
      }
      formRef.current?.setFieldsValue(customer);
    } else {
      setLogoFile({});
      formRef.current?.resetFields();
    }
  }, [visible]);

  useImperativeHandle(ref, () => ({
    async show(customer: any) {
      setCustomer(customer);
      setVisible(true);
    },
  }));

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      width={600}
      formRef={formRef}
      visible={visible}
      onVisibleChange={(value) => {
        setVisible(value);
      }}
      title={`${customer?.ems_customer_id ? '编辑' : '新增'}企业`}
      layout="horizontal"
      grid={true}
      rowProps={{
        gutter: [0, 0],
      }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={async (values) => {
        let params: any = values;
        let res: any;
        params.ems_customer_logofile = logoFile;
        if (customer && customer.ems_customer_id) {
          params.ems_customer_id = customer.ems_customer_id;
          res = await updateCustomer(params);
        } else {
          res = await insertCustomer(params);
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
      <Row>
        <Col span={16}>
          <Row gutter={[0, 12]}>
            <ProFormText
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              name="ems_customer_name"
              rules={[{ required: true, message: '请输入企业名称' }]}
              label="企业名称"
              placeholder="请输入企业名称"
            />
            <ProFormText
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              name="ems_customer_email"
              label="企业邮箱"
              placeholder="请输入企业邮箱"
            />
          </Row>
        </Col>
        <Col span={8}>
          <ProFormItem
            label="企业logo"
            name="ems_customer_logofile"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              maxCount={1}
              className="avatar-uploader"
              customRequest={async (options) => {
                setLoading(true);
                const { onSuccess, onError, file }: any = options;
                const { result, code }: any = await uploadCustomerLogoFile({ file: file });
                setLoading(false);
                if (code == 200) {
                  setLogoFile(result);
                  onSuccess('上传成功');
                } else {
                  message.success('上传失败');
                  onError('上传失败');
                }
              }}
            >
              {logoFile?.ems_sysfile_path ? (
                <img style={{ width: '100px' }} src={`/systemfile${logoFile?.ems_sysfile_path}`} />
              ) : (
                uploadButton
              )}
            </Upload>
          </ProFormItem>
        </Col>
      </Row>
      <ProFormItem
        style={{ width: '100%' }}
        name="situation"
        label="监测要素"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <CheckCard.Group
          multiple
          onChange={(value) => {
            console.log('value', value);
          }}
          size="small"
          style={{ width: '100%' }}
        >
          <CheckCard
            avatar={<IconFont type="icon-shui" style={{ fontSize: 20 }} />}
            title="水"
            style={{ width: '135px' }}
            value={1}
            key={1}
          />
          <CheckCard
            avatar={<IconFont type="icon-daqi" style={{ fontSize: 20 }} />}
            title="大气"
            style={{ width: '135px' }}
            value={2}
            key={2}
          />
          <CheckCard
            avatar={<IconFont type="icon-turang" style={{ fontSize: 20 }} />}
            title="土壤"
            style={{ width: '135px' }}
            value={3}
            key={3}
          />
        </CheckCard.Group>
      </ProFormItem>
      <ProFormText
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name="ems_customer_organizationcode"
        label="组织机构代码"
        placeholder="请输入组织机构代码"
      />
      <ProFormText
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name="ems_customer_legalperson"
        label="法人姓名"
        placeholder="请输入法人姓名"
      />
      <ProFormText
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name="ems_customer_address"
        label="企业地址"
        placeholder="请输入企业地址"
      />
      <ProFormTextArea name="ems_customer_des" label="企业描述" placeholder="请输入企业描述" />
    </DrawerForm>
  );
});
export default EditCustomer;
