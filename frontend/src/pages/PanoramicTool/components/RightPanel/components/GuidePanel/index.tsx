import { useState, useRef, useEffect } from 'react';
import { useModel, useParams } from 'umi';
import html2canvas from 'html2canvas';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormSlider,
  ProFormTextArea,
  ProFormItem,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Button, Segmented, Popconfirm, Tooltip, Switch, Tag, Slider, message } from 'antd';
import { Model, Camera } from '@/utils/three/xThree';
import {
  createFromIconfontCN,
  InfoCircleOutlined,
  ReadOutlined,
  VideoCameraOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { switchEffectOptions, guideModeOptions } from '../../const';
import {
  insertGuide,
  uploadGuideFile,
  deleteGuide,
  updateGuide,
} from '@/services/swagger/guideController';
import './index.less';
let model: any;
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const GuidePanel = () => {
  const { panorama, currentObject, selectObject } = useModel('PanoramicTool.label', (ret) => ({
    panorama: ret.panorama,
    currentObject: ret.currentObject,
    selectObject: ret.selectObject,
  }));
  const {
    timeLineShow,
    setTimeLineShow,
    addPoint,
    currentPoint,
    points,
    setPoints,
    setCurrentPoint,
    getGuidePointlist,
    currentGuidePoint,
    setCurrentGuidePoint,
  } = useModel('PanoramicTool.timeLine');

  const params: any = useParams();
  const { instanceId, id } = params;
  const formRef = useRef<ProFormInstance>();
  const [rotationType, setRotationType] = useState(1);
  const [fov, setFov] = useState(50);
  const [mode, setMode] = useState<number | string>('base');

  /**
   * 表单改变标签实体样式
   * @param changeValues
   * @param values
   */
  const changeValues = async (changeValues: any, values: any) => {
    setRotationType(values.rotationType);
  };

  /**
   * 基础 / 高级
   * @param mode
   */
  const changeMode = (mode: string | number) => {
    setMode(mode);
  };

  /**
   * 高级数字人模型
   * @param value
   */
  const showModel = (value) => {
    if (value) {
      model = new Model(window.viewer);
    } else {
      if (model) model.remove();
    }
  };

  /**
   * 添加新节点
   */
  const handleAddPoint = () => {
    if (currentObject.data) {
      addPoint({
        tagId: currentObject.data.id,
        data: currentObject.data,
        name: currentObject.data.form.text,
        fov: fov,
        position: currentObject.position,
      });
      selectObject({});
    }
    if (currentPoint.id) {
      let newPoints = points.map((item) => {
        if (item.id == currentPoint.id) {
          item.fov = fov;
        }
        return item;
      });
      setPoints([...newPoints]);
      setCurrentPoint({});
    }
  };

  /**
   * 删除节点
   */
  const handleDeletePoint = () => {
    if (currentPoint.id) {
      let newPoints: any = [];
      points.forEach((item) => {
        if (item.id == currentPoint.id) {
        } else {
          newPoints.push(item);
        }
        return item;
      });
      setPoints(newPoints);
      setCurrentPoint({});
    }
  };

  /**
   * 取消新节点
   */
  const handleCanclPoint = () => {
    selectObject({});
    setCurrentPoint({});
  };

  const preView = () => {
    // let formValues = formRef.current?.getFieldsValue();
    // let { speed, rotationType, angel } = formValues;
    // Common.setViewAnimation({
    //   autoRotate: true,
    //   autoRotateSpeed: speed * rotationType,
    //   angel: angel,
    // });
  };

  /**
   * Base64字符串转File文件
   * @param {String} dataurl Base64字符串(字符串包含Data URI scheme，例如：data:image/png;base64, )
   * @param {String} filename 文件名称
   */
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime,
    });
  };

  /**
   * 保存导览点位
   */
  const save = () => {
    let values = formRef.current?.getFieldsValue();
    // 数据过长会导致保存不成功，减少bindData和form
    const newPoints = points?.map((item) => {
      item.data.bindData = null;
      if (item.data.form) {
        item.data.form.bindJsonData = null;
      }
      return item;
    });
    let jsondata = JSON.stringify({
      ...values,
      points: newPoints,
    });
    const element: any = document.getElementById('canvasBox'); // 替换成你要截图的元素的ID
    window.viewer.renderer.render(window.viewer.scene, window.viewer.camera);
    html2canvas(element).then(async (canvas) => {
      const image = canvas.toDataURL(); // 获取截图的Base64数据
      const file = dataURLtoFile(image, 'cover');
      const res = await uploadGuideFile({ file: file });
      const coverFile = res.result;
      const lookpointList = points?.map((item) => {
        return {
          ems_lookpoint_fov: item.fov,
          ems_lookpoint_hotspotid: item.data.id,
          ems_lookpoint_hotspottype: item.data.type,
        };
      });
      let response: any;
      if (currentGuidePoint && currentGuidePoint.id) {
        response = await updateGuide({
          ems_guide_id: currentGuidePoint.id,
          ems_guide_coverfile: coverFile,
          ems_guide_instanceid: instanceId,
          ems_guide_intr: values.des,
          ems_guide_name: values.name,
          ems_guide_jsondata: jsondata,
          ems_guide_panoramaid: id,
          lookpointList: lookpointList,
        });
      } else {
        response = await insertGuide({
          ems_guide_coverfile: coverFile,
          ems_guide_instanceid: instanceId,
          ems_guide_intr: values.des,
          ems_guide_name: values.name,
          ems_guide_jsondata: jsondata,
          ems_guide_panoramaid: id,
          lookpointList: lookpointList,
        });
      }

      message.success(response.message);
      getGuidePointlist(instanceId);
      cancel();
    });
  };

  /**
   * 取消导览点位
   */
  const cancel = () => {
    formRef?.current?.resetFields();
    setRotationType(1);
    setPoints([]);
    setCurrentGuidePoint({});
  };

  /**
   * 删除导览点位
   */
  const handleDelete = () => {
    if (currentGuidePoint && currentGuidePoint.id) {
      deleteGuide({ ems_guide_id: currentGuidePoint.id }).then((res) => {
        message.success(res.message);
        getGuidePointlist(instanceId);
        cancel();
      });
    } else {
      message.info('请选择一项导览点删除！');
    }
  };

  /**
   * 监听当前导览点位
   */
  useEffect(() => {
    setCurrentPoint({});
    selectObject({});
    if (currentGuidePoint && currentGuidePoint.id) {
      let jsonData = JSON.parse(currentGuidePoint.jsonData);
      formRef?.current?.setFieldsValue(jsonData);
      setRotationType(jsonData.rotationType);
      setPoints(jsonData.points);
    } else {
      formRef?.current?.resetFields();
      setRotationType(1);
      setPoints([]);
    }
  }, [currentGuidePoint]);

  /**
   * 监听点击当前节点
   */
  useEffect(() => {
    if (currentPoint.id) {
      setFov(currentPoint.fov);
      Camera.setCameraFov(currentPoint.fov);
    }
  }, [currentPoint]);

  /**
   * 监听自定义编辑导览
   */
  useEffect(() => {
    if (rotationType == 2) {
      // 开启编辑
      setTimeLineShow(true);
      panorama.handleClickSelected((object: any) => {
        selectObject({ ...object });
        setCurrentPoint({});
        setFov(50);
        Camera.flyTo({
          position: object.position,
        });
      });
    } else {
      // 结束编辑
      setTimeLineShow(false);
      if (panorama) panorama.cancelClickSelected();
      selectObject({});
    }
  }, [rotationType]);

  useEffect(() => {
    return () => {
      setCurrentGuidePoint({});
      setTimeLineShow(false);
      if (model) {
        model.remove();
      }
      if (panorama) {
        panorama.cancelClickSelected();
        selectObject({});
      }
    };
  }, []);

  return (
    <div className="GuidePanel">
      <div className="title">导览设置</div>
      <div className="content">
        <div className="mode">
          <Segmented
            block
            className="ant-segmented-gray"
            onChange={changeMode}
            options={guideModeOptions}
          />
        </div>
        <ProForm
          formRef={formRef}
          onValuesChange={changeValues}
          colon={false}
          labelAlign="left"
          labelCol={{ span: 6 }}
          layout="horizontal"
          submitter={false}
        >
          <div className={`form ${mode == 'base' ? 'show' : ''}`}>
            <ProCard
              title={
                <div className="card-title">
                  <InfoCircleOutlined />
                  基本信息
                </div>
              }
              ghost
            >
              <div className="card-form">
                <ProFormText
                  labelCol={{ span: 4 }}
                  name="name"
                  label="名称"
                  placeholder="请输入名称"
                />
              </div>
            </ProCard>
            <ProCard
              title={
                <div className="card-title">
                  <ReadOutlined />
                  介绍
                </div>
              }
              ghost
            >
              <div className="card-form">
                <ProFormTextArea
                  labelCol={{ span: 4 }}
                  name="des"
                  label="内容"
                  className="inputText"
                  initialValue=""
                />
              </div>
            </ProCard>
            <ProCard
              title={
                <div className="card-title">
                  <IconFont type="icon-bim_donghua" /> 场景切换
                </div>
              }
              ghost
            >
              <div className="card-form">
                <ProFormSelect
                  name="effectType"
                  label=""
                  initialValue={0}
                  options={switchEffectOptions}
                />
              </div>
            </ProCard>
            <ProCard
              title={
                <div className="card-title">
                  <VideoCameraOutlined /> 导览方式
                </div>
              }
              extra={
                <Button size="small" type="primary" onClick={preView}>
                  预览
                </Button>
              }
              ghost
            >
              <div className="card-form">
                <ProFormItem label="" name="rotationType" initialValue={-1}>
                  <Segmented
                    block
                    style={{ marginBottom: '10px' }}
                    className="ant-segmented-gray"
                    options={[
                      {
                        value: -1,
                        icon: (
                          <Tooltip placement="top" title="向左旋转">
                            <ArrowLeftOutlined />
                          </Tooltip>
                        ),
                      },
                      {
                        value: 1,
                        icon: (
                          <Tooltip placement="top" title="向右旋转">
                            <ArrowRightOutlined />
                          </Tooltip>
                        ),
                      },
                      {
                        value: 2,
                        icon: (
                          <Tooltip placement="top" title="自定义">
                            <FormOutlined />
                          </Tooltip>
                        ),
                      },
                    ]}
                  />
                </ProFormItem>
                {rotationType == -1 || rotationType == 1 ? (
                  <>
                    <ProFormSlider
                      initialValue={90}
                      name="angel"
                      label="旋转角度"
                      min={0}
                      max={180}
                      step={0.01}
                      marks={{
                        0: '0°',
                        180: '180°',
                      }}
                    />
                    <ProFormSlider
                      name="speed"
                      label="旋转速度"
                      initialValue={0.5}
                      min={0.1}
                      max={1}
                      step={0.01}
                      marks={{
                        0.1: '慢',
                        0.5: '中',
                        1: '快',
                      }}
                    />
                  </>
                ) : (
                  <div className="edit">
                    {/* <div>请在全景图中选中热点标签添加导览节点！</div> */}
                    {/* <Button block onClick={handleShow} ghost className="editBtn">
                      {timeLineShow ? '结束编辑' : '开启编辑'}
                    </Button> */}
                    {timeLineShow && (currentObject.data || currentPoint.id) ? (
                      <div className="editPlane">
                        <div className="editPlaneTitle">
                          {currentPoint.id ? '编辑看点' : '新增看点'}
                        </div>
                        <div className="pointName">
                          <div className="pointLabel">名称:</div>
                          <Tag color="#108ee9" className="pointTilte">
                            {currentObject.data?.form.text || currentPoint.name}
                          </Tag>
                        </div>
                        <div className="fov">
                          <div className="fovLabel">Fov:</div>
                          <Slider
                            value={fov}
                            onChange={(value) => {
                              Camera.setCameraFov(value);
                              setFov(value);
                            }}
                            defaultValue={50}
                            min={0.1}
                            max={100}
                            marks={{
                              10: '10',
                              50: '50',
                            }}
                            step={0.01}
                          />
                        </div>

                        <div className="editBottom">
                          <Button
                            type="primary"
                            ghost
                            className="editBottomBtn"
                            onClick={handleAddPoint}
                          >
                            保存
                          </Button>
                          {currentPoint.id ? (
                            <Button
                              style={{ margin: '0 5px' }}
                              ghost
                              danger
                              className="editBottomBtn"
                              onClick={handleDeletePoint}
                            >
                              删除
                            </Button>
                          ) : null}

                          <Button ghost className="editBottomBtn" onClick={handleCanclPoint}>
                            取消
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="editPlane-list">
                        <div className="editPlaneTitle">看点列表</div>
                        <div className="editPlaneContent">
                          {points.map((item) => {
                            return (
                              <Tag
                                key={item.id}
                                onClick={() => {
                                  selectObject({});
                                  setCurrentPoint(item);
                                  Camera.flyTo({
                                    fov: item.fov,
                                    position: item.position,
                                  });
                                }}
                                color="#108ee9"
                                className="pointTilte"
                              >
                                {item.name}
                              </Tag>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ProCard>
          </div>
          <div className={`form ${mode == 'high' ? 'show' : ''}`}>
            <ProCard
              title={
                <div className="card-title">
                  <InfoCircleOutlined />
                  数字人
                </div>
              }
              ghost
              extra={<Switch checkedChildren="开启" unCheckedChildren="关闭" onClick={showModel} />}
            >
              <div className="card-form">
                {/* <ProFormSwitch
                  labelCol={{ span: 20 }}
                  initialValue={false}
                  label="显示"
                  name="robotShow"
                /> */}
              </div>
            </ProCard>
          </div>
        </ProForm>
      </div>
      <div className="bottom">
        <div className="bottom-top">
          <Button type="primary" ghost className="btn" onClick={save}>
            保存
          </Button>
          <Popconfirm title="是否删除该项！" okText="是" cancelText="否" onConfirm={handleDelete}>
            <Button ghost danger className="btn">
              删除
            </Button>
          </Popconfirm>
        </div>
        <Button ghost block className="btn cancel-btn" onClick={cancel}>
          取消
        </Button>
      </div>
    </div>
  );
};
export default GuidePanel;
