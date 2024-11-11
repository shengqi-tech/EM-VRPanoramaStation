import { useEffect } from 'react';
import {
  UpOutlined,
  LeftOutlined,
  RightOutlined,
  DownOutlined,
  AimOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import { Camera } from '@/utils/three/xThree';
import './index.less';
import TWEEN from '@tweenjs/tween.js';

const OperateDirection = () => {
  let timer: any;
  let tween: any;
  let num = 0.001;
  const { panoramaData } = useModel('Panorama.data', (ret) => ({
    panoramaData: ret.panoramaData,
  }));
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
      if (tween) {
        tween.stop();
      }
    };
  }, []);

  const changeView = (translateType, step, viewer = window.viewer) => {
    const startStep = step;
    const endStep = 0;
    const duration = 200; // 惯性移动的时长，单位为毫秒

    tween = new TWEEN.Tween({ step: startStep })
      .to({ step: endStep }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        viewer.camera[translateType](tween._object.step);
      })
      .start();
  };

  return (
    <div className="opts">
      <UpOutlined
        className="btn btn-up"
        onMouseDown={() => {
          changeView('translateY', -num);
          timer = setInterval(function () {
            changeView('translateY', -num);
          }, 16);
        }}
        onMouseUp={() => {
          clearInterval(timer);
          if (tween) {
            tween.stop();
          }
        }}
        onTouchStart={() => {
          changeView('translateY', -num);
          timer = setInterval(function () {
            changeView('translateY', -num);
          }, 16);
        }}
        onTouchEnd={() => {
          clearInterval(timer);
          if (tween) {
            tween.stop();
          }
        }}
      />
      <RightOutlined
        className="btn btn-right"
        onMouseDown={() => {
          changeView('translateX', -num);
          timer = setInterval(function () {
            changeView('translateX', -num);
          }, 16);
        }}
        onMouseUp={() => {
          clearInterval(timer);
          if (tween) {
            tween.stop();
          }
        }}
        onTouchStart={() => {
          changeView('translateX', -num);
          timer = setInterval(function () {
            changeView('translateX', -num);
          }, 16);
        }}
        onTouchEnd={() => {
          clearInterval(timer);
          if (tween) {
            tween.stop();
          }
        }}
      />
      <DownOutlined
        rev=""
        className="btn btn-down"
        onMouseDown={() => {
          changeView('translateY', num);
          timer = setInterval(function () {
            changeView('translateY', num);
          }, 16);
        }}
        onMouseUp={() => {
          clearInterval(timer);
          if (tween) {
            tween.stop();
          }
        }}
        onTouchStart={() => {
          changeView('translateY', num);
          timer = setInterval(function () {
            changeView('translateY', num);
          }, 16);
        }}
        onTouchEnd={() => {
          clearInterval(timer);
          if (tween) {
            tween.stop();
          }
        }}
      />
      <LeftOutlined
        rev=""
        className="btn btn-left"
        onMouseDown={() => {
          changeView('translateX', num);
          timer = setInterval(function () {
            changeView('translateX', num);
          }, 16);
        }}
        onMouseUp={() => {
          clearInterval(timer);
          if (tween) {
            tween.stop();
          }
        }}
        onTouchStart={() => {
          changeView('translateX', num);
          timer = setInterval(function () {
            changeView('translateX', num);
          }, 16);
        }}
        onTouchEnd={() => {
          clearInterval(timer);
          if (tween) {
            tween.stop();
          }
        }}
      />
      <div
        className="center"
        onClick={() => {
          if (timer) {
            clearInterval(timer);
          }
          let cameraPosition = JSON.parse(panoramaData?.ems_panorama_initview || '0'); // 相机初始坐标
          Camera.resetCamera(cameraPosition, 50);
        }}
      >
        <AimOutlined className="btn" />
      </div>
    </div>
  );
};

export default OperateDirection;
