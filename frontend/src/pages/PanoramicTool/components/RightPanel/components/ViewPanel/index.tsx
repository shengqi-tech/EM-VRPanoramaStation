import {
  ProCard,
  ProFormSwitch,
  ProForm,
  ProFormTextArea,
  ProFormSelect,
  ProFormSlider,
  ProFormItem,
} from '@ant-design/pro-components';
import { useModel } from 'umi';
import { Slider, Button, message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useState, useRef, useEffect } from 'react';
import InputSlider from '@/components/InputSlider';
import { updatePanorama } from '@/services/swagger/panoramaController';
import './index.less';
const ViewPanel = () => {
  const { panoramaData, threeImgData } = useModel('PanoramicTool.panoramaData', (ret) => ({
    panoramaData: ret.panoramaData,
    threeImgData: ret.threeImgData,
  }));
  const { panorama } = useModel('PanoramicTool.label', (ret) => ({
    panorama: ret.panorama,
  }));
  const formRef = useRef<ProFormInstance>();
  /**
   * 表单改变标签实体样式
   * @param changeValues
   * @param values
   */
  const changeValues = (changeValues: any, values: any) => {
    panorama.changeCameraParams(values);
  };

  /**
   * 保存
   */
  const handleSave = () => {
    let values = formRef.current?.getFieldsValue();
    updatePanorama({
      ems_panorama_id: panoramaData?.ems_panorama_id,
      ems_panorama_fov: JSON.stringify(values),
    }).then((res) => {
      if (res?.code == 200) {
        message.success('保存成功！');
      }
    });
  };

  useEffect(() => {
    if (panoramaData) {
      if (panoramaData.ems_panorama_fov) {
        let values = JSON.parse(panoramaData.ems_panorama_fov);
        formRef?.current?.setFieldsValue(values);
        panorama.changeCameraParams(values);
      } else {
        formRef?.current?.resetFields();
      }
    } else {
      formRef?.current?.resetFields();
    }
  }, [panoramaData]);

  return (
    <div className="ViewPanel">
      <div className="title">视角</div>
      <div className="content">
        <ProForm
          formRef={formRef}
          onValuesChange={changeValues}
          colon={false}
          labelAlign="left"
          labelCol={{ span: 6 }}
          layout="horizontal"
          submitter={false}
        >
          <div className={`form`}>
            <ProCard title={<div className="card-title">初始视角</div>} ghost>
              <div className="card-form">
                <div className="viewCanvas">
                  <img src={threeImgData} alt="" />
                </div>
              </div>
            </ProCard>
            <ProCard title={<div className="card-title">视场角（FOV）范围</div>} ghost>
              <div className="card-form">
                <ProFormItem name="fovs" initialValue={[10, 50]}>
                  <InputSlider
                    leftLabel="最近"
                    rightLabel="最远"
                    min={0.1}
                    max={100}
                    step={0.1}
                    marks={{
                      10: '10',
                      50: '50',
                    }}
                    defaultValue={[10, 50]}
                  />
                </ProFormItem>
              </div>
            </ProCard>
            <ProCard title={<div className="card-title">视角限制</div>} ghost>
              <div className="card-form">
                <div className="formTitle">水平视角限制</div>
                <ProFormItem name="azimuthAngle" initialValue={[-180, 180]}>
                  <InputSlider
                    leftLabel="最左"
                    rightLabel="最右"
                    min={-180}
                    max={180}
                    defaultValue={[-180, 180]}
                  />
                </ProFormItem>
                <div className="formTitle">垂直视角限制</div>
                <ProFormItem name="polarAngle" initialValue={[-90, 90]}>
                  <InputSlider
                    leftLabel="最左"
                    rightLabel="最右"
                    min={-90}
                    max={90}
                    defaultValue={[-90, 90]}
                  />
                </ProFormItem>
              </div>
            </ProCard>
          </div>
        </ProForm>
      </div>
      <div className="bottom">
        <div className="bottom-top">
          <Button type="primary" ghost onClick={handleSave} className="btn">
            保存
          </Button>
        </div>
        <Button ghost block onClick={() => {}} className="btn btn-cancel">
          取消
        </Button>
      </div>
    </div>
  );
};
export default ViewPanel;
