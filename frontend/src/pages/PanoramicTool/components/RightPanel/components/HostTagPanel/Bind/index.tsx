import { useModel, useParams } from 'umi';
import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import {
  Checkbox,
  Row,
  Col,
  Card,
  Tag,
  Collapse,
  Space,
  Segmented,
  Tabs,
  Button,
  Popconfirm,
  message,
  Image,
} from 'antd';
import {
  createFromIconfontCN,
  CheckCircleFilled,
  PlusOutlined,
  DeleteOutlined,
  HighlightOutlined,
  ToolOutlined,
  DesktopOutlined,
  GoldOutlined,
} from '@ant-design/icons';
import { fontSizeOptions } from '../../../const';
import {
  ProCard,
  ProFormSelect,
  ProFormItem,
  ProFormCascader,
  ProFormText,
  CheckCard,
  ProForm,
  ProFormRadio,
  ProFormDependency,
  ProFormSwitch,
  ProFormSlider,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { templateOptions } from '../../../const';
import { ProDescriptions } from '@ant-design/pro-descriptions';
import { findCompositionByMap } from '@/services/swagger/compositionController';
import { findProductByMap } from '@/services/swagger/productController';
import { findDeviceByMap } from '@/services/swagger/deviceController';
import { findConfigurationByMap } from '@/services/swagger/configurationController';
import {
  insertProperty,
  deletePropery,
  updateProperty,
} from '@/services/swagger/propertyController';
import './index.less';
const { Panel } = Collapse;
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});

const Bind = React.forwardRef((props: any, ref: any) => {
  const params: any = useParams();
  const { instanceId } = params;
  const formRef = useRef<ProFormInstance>();
  const deviceFormRef = useRef<ProFormInstance>();
  const styleFormRef = useRef<ProFormInstance>();
  const [template, setTemplate] = useState(null);
  const [templateType, setTemplateType] = useState(0);
  const [compositionList, setCompositionList] = useState<any>([]);
  const [deviceOptions, setDeviceOptions] = useState<any>([]);
  const [deviceList, setDeviceList] = useState<any>([]);
  const [configList, setConfigList] = useState<any>([]);
  const [productList, setProductList] = useState<API.ProductVo[]>([]);
  const [selectedIds, setSelectedIds] = useState<any>([]);

  const actionRef = useRef();
  const [activeKey, setActiveKey] = useState('1');
  const [items, setItems] = useState<any>([
    { label: '设备', children: '', closable: false, key: '1' },
  ]);
  const newTabIndex = useRef(0);

  const { changDataStyle } = useModel('PanoramicTool.label', (ret) => ({
    changDataStyle: ret.changDataStyle,
  }));

  /**
   * 勾选的产品属性
   * @param id
   */
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  /**
   * 设计表单
   * @param changeValues
   * @param values
   */
  const changeValues = async (changeValues: any, values: any) => {
    if (changeValues.composition && changeValues.composition[changeValues.composition.length - 1]) {
      const compositionId = changeValues.composition[changeValues.composition.length - 1];
      findProductByMap({ ems_composition_id: compositionId }).then((res) => {
        const list = res.result;
        setProductList(list);
      });
    }
    if (values.productId) {
      findDeviceByMap({ ems_instance_id: instanceId, ems_product_id: values.productId }).then(
        (res) => {
          const { result } = res;
          const options = result?.map((item) => {
            return {
              label: item.ems_device_no,
              value: item.ems_device_id,
            };
          });
          setDeviceOptions(options);
        },
      );
    } else {
      setDeviceOptions([]);
    }
  };

  /**
   * 切换设备
   * @param newActiveKey
   */
  const onChange = (newActiveKey: string) => {
    const item = items.find((item) => {
      return item.key == newActiveKey;
    });

    if (item.device && item.device.ems_device_InstallconfigurationVos) {
      deviceFormRef.current?.setFieldValue('deviceId', item.device.ems_device_id);
      item.device.ems_device_InstallconfigurationVos?.map((jtem) => {
        deviceFormRef.current?.setFieldValue(
          jtem.ems_configuration_key,
          jtem.ems_installconfiguration_value,
        );
      });
    } else {
      deviceFormRef.current?.resetFields();
    }
    setActiveKey(newActiveKey);
  };

  /**
   * 添加设备
   */
  const add = () => {
    const newActiveKey = `设备${newTabIndex.current++}`;
    const newPanes = [...items];

    newPanes.push({ label: '设备', children: '', key: newActiveKey });
    setItems(newPanes);
    setActiveKey(newActiveKey);
    deviceFormRef.current?.resetFields();
  };

  /**
   * 移除设备
   * @param targetKey
   */
  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);

    const item = items.find((item) => {
      return item.key == newActiveKey;
    });
    if (item.device && item.device.ems_device_InstallconfigurationVos) {
      deviceFormRef.current?.setFieldValue('deviceId', item.device.ems_device_id);
      item.device.ems_device_InstallconfigurationVos?.map((jtem) => {
        deviceFormRef.current?.setFieldValue(
          jtem.ems_configuration_key,
          jtem.ems_installconfiguration_value,
        );
      });
    } else {
      deviceFormRef.current?.resetFields();
    }
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const filter = (inputValue: string, path: any) =>
    path.some(
      (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );

  useEffect(() => {
    findCompositionByMap({}).then((res) => {
      setCompositionList(res.result);
    });
    findDeviceByMap({}).then((res) => {
      setDeviceList(res.result);
    });
    findConfigurationByMap({}).then((res) => {
      setConfigList(res.result);
    });
  }, []);

  /**
   * 刷新属性
   */
  const refreshProperty = () => {
    const composition = formRef.current?.getFieldValue('composition');
    findProductByMap({
      ems_composition_id: composition[composition.length - 1],
    }).then((res) => {
      const list = res.result;
      setProductList(list);
    });
  };

  /**
   * 添加属性
   */
  const addProperty = () => {
    insertProperty({
      ems_property_moduleid: formRef.current?.getFieldValue('moduleId'),
      ems_property_code: '',
      ems_property_name: '',
      ems_property_unit: '',
    }).then((res) => {
      message.success(res.message);
      refreshProperty();
    });
  };

  /**
   * 删除属性
   * @param id
   */
  const deleteProperty = (id) => {
    deletePropery({
      ems_propery_id: id,
    }).then((res) => {
      message.success(res.message);
      refreshProperty();
    });
  };

  /**
   * 编辑属性
   * @param property
   */
  const editProperty = (property) => {
    updateProperty(property).then((res) => {
      message.success(res.message);
      refreshProperty();
    });
  };

  /**
   * 设备配置表单
   * @param changeValues
   * @param values
   */
  const onDeviceChange = async (changeValues: any, values: any) => {
    const item = items.find((item) => {
      return item.key == activeKey;
    });
    if (item.device && item.device.ems_device_InstallconfigurationVos) {
      item.device.ems_device_InstallconfigurationVos?.map((config) => {
        config.ems_installconfiguration_value = values[config.ems_configuration_key];
        return config;
      });
      setItems([...items]);
    }
  };

  /**
   * 选择设备
   * @param deviceId
   */
  const selectDevice = (deviceId) => {
    if (deviceId) {
      const device = deviceList?.find((item) => {
        return item.ems_device_id == deviceId;
      });
      // 渲染赋值
      device?.ems_device_InstallconfigurationVos?.forEach((item) => {
        deviceFormRef?.current?.setFieldValue(
          item.ems_configuration_key,
          item.ems_installconfiguration_value,
        );
      });
      const item = items.find((item) => {
        return item.key == activeKey;
      });
      item.label = device?.ems_device_no || '设备';
      item.device = JSON.parse(JSON.stringify(device)); // 深拷贝防止污染deviceList
      setItems([...items]);
    } else {
      const item = items.find((item) => {
        return item.key == activeKey;
      });
      item.label = '设备';
      item.device = null;
      setItems([...items]);
    }
  };

  const getAllValues = () => {
    let parmas: any = {
      ems_common_deviceinstalls: [],
    };
    const formValues = formRef.current?.getFieldsValue();
    // const properties = productList
    //   ?.find((item: API.ProductVo) => {
    //     return item.ems_product_id == formValues.productId;
    //   })
    //   ?.versionVos?.find((jtem: API.VersionVo) => {
    //     return jtem.ems_version_id == formValues.versionId;
    //   })
    //   ?.moduleVos?.find((item: API.ModuleVo) => {
    //     return item.ems_module_id == formValues.moduleId;
    //   })?.properties;
    // let selectedIdsArr: any = [];
    // properties?.forEach((item) => {
    //   if (selectedIds.includes(item.ems_property_id)) {
    //     selectedIdsArr.push(item.ems_property_id);
    //   }
    // });
    styleFormRef.current?.setFieldValue('textShow', false);
    const jsonData = {
      form: formValues,
      deviceForm: deviceFormRef.current?.getFieldsValue(),
      styleForm: styleFormRef.current?.getFieldsValue(),
      selectedIds: selectedIds,
      items: items,
      templateType: templateType,
      template: template,
    };
    parmas.jsonData = JSON.stringify(jsonData);

    let devices: any = [];
    items?.forEach((item) => {
      if (item.device && item.device?.ems_device_id) {
        devices.push({
          ems_device_id: item.device?.ems_device_id,
          ems_device_Installconfigurations: item.device.ems_device_InstallconfigurationVos,
        });
      }
    });
    parmas.ems_common_deviceinstalls = devices;
    parmas.ems_common_propertyids = selectedIds;
    return parmas;
  };

  const setValues = (jsonData) => {
    if (jsonData) {
      const json = JSON.parse(jsonData);
      const { form, deviceForm, styleForm, items, templateType, template, selectedIds } = json;
      formRef.current?.setFieldsValue(form);
      deviceFormRef.current?.setFieldsValue(deviceForm);
      styleFormRef.current?.setFieldsValue(styleForm);
      setItems(items);
      setTemplateType(templateType);
      setTemplate(template);
      setSelectedIds(selectedIds);
      if (form.composition) {
        const compositionId = form.composition[form.composition.length - 1];
        findProductByMap({ ems_composition_id: compositionId }).then((res) => {
          const list = res.result;
          setProductList(list);
        });
      }
      if (form.productId) {
        findDeviceByMap({ ems_instance_id: instanceId, ems_product_id: form.productId }).then(
          (res) => {
            const { result } = res;
            const options = result?.map((item) => {
              return {
                label: item.ems_device_no,
                value: item.ems_device_id,
              };
            });
            setDeviceOptions(options);
          },
        );
      }
    } else {
      formRef.current?.resetFields();
      deviceFormRef.current?.resetFields();
      styleFormRef.current?.resetFields();
      setItems([{ label: '设备', children: '', closable: false, key: '1' }]);
      setTemplate(null);
      setTemplateType(0);
    }
  };

  /**
   * 样式配置
   * @param changeValues
   * @param values
   */
  const onStyleChange = (changeValues: any, values: any) => {
    switch (values.type) {
      case 0:
        values.text = 'value';
        break;
      case 1:
        values.text = 'key';
        break;
      case 2:
        values.text = 'key：value';
        break;
      case 3:
        values.text = 'key' + '\n' + 'value';
        break;
      default:
        values.text = '';
    }
    changDataStyle(values);
  };

  useImperativeHandle(ref, () => ({
    getAllValues,
    setValues,
  }));

  return (
    <div className="bind">
      <ProForm
        formRef={formRef}
        onValuesChange={changeValues}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 5 }}
        layout="horizontal"
        submitter={false}
      >
        <ProCard
          title={
            <div className="card-title">
              <HighlightOutlined />
              设计
            </div>
          }
          ghost
        >
          <div className="device-card-form">
            <ProFormCascader
              name="composition"
              label="产品分类"
              fieldProps={{
                showSearch: { filter },
                fieldNames: {
                  label: 'ems_composition_name',
                  value: 'ems_composition_id',
                  children: 'ems_composition_compositions',
                },
                options: compositionList,
              }}
            />
            <ProFormDependency name={['composition']}>
              {({ composition }) => {
                if (composition) {
                  return (
                    <ProFormItem label="产品型号" name="productId">
                      <CheckCard.Group size="small">
                        {productList?.map((item: API.ProductVo) => {
                          return (
                            <CheckCard
                              key={item.ems_product_id}
                              title={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span style={{ marginInlineEnd: 8, marginInlineStart: 8 }}>
                                    {item.ems_product_type}
                                  </span>
                                  <Tag color="blue"> {item.ems_product_brand}</Tag>
                                </div>
                              }
                              value={item.ems_product_id}
                            />
                          );
                        })}
                      </CheckCard.Group>
                    </ProFormItem>
                  );
                } else {
                  return null;
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['productId']}>
              {({ productId }) => {
                if (productId) {
                  return (
                    <ProFormSelect
                      options={productList
                        ?.find((item: API.ProductVo) => {
                          return item.ems_product_id == productId;
                        })
                        ?.versionVos?.map((version: API.VersionVo) => {
                          return {
                            label: version.ems_version_no,
                            value: version.ems_version_id,
                          };
                        })}
                      width="md"
                      name="versionId"
                      label="产品版本"
                    />
                  );
                } else {
                  return null;
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['productId', 'versionId']}>
              {({ productId, versionId }) => {
                if (productId && versionId) {
                  return (
                    <ProFormRadio.Group
                      name="moduleId"
                      label="产品模块"
                      options={productList
                        ?.find((item: API.ProductVo) => {
                          return item.ems_product_id == productId;
                        })
                        ?.versionVos?.find((jtem: API.VersionVo) => {
                          return jtem.ems_version_id == versionId;
                        })
                        ?.moduleVos?.map((module: API.ModuleVo) => {
                          return {
                            label: module.ems_module_name,
                            value: module.ems_module_id,
                          };
                        })}
                    />
                  );
                } else {
                  return null;
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['productId', 'versionId', 'moduleId']}>
              {({ productId, versionId, moduleId }) => {
                if (productId && versionId && moduleId) {
                  return (
                    <ProFormItem label="产品属性" name="propertyType" initialValue="0">
                      <Segmented
                        block
                        className="ant-segmented-gray"
                        options={[
                          {
                            label: '展示属性',
                            value: '0',
                          },
                          {
                            label: '下发属性',
                            value: '1',
                          },
                        ]}
                      />
                    </ProFormItem>
                  );
                } else {
                  return null;
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['productId', 'versionId', 'moduleId', 'propertyType']}>
              {({ productId, versionId, moduleId, propertyType }) => {
                if (productId && versionId && moduleId && propertyType == '0') {
                  return (
                    <ProFormItem name="properties" label={' '}>
                      <Collapse ghost expandIconPosition="end" accordion>
                        {productList
                          ?.find((item: API.ProductVo) => {
                            return item.ems_product_id == productId;
                          })
                          ?.versionVos?.find((jtem: API.VersionVo) => {
                            return jtem.ems_version_id == versionId;
                          })
                          ?.moduleVos?.find((item: API.ModuleVo) => {
                            return item.ems_module_id == moduleId;
                          })
                          ?.properties?.map((property) => {
                            return (
                              <Panel
                                header={
                                  <>
                                    <Checkbox
                                      checked={selectedIds.includes(property.ems_property_id)}
                                      onChange={() =>
                                        handleCheckboxChange(property.ems_property_id)
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <Space
                                        style={{ width: '190px' }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                        }}
                                      >
                                        <div>{property.ems_property_name}</div>
                                        <Tag color="#108ee9">{property.ems_property_code}</Tag>
                                      </Space>
                                    </Checkbox>
                                    <Popconfirm
                                      title="是否删除该项！"
                                      okText="是"
                                      cancelText="否"
                                      onConfirm={(e) => {
                                        e.stopPropagation();
                                        deleteProperty(property.ems_property_id);
                                      }}
                                    >
                                      <DeleteOutlined
                                        className="delete-btn"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                        }}
                                      />
                                    </Popconfirm>
                                  </>
                                }
                                key={property.ems_property_id}
                              >
                                <ProDescriptions
                                  actionRef={actionRef}
                                  formProps={{
                                    onValuesChange: (e, f) => console.log(f),
                                  }}
                                  request={async () => {
                                    return Promise.resolve({
                                      success: true,
                                      data: property,
                                    });
                                  }}
                                  column={1}
                                  editable={{
                                    onSave: (key, record) => {
                                      editProperty(record);
                                    },
                                  }}
                                  columns={[
                                    {
                                      title: 'Key',
                                      key: 'ems_property_code',
                                      dataIndex: 'ems_property_code',
                                      ellipsis: true,
                                    },
                                    {
                                      title: '名称',
                                      key: 'ems_property_name',
                                      dataIndex: 'ems_property_name',
                                      ellipsis: true,
                                    },
                                    {
                                      title: '单位',
                                      key: 'ems_property_unit',
                                      dataIndex: 'ems_property_unit',
                                      ellipsis: true,
                                    },
                                  ]}
                                ></ProDescriptions>
                              </Panel>
                            );
                          })}
                      </Collapse>
                      <Button
                        type="dashed"
                        className="add-btn"
                        block
                        icon={<PlusOutlined />}
                        onClick={addProperty}
                      >
                        添加属性
                      </Button>
                    </ProFormItem>
                  );
                } else {
                  return null;
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['productId', 'versionId', 'moduleId', 'propertyType']}>
              {({ productId, versionId, moduleId, propertyType }) => {
                if (productId && versionId && moduleId && propertyType == '1') {
                  return (
                    <ProFormItem label={' '} name="aaas">
                      <Collapse ghost expandIconPosition="end" accordion>
                        <Panel
                          header={
                            <>
                              <Checkbox
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Space
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <div>清洗指令</div>
                                  <Tag color="#108ee9">clean</Tag>
                                </Space>
                              </Checkbox>
                              <Popconfirm
                                title="是否删除该项！"
                                okText="是"
                                cancelText="否"
                                onConfirm={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <DeleteOutlined
                                  className="delete-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                />
                              </Popconfirm>
                            </>
                          }
                          key="1"
                        >
                          <ProDescriptions
                            actionRef={actionRef}
                            formProps={{
                              onValuesChange: (e, f) => console.log(f),
                            }}
                            request={async () => {
                              return Promise.resolve({
                                success: true,
                                data: {
                                  key: 'clean',
                                  name: '清洗指令',
                                  unit: 0,
                                },
                              });
                            }}
                            column={1}
                            editable={{}}
                            columns={[
                              {
                                title: 'Key',
                                key: 'key',
                                dataIndex: 'key',
                                ellipsis: true,
                              },
                              {
                                title: '名称',
                                key: 'name',
                                dataIndex: 'name',
                                ellipsis: true,
                              },
                            ]}
                          ></ProDescriptions>
                        </Panel>
                      </Collapse>
                      <Button type="dashed" className="add-btn" block icon={<PlusOutlined />}>
                        添加属性
                      </Button>
                    </ProFormItem>
                  );
                } else {
                  return null;
                }
              }}
            </ProFormDependency>
            <ProFormItem name="dataType" label="数据类型">
              <Segmented
                block
                className="ant-segmented-gray"
                options={[
                  {
                    label: '污染物数据',
                    value: 0,
                  },
                  {
                    label: '工况数据',
                    value: 1,
                  },
                ]}
              />
            </ProFormItem>
          </div>
        </ProCard>
        {/* 配置 */}
        <ProCard
          title={
            <div className="card-title">
              <ToolOutlined />
              安装
            </div>
          }
          ghost
        >
          <ProForm
            formRef={deviceFormRef}
            onValuesChange={onDeviceChange}
            colon={false}
            labelAlign="left"
            labelCol={{ span: 5 }}
            layout="horizontal"
            submitter={false}
          >
            <Tabs
              type="editable-card"
              onChange={onChange}
              activeKey={activeKey}
              onEdit={onEdit}
              items={items}
            />
            <div className="card-form">
              <ProFormSelect
                name="deviceId"
                label="关联设备"
                options={deviceOptions}
                fieldProps={{
                  onChange: selectDevice,
                }}
              />
            </div>
            <div className="device-card-form">
              {configList
                ?.filter((item) => {
                  let composition = null;
                  if (formRef.current?.getFieldValue('composition')) {
                    composition =
                      formRef.current?.getFieldValue('composition')[
                        formRef.current?.getFieldValue('composition')?.length - 1
                      ];
                  }
                  return item.ems_configuration_compositionid == composition;
                })
                .map((config) => {
                  return (
                    <ProFormText
                      key={config.ems_configuration_id}
                      label={config.ems_configuration_name}
                      name={config.ems_configuration_key}
                    />
                  );
                })}
            </div>
          </ProForm>
        </ProCard>
        {/* 数据展示 */}
        <ProCard
          title={
            <div className="card-title">
              <GoldOutlined /> 展示
            </div>
          }
          ghost
        >
          <ProForm
            formRef={styleFormRef}
            onValuesChange={onStyleChange}
            colon={false}
            labelAlign="left"
            labelCol={{ span: 5 }}
            layout="horizontal"
            submitter={false}
          >
            <div className="card-form">
              <ProFormSwitch
                labelCol={{ span: 20 }}
                initialValue={false}
                name="textShow"
                label="测试"
                checkedChildren={'显示'}
                unCheckedChildren={'隐藏'}
              />
              <ProFormSelect
                name="type"
                label="方式"
                initialValue={0}
                options={[
                  { label: '只展示数据', value: 0 },
                  { label: '只展示名称', value: 1 },
                  { label: '横向展示名称和数据', value: 2 },
                  { label: '纵向展示名称和数据', value: 3 },
                ]}
              />
              <ProFormSelect
                initialValue={14}
                name="fontSize"
                label="字号"
                options={fontSizeOptions}
              />
              {/* <ProFormItem label="位置" name="placement" initialValue={'top'}>
                <Segmented
                  block
                  className="ant-segmented-gray"
                  options={[
                    {
                      value: 'top',
                      icon: (
                        <Tooltip placement="top" title="上方">
                          <InsertRowAboveOutlined />
                        </Tooltip>
                      ),
                    },
                    {
                      value: 'right',
                      icon: (
                        <Tooltip placement="top" title="右侧">
                          <InsertRowRightOutlined />
                        </Tooltip>
                      ),
                    },
                    {
                      value: 'bottom',
                      icon: (
                        <Tooltip placement="top" title="下方">
                          <InsertRowBelowOutlined />
                        </Tooltip>
                      ),
                    },
                    {
                      value: 'left',
                      icon: (
                        <Tooltip placement="top" title="左侧">
                          <InsertRowLeftOutlined />
                        </Tooltip>
                      ),
                    },
                    {
                      value: 'center',
                      icon: (
                        <Tooltip placement="top" title="中心">
                          <BorderOuterOutlined />
                        </Tooltip>
                      ),
                    },
                  ]}
                />
              </ProFormItem> */}
              <ProFormSlider
                name="shiftX"
                label="水平偏移"
                min={-200}
                max={200}
                initialValue={0}
                marks={{
                  '-200': '-200',
                  0: '0',
                  200: '200',
                }}
                step={0.01}
              />
              <ProFormSlider
                name="shiftY"
                initialValue={0}
                label="垂直偏移"
                min={-200}
                max={200}
                step={0.01}
                marks={{
                  '-200': '-200',
                  0: '0',
                  200: '200',
                }}
              />
            </div>
          </ProForm>
        </ProCard>
        {/* 模板 */}
        <ProCard
          title={
            <div className="card-title">
              <DesktopOutlined />
              模板
            </div>
          }
          ghost
        >
          <div className="card-form">
            <Segmented
              block
              className="ant-segmented-gray"
              options={[
                {
                  label: '展示模版',
                  value: 0,
                },
                {
                  label: '交互模版',
                  value: 1,
                },
              ]}
              value={templateType}
              onChange={(value) => {
                setTemplateType(Number(value));
              }}
            />
            <ProFormItem label="" name="templateType" initialValue={1}>
              <Row gutter={24} justify="space-between">
                {templateOptions
                  ?.filter((template) => {
                    return template.type == templateType;
                  })
                  ?.map((item) => {
                    return (
                      <Col span={12} key={item.value}>
                        <Card
                          onClick={() => {
                            if (item.value === template) {
                              setTemplate(null);
                            } else {
                              setTemplate(item.value);
                            }
                          }}
                          className={item.value == template ? 'card-selected' : ''}
                          size="small"
                          hoverable
                          cover={
                            <>
                              <Image
                                width={'100%'}
                                height={100}
                                src={require(`@/assets/images/panoramicTool/deviceTemplate${item.value}.png`)}
                              />
                            </>
                          }
                        >
                          {item.value == template && (
                            <CheckCircleFilled className="icon-selected" />
                          )}
                          <Card.Meta title={item.label} />
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </ProFormItem>
          </div>
        </ProCard>
      </ProForm>
    </div>
  );
});
export default Bind;
