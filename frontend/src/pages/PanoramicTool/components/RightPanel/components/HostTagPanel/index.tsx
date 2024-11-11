import { useModel, useParams } from 'umi';
import {
  Segmented,
  Tag,
  Space,
  Typography,
  Tooltip,
  Button,
  Popconfirm,
  message,
  Checkbox,
  Row,
  Col,
} from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProFormSwitch,
  ProForm,
  ProFormTextArea,
  ProFormSelect,
  ProFormSlider,
  ProFormItem,
  ProFormColorPicker,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import IntegerStep from '@/components/IntegerStep';
import {
  createFromIconfontCN,
  InsertRowAboveOutlined,
  InsertRowRightOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  BorderOuterOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import { fontSizeOptions, modeOptions, styleOptions } from '../../const';
import './index.less';
import { useState, useRef, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { queryPanoramaList, optionObject } from './service';
import { uploadTagtype } from '@/services/swagger/tagtypeController';
import Bind from './Bind';
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const { Text } = Typography;

const HostTagPanel = () => {
  const bindRef = useRef<any>(null);
  const observerRef = useRef<any>(null);
  const params: any = useParams();
  const { instanceId } = params;
  // model
  const { panoramaData, queryPanoramaView } = useModel('PanoramicTool.panoramaData', (ret) => ({
    panoramaData: ret.panoramaData,
    queryPanoramaView: ret.queryPanoramaView,
  }));
  const { currentObject, changeObjectStyle, selectObject, handleDeleteObject, refreshObjects } =
    useModel('PanoramicTool.label', (ret) => ({
      currentObject: ret.currentObject,
      changeObjectStyle: ret.changeObjectStyle,
      selectObject: ret.selectObject,
      handleDeleteObject: ret.handleDeleteObject,
      refreshObjects: ret.refreshObjects,
    }));
  const { data } = currentObject;

  // react
  const formRef = useRef<ProFormInstance>();
  const [mode, setMode] = useState<number | string>('base');
  const [selectedTags, setSelectedTags] = useState<any>([]);

  /**
   * 选择字体样式
   * @param tag
   */
  const handleTagClick = (tag: string) => {
    let tags = [];
    if (selectedTags.includes(tag)) {
      tags = selectedTags.filter((selectedTag: string) => selectedTag !== tag);
    } else {
      tags = [...selectedTags, tag];
    }
    setSelectedTags(tags);
    let values = formRef?.current?.getFieldsValue();
    changeObjectStyle({ ...values, style: tags });
    formRef?.current?.setFieldValue('style', tags);
  };

  /**
   * 基础 / 高级
   * @param mode
   */
  const changeMode = (mode: string | number) => {
    setMode(mode);
  };

  /**
   * 表单改变标签实体样式
   * @param changeValues
   * @param values
   */
  const changeValues = async (changeValues: any, values: any) => {
    if (changeValues.videoFile) {
      const videoFile = values.videoFile;
      if (videoFile && videoFile[0] && videoFile[0].status == 'done') {
        const { originFileObj } = videoFile[0];
        const res: any = await uploadTagtype({ file: originFileObj, type: '' }, {}, originFileObj);
        if (res.code == 200) {
          const fileList: any = [
            {
              uid: res.result.ems_sysfile_id,
              name: res.result.ems_sysfile_name,
              status: 'done',
              url: `/systemfile${res.result.ems_sysfile_path}`,
              thumbUrl: `/systemfile${res.result.ems_sysfile_path}`,
            },
          ];
          formRef.current?.setFieldValue('videoFile', fileList);
          values.videoFile = fileList;
        }
      }
    }
    if (changeValues.coverFile) {
      const coverFile = values.coverFile;
      if (coverFile && coverFile[0] && coverFile[0].status == 'done') {
        const { originFileObj } = coverFile[0];
        const res: any = await uploadTagtype({ file: originFileObj, type: '' }, {}, originFileObj);
        if (res.code == 200) {
          const fileList: any = [
            {
              uid: res.result.ems_sysfile_id,
              name: res.result.ems_sysfile_name,
              status: 'done',
              url: `/systemfile${res.result.ems_sysfile_path}`,
              thumbUrl: `/systemfile${res.result.ems_sysfile_path}`,
            },
          ];
          formRef.current?.setFieldValue('coverFile', fileList);
          values.coverFile = fileList;
        }
      }
    }
    changeObjectStyle(values);
  };

  /**
   * 取消保存操作
   */
  const handleCancelSelect = async () => {
    if (currentObject) {
      let res = await queryPanoramaView(params.id);
      if (res?.code == 200) {
        let data = res.result;
        refreshObjects(data);
        selectObject({});
        // 取消绑定数据
        bindRef?.current?.setValues();
      }
    }
  };

  const isSavedObject = () => {
    let object = null;
    object =
      panoramaData?.ems_panorama_commonvos?.find((item) => {
        return item.ems_common_id == data.id;
      }) ||
      panoramaData?.ems_panorama_navigationvos?.find((item) => {
        return item.ems_navigation_id == data.id;
      }) ||
      panoramaData?.ems_panorama_htmlvos?.find((item) => {
        return item.ems_html_id == data.id;
      });
    return object ? true : false;
  };

  /**
   * 保存对象
   */
  const handleSave = async () => {
    if (!isEmpty(currentObject)) {
      let data = currentObject.data;
      let res = null;
      // 元素宽度与高度刷新
      let values = formRef?.current?.getFieldsValue();
      changeObjectStyle({ ...values });

      // 绑定
      data.bindData = bindRef.current.getAllValues();

      if (isSavedObject()) {
        res = await optionObject(data, 'update');
      } else {
        res = await optionObject(data, 'insert');
      }
      selectObject({});
      bindRef.current.setValues();
      if (res?.code == 200) {
        queryPanoramaView(params.id);
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } else {
      message.info('请选择一个标签保存！');
    }
  };

  /**
   * 删除对象
   */
  const handleDelete = async () => {
    if (!isEmpty(currentObject)) {
      let data = currentObject.data;
      if (isSavedObject()) {
        let res = await optionObject(data, 'delete');
        if (res.code == 200) {
          // 删除对象
          handleDeleteObject(currentObject);
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      } else {
        handleDeleteObject(currentObject);
      }
    }
  };

  useEffect(() => {
    formRef?.current?.resetFields();
    bindRef.current.setValues();
    // 基础高级
    if (currentObject?.data?.form) {
      setSelectedTags(currentObject?.data?.form?.style);
      formRef?.current?.setFieldsValue(currentObject?.data?.form);
    }
    if (!isEmpty(currentObject)) {
      let { position, rotation, element } = currentObject;
      let width = element.style.width;
      let height = element.style.height;
      formRef?.current?.setFieldValue('width', parseInt(width, 10));
      formRef?.current?.setFieldValue('height', parseInt(height, 10));
      formRef?.current?.setFieldValue('position', position);
      formRef?.current?.setFieldValue('rotation', rotation);
      currentObject.data.form = formRef.current?.getFieldsValue();
    } else {
      formRef?.current?.resetFields();
    }

    // 绑定数据回显
    if (currentObject?.data?.bindData) {
      bindRef?.current?.setValues(currentObject?.data?.bindData);
    }

    // 监听 宽度变化
    const element = currentObject?.element;
    if (element) {
      observerRef.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        const newWidth = width + 2;
        const newHeight = height + 2;
        if (newWidth !== formRef?.current?.getFieldValue('width')) {
          formRef?.current?.setFieldValue('width', newWidth);
        }
        if (newHeight !== formRef?.current?.getFieldValue('height')) {
          formRef?.current?.setFieldValue('height', newHeight);
        }
      });
      observerRef.current.observe(element);
    }
    return () => {
      observerRef?.current?.disconnect();
    };
  }, [currentObject]);

  return (
    <div className="hostTagPanel">
      <div className="title">{data?.name || '热点'}</div>
      <div className="content">
        <div className="mode">
          <Segmented
            block
            className="ant-segmented-gray"
            onChange={changeMode}
            options={modeOptions}
          />
        </div>
        <ProForm
          formRef={formRef}
          onValuesChange={changeValues}
          colon={false}
          labelAlign="left"
          labelCol={{ span: 5 }}
          layout="horizontal"
          submitter={false}
        >
          <div className={`form ${mode == 'base' ? 'show' : ''}`}>
            <ProCard
              title={
                <div className="card-title">
                  <IconFont type="icon-font" /> 标题
                </div>
              }
              ghost
              extra={
                <ProFormSwitch
                  initialValue={true}
                  name="textShow"
                  noStyle
                  checkedChildren={'显示'}
                  unCheckedChildren={'隐藏'}
                />
              }
            >
              <div className="card-form">
                <ProFormTextArea name="text" className="inputText" initialValue="" />
                <ProFormSelect
                  initialValue={14}
                  name="fontSize"
                  label="字号"
                  options={fontSizeOptions}
                />
                <ProFormColorPicker label="颜色" name="color" initialValue="#fff" />
                <ProFormItem label="样式" name="style" initialValue={[]}>
                  <Space>
                    {styleOptions.map((item) => (
                      <Tag
                        key={item}
                        className={`tag ${selectedTags.includes(item) ? 'selectedTag' : ''}`}
                        color="#3C3C3C"
                        onClick={() => handleTagClick(item)}
                      >
                        <Text
                          strong={item === 'B'}
                          underline={item === 'U'}
                          italic={item === 'I'}
                          className="text"
                        >
                          {item}
                        </Text>
                      </Tag>
                    ))}
                  </Space>
                </ProFormItem>
                <ProFormItem label="位置" name="placement" initialValue={'top'}>
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
                </ProFormItem>
              </div>
            </ProCard>
            <ProCard
              title={
                <div className="card-title">
                  <IconFont
                    type="icon-img"
                    style={{ verticalAlign: 'middle', marginTop: '-4px', marginRight: '13px' }}
                  />
                  图标
                </div>
              }
              ghost
              extra={
                <ProFormSwitch
                  initialValue={true}
                  name="imgShow"
                  noStyle
                  checkedChildren={'显示'}
                  unCheckedChildren={'隐藏'}
                />
              }
            >
              <div className="card-form">
                {/* <ProFormSwitch labelCol={{ span: 20 }} label="跟随画面同步缩放" />
                <ProFormSwitch labelCol={{ span: 20 }} label="固定水平垂直显示" /> */}
              </div>
            </ProCard>

            {/* 导航 */}
            {!isEmpty(currentObject) && currentObject.data.type == 'navigation' && (
              <ProCard
                title={
                  <div className="card-title">
                    <IconFont
                      type="icon-device"
                      style={{ verticalAlign: 'middle', marginTop: '-4px', marginRight: '13px' }}
                    />
                    目标场景
                  </div>
                }
                ghost
              >
                <div className="card-form">
                  <ProFormItem name="floor" initialValue="0">
                    <Segmented
                      block
                      className="ant-segmented-gray"
                      options={[
                        {
                          label: '一楼',
                          value: '0',
                          icon: <InsertRowAboveOutlined />,
                        },
                        {
                          label: '二楼',
                          value: '1',
                          icon: <InsertRowAboveOutlined />,
                        },
                        {
                          label: '空中',
                          value: '2',
                          icon: <InsertRowAboveOutlined />,
                        },
                      ]}
                    />
                  </ProFormItem>
                  <ProFormSelect
                    name="toPanoramaId"
                    label="场景"
                    placeholder="请选择场景"
                    dependencies={['floor']}
                    request={async (params) => {
                      let { result } = await queryPanoramaList(instanceId, params.floor);
                      const options = result?.list?.map((item: API.PanoramaVo) => {
                        return {
                          label: item.ems_panorama_name,
                          value: item.ems_panorama_id,
                        };
                      });
                      return options || [];
                    }}
                  />
                </div>
              </ProCard>
            )}
            {/* iframe */}
            {!isEmpty(currentObject) && currentObject.data.type == 'iframe' && (
              <ProCard
                title={
                  <div className="card-title">
                    <IconFont
                      type="icon-device"
                      style={{ verticalAlign: 'middle', marginTop: '-4px', marginRight: '13px' }}
                    />
                    网页
                  </div>
                }
                extra={
                  <ProFormSwitch
                    initialValue={false}
                    name="iframeShow"
                    noStyle
                    checkedChildren={'预览'}
                    unCheckedChildren={'隐藏'}
                  />
                }
                ghost
              >
                <div className="card-form">
                  <ProFormText name="iframeUrl" placeholder="请输入网页地址" />
                </div>
              </ProCard>
            )}
            {/* 图片 */}
            {!isEmpty(currentObject) && currentObject.data.type == 'image' && (
              <ProCard
                title={
                  <div className="card-title">
                    <IconFont
                      type="icon-device"
                      style={{ verticalAlign: 'middle', marginTop: '-4px', marginRight: '13px' }}
                    />
                    图片
                  </div>
                }
                extra={
                  <ProFormSwitch
                    initialValue={false}
                    name="coverShow"
                    noStyle
                    checkedChildren={'预览'}
                    unCheckedChildren={'隐藏'}
                  />
                }
                ghost
              >
                <div className="card-form">
                  <ProFormUploadDragger
                    name="coverFile"
                    label=""
                    fieldProps={{
                      iconRender: () => {
                        return <></>;
                      },
                      maxCount: 1,
                    }}
                  >
                    <div className="ant-upload-icon">
                      <CloudUploadOutlined />
                    </div>
                    <div className="ant-upload-text">单击或拖动文件到此区域进行上传</div>
                  </ProFormUploadDragger>
                </div>
              </ProCard>
            )}
            {/* 视频 */}
            {!isEmpty(currentObject) && currentObject.data.type == 'video' && (
              <ProCard
                title={
                  <div className="card-title">
                    <IconFont
                      type="icon-device"
                      style={{ verticalAlign: 'middle', marginTop: '-4px', marginRight: '13px' }}
                    />
                    视频
                  </div>
                }
                extra={
                  <ProFormSwitch
                    initialValue={false}
                    name="videoShow"
                    noStyle
                    checkedChildren={'预览'}
                    unCheckedChildren={'隐藏'}
                  />
                }
                ghost
              >
                <div className="card-form">
                  <ProFormUploadDragger
                    name="videoFile"
                    label=""
                    fieldProps={{
                      iconRender: () => {
                        return <></>;
                      },
                      maxCount: 1,
                    }}
                  >
                    <div className="ant-upload-icon">
                      <CloudUploadOutlined />
                    </div>
                    <div className="ant-upload-text">单击或拖动文件到此区域进行上传</div>
                  </ProFormUploadDragger>
                </div>
              </ProCard>
            )}
          </div>
          <div className={`form ${mode == 'high' ? 'show' : ''}`}>
            <ProCard title={<div className="card-title">标题</div>} ghost>
              <div className="card-form">
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
            </ProCard>
            <ProCard title={<div className="card-title">图标</div>} ghost>
              <div className="card-form">
                <ProFormSlider
                  name="width"
                  label="宽度"
                  min={1}
                  max={400}
                  marks={{
                    1: '1',
                    400: '400',
                  }}
                  step={0.01}
                />
                <ProFormSlider
                  name="height"
                  label="高度"
                  min={1}
                  max={400}
                  step={0.01}
                  marks={{
                    1: '1',
                    400: '400',
                  }}
                />
                <ProFormItem label="位置X" name={['position', 'x']}>
                  <IntegerStep />
                </ProFormItem>
                <ProFormItem label="位置Y" name={['position', 'y']}>
                  <IntegerStep />
                </ProFormItem>
                <ProFormItem label="位置Z" name={['position', 'z']}>
                  <IntegerStep />
                </ProFormItem>
                <ProFormItem label="旋转X" name={['rotation', '_x']}>
                  <IntegerStep />
                </ProFormItem>
                <ProFormItem label="旋转Y" name={['rotation', '_y']}>
                  <IntegerStep />
                </ProFormItem>
                <ProFormItem label="旋转Z" name={['rotation', '_z']}>
                  <IntegerStep />
                </ProFormItem>
              </div>
            </ProCard>
          </div>
          <div className={`form ${mode == 'task' ? 'show' : ''}`}>
            <ProCard title={<div className="card-title">任务</div>} ghost>
              <div className="card-form">
                <Segmented block options={['日', '周', '月', '季度', '年']} />
                <ProFormItem label="" name="task">
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      <Col span={24}>
                        <Checkbox value={1}>
                          <span className="taskName">
                            保持机房、实验室、监测用房《监控箱》的清洁，保持设备的清洁。
                          </span>
                        </Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value={2}>
                          <span className="taskName">
                            对电源控制器、空调等辅助设备要进行经常性检查
                          </span>
                        </Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </ProFormItem>
              </div>
            </ProCard>
          </div>
        </ProForm>
        {/* 设备绑定 */}
        <div className={`form ${mode == 'device' ? 'show' : ''}`}>
          <Bind ref={bindRef} />
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-top">
          <Button type="primary" ghost onClick={handleSave} className="btn">
            保存
          </Button>
          <Popconfirm title="是否删除该项！" okText="是" cancelText="否" onConfirm={handleDelete}>
            <Button ghost danger className="btn">
              删除
            </Button>
          </Popconfirm>
        </div>
        <Button ghost block onClick={handleCancelSelect} className="btn cancel-btn">
          取消
        </Button>
      </div>
    </div>
  );
};
export default HostTagPanel;
