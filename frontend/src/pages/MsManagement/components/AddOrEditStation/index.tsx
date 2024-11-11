import {
  DrawerForm,
  ProFormText,
  ProFormItem,
  ProForm,
  CheckCard,
  ProFormCheckbox,
  ProFormDateTimePicker,
  ProFormTextArea,
  ProFormDependency,
} from '@ant-design/pro-components';
import styles from './index.less';
import { message, Divider, Upload, Row, Col, Tag, Tooltip } from 'antd';
import React, { useImperativeHandle, useState, useRef } from 'react';
import { LoadingOutlined, PlusOutlined, createFromIconfontCN } from '@ant-design/icons';
import { insertPanorama, findPanoramaByMap } from '@/services/swagger/panoramaController';
import { useModel, useRequest } from 'umi';
import { findSituationByMap } from '@/services/swagger/situationController';
import TagSelect from '@/components/TagSelect';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
type propsType = {
  refreshList: Function;
};

const AddOrEditStation = React.forwardRef((props: propsType, ref: any) => {
  const formRef = useRef<any>();
  const [panorama, setPanorama] = useState<any>(null);
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [logoFile, setLogoFile] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [elements, setElements] = useState<any>([]);
  const [activities, setActivities] = useState<any>({});

  const selectActivities = (values, elementId) => {
    if (values.length > 0) {
      if (!elements.includes(elementId)) {
        elements.push(elementId);
        setElements([...elements]);
      }
    } else {
      const elementsArr = elements.filter((element) => {
        return element !== elementId;
      });
      setElements([...elementsArr]);
    }

    activities[elementId] = values;

    setActivities({ ...activities });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const { data: situationsData } = useRequest(
    () => {
      return findSituationByMap({});
    },
    {
      formatResult: (res: any) => {
        return res?.result;
      },
    },
  );

  // 方法编写, 例如一些提交保存等操作
  const handleConfirm = async () => {
    try {
      await formRef.current?.validateFields();
      const form = formRef?.current?.getFieldsValue();
      const formData: any = {
        ...form,
      };

      insertPanorama(formData).then((res) => {
        if (res.code == 200) message.success(res.message);
      });
      onVisibleChange(false);
      props.refreshList();
    } catch (error: any) {
      if (error) {
        console.log(error);
      }
    }
  };

  const onVisibleChange = (e: boolean) => {
    formRef.current?.resetFields();
    setDrawerVisit(e);
  };

  useImperativeHandle(ref, () => ({
    async show(result: any) {
      setDrawerVisit(true);
      await findPanoramaByMap({}).then((res) => {
        setPanorama(result);
        if (result) {
          formRef.current?.setFieldsValue(result);
        }
      });
    },
  }));

  return (
    <>
      <DrawerForm
        formRef={formRef}
        visible={drawerVisit}
        onVisibleChange={onVisibleChange}
        width={600}
        title={`${panorama ? '编辑' : '新增'}监测站`}
        onFinish={handleConfirm}
        layout="horizontal"
        grid={true}
        rowProps={{
          gutter: [0, 8],
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Row>
          <Col span={16}>
            <Row gutter={[0, 12]}>
              <ProFormText
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                label="站房名称"
                placeholder="请输入站房名称"
                rules={[{ required: true, message: '请输入站房名称' }]}
              />
              <ProFormText
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="ems_customer_email"
                label="站房编号"
                placeholder="请输入站房编号"
              />
            </Row>
          </Col>
          <Col span={8}>
            <ProFormItem
              label="站房封面"
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
                  // setLoading(true);
                  // const { onSuccess, onError, file }: any = options;
                  // const { result, code }: any = await uploadCustomerLogoFile({ file: file });
                  // setLoading(false);
                  // if (code == 200) {
                  //   setLogoFile(result);
                  //   onSuccess('上传成功');
                  // } else {
                  //   message.success('上传失败');
                  //   onError('上传失败');
                  // }
                }}
              >
                {logoFile?.ems_sysfile_path ? (
                  <img
                    style={{ width: '100px' }}
                    src={`/systemfile${logoFile?.ems_sysfile_path}`}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </ProFormItem>
          </Col>
        </Row>
        <ProForm.Item
          rules={[{ required: true, message: '请选择监测状况' }]}
          style={{ width: '100%' }}
          name="situation"
          label="监测状况"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <CheckCard.Group
            onChange={(value) => {
              console.log('value', value);
            }}
            size="small"
            style={{ width: '100%' }}
          >
            {situationsData?.map((item) => {
              return (
                <CheckCard
                  avatar={<IconFont type={item.ems_situation_icon} className={styles.icon2} />}
                  title={item.ems_situation_name}
                  // description={item.ems_situation_des}
                  style={{ width: '135px' }}
                  value={item.ems_situation_id}
                  key={item.ems_situation_id}
                />
              );
            })}
          </CheckCard.Group>
        </ProForm.Item>
        <ProFormDependency name={['situation']}>
          {({ situation }) => {
            return situation == 1 ? (
              <ProForm.Item
                name="elementactivities"
                label="要素活动"
                rules={[{ required: true, message: '请选择要素活动' }]}
              >
                <CheckCard.Group
                  multiple
                  onChange={(values) => {
                    setElements(values);
                  }}
                  value={elements}
                  size="small"
                  style={{ width: '100%' }}
                >
                  {situationsData
                    ?.find((item) => {
                      return item.ems_situation_id == situation;
                    })
                    ?.ems_situation_elementVos?.map((elementvo) => {
                      return (
                        <CheckCard
                          key={elementvo.ems_element_id}
                          avatar={
                            <IconFont type={elementvo.ems_element_icon} className={styles.icon} />
                          }
                          title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ marginRight: 8, marginLeft: 8 }}>
                                {elementvo.ems_element_name}
                              </span>
                              <Tag color="blue">{elementvo.ems_element_des}</Tag>
                            </div>
                          }
                          description={
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <TagSelect
                                expandable
                                className={styles.tagOption}
                                onChange={(values) =>
                                  selectActivities(values, elementvo.ems_element_id)
                                }
                              >
                                {elementvo.ems_element_activities?.map((activity) => {
                                  return (
                                    <TagSelect.Option
                                      value={activity.ems_activity_id}
                                      key={activity.ems_activity_id}
                                    >
                                      {activity.ems_activity_name}
                                    </TagSelect.Option>
                                  );
                                })}
                              </TagSelect>
                            </div>
                          }
                          style={{ width: '100%' }}
                          value={elementvo.ems_element_id}
                        />
                      );
                    })}
                </CheckCard.Group>
              </ProForm.Item>
            ) : situation == 2 ? (
              <ProForm.Item name="sectors" label="行业活动">
                <CheckCard.Group multiple size="small">
                  {situationsData
                    ?.find((item) => {
                      return item.ems_situation_id == situation;
                    })
                    ?.ems_situation_sectorVos?.map((sectorvo) => {
                      return (
                        <CheckCard
                          avatar={
                            <IconFont type={sectorvo.ems_sector_icon} className={styles.icon} />
                          }
                          title={
                            <Tooltip title={sectorvo.ems_sector_des}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: 8, marginLeft: 8 }}>
                                  {sectorvo.ems_sector_name}
                                </span>
                                <Tag color="blue">{sectorvo.ems_sector_des}</Tag>
                              </div>
                            </Tooltip>
                          }
                          description={
                            <>
                              <TagSelect expandable className={styles.tagOption}>
                                {sectorvo.ems_sector_sectors?.map((sector) => {
                                  return (
                                    <TagSelect.Option value={sector.ems_sector_id}>
                                      {sector.ems_sector_name}
                                    </TagSelect.Option>
                                  );
                                })}
                              </TagSelect>
                              <TagSelect expandable className={styles.tagOption}>
                                {sectorvo.ems_sector_activities?.map((activity) => {
                                  return (
                                    <TagSelect.Option value={activity.ems_activity_id}>
                                      {activity.ems_activity_name}
                                    </TagSelect.Option>
                                  );
                                })}
                              </TagSelect>
                            </>
                          }
                          style={{ width: '100%' }}
                          value={sectorvo.ems_sector_id}
                        />
                      );
                    })}
                </CheckCard.Group>
              </ProForm.Item>
            ) : null;
          }}
        </ProFormDependency>
        <ProForm.Item
          rules={[{ required: true, message: '请选择监测状况' }]}
          style={{ width: '100%' }}
          name="type"
          label="子站类型"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <TagSelect>
            <TagSelect.Option value="station1">常规固定站</TagSelect.Option>
            <TagSelect.Option value="station2">超级站</TagSelect.Option>
            <TagSelect.Option value="station3">简易式站房/小型式站房</TagSelect.Option>
            <TagSelect.Option value="station4">水上固定站/水上浮标(船)站</TagSelect.Option>
          </TagSelect>
        </ProForm.Item>
        <ProFormCheckbox.Group
          name="configstatus"
          label="监测因子"
          options={['PM₂.₅', 'PM₁₀', 'CO', 'NOₓ', 'O₃', 'SO₂']}
        />
        <ProFormDateTimePicker name="time" label="建站时间" width="xl" />
        <ProFormText
          colProps={{ xl: 12 }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="ems_customer_email"
          label="经度"
          placeholder="请输入经度"
        />
        <ProFormText
          colProps={{ xl: 12 }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="ems_customer_email"
          label="纬度"
          placeholder="请输入纬度"
        />
        <ProFormText
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          name="ems_customer_address"
          label="详细地址"
          placeholder="请输入详细地址"
        />
        <Divider style={{ margin: '0 0 10px' }} />
        <ProFormTextArea name="ems_customer_des" label="站房描述" placeholder="请输入站房描述" />
      </DrawerForm>
    </>
  );
});
export default AddOrEditStation;
