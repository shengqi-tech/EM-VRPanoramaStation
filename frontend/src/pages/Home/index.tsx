import React, { useEffect } from 'react';
import { useModel } from 'umi';
import * as Cesium from 'cesium';
import { findInstanceByMap } from '@/services/swagger/instanceController';
import 'cesiumCss/Widgets/widgets.css';
import './index.less';

const Home = () => {
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  useEffect(() => {
    window.CESIUM_BASE_URL = '/';
    const viewer = new Cesium.Viewer('cesiumContainer', {
      skyBox: new Cesium.SkyBox({
        sources: {
          positiveX: require('@/assets/images/cesium/sky/tycho2t3_80_px.jpg'),
          negativeX: require('@/assets/images/cesium/sky/tycho2t3_80_mx.jpg'),
          positiveY: require('@/assets/images/cesium/sky/tycho2t3_80_py.jpg'),
          negativeY: require('@/assets/images/cesium/sky/tycho2t3_80_my.jpg'),
          positiveZ: require('@/assets/images/cesium/sky/tycho2t3_80_pz.jpg'),
          negativeZ: require('@/assets/images/cesium/sky/tycho2t3_80_mz.jpg'),
        },
        show: true,
      }), //天空盒子
      selectionIndicator: false,
      animation: false,
      baseLayerPicker: false,
      geocoder: false,
      timeline: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      fullscreenButton: false,
      homeButton: false,
      imageryProvider: new Cesium.SingleTileImageryProvider({
        url: require('@/assets/images/cesium/worldimage.jpg'),
      }),
    });

    // 创建天地图影像服务提供商
    var tdtImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.com/img_w/wmts?&style=default&format=tiles&tk=e88eab6ab9d0725f5fb9a028d2deee96', // 天地图影像服务URL
      layer: 'img',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'w',
      maximumLevel: 18,
    });

    // 将天地图影像服务添加到Cesium Viewer中
    viewer.imageryLayers.addImageryProvider(tdtImageryProvider);

    viewer.bottomContainer.style.display = 'none'; //隐藏图标
    viewer.scene.globe.depthTestAgainstTerrain = true;
    //取消双击事件
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    );
    //屏蔽右键
    document.oncontextmenu = new Function('return false;');
    //设置鼠标操作习惯 倾斜视图
    viewer.scene.screenSpaceCameraController.tiltEventTypes = [
      Cesium.CameraEventType.RIGHT_DRAG,
      Cesium.CameraEventType.PINCH,
      {
        eventType: Cesium.CameraEventType.LEFT_DRAG,
        modifier: Cesium.KeyboardEventModifier.CTRL,
      },
      {
        eventType: Cesium.CameraEventType.RIGHT_DRAG,
        modifier: Cesium.KeyboardEventModifier.CTRL,
      },
    ];
    viewer.scene.screenSpaceCameraController.zoomEventTypes = [
      Cesium.CameraEventType.MIDDLE_DRAG,
      Cesium.CameraEventType.WHEEL,
      Cesium.CameraEventType.PINCH,
    ];

    const flyToOpts = {
      destination: Cesium.Cartesian3.fromDegrees(120.49101, 30.76126, 1000),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-90),
        roll: Cesium.Math.toRadians(0),
      },
      duration: 3,
    };
    viewer.scene.camera.flyTo(flyToOpts);

    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement) => {
      let pickedObject = viewer.scene.pick(movement.position); //判断是否拾取到模型
      if (viewer.scene.pickPositionSupported && Cesium.defined(pickedObject)) {
        const cartesian = viewer.scene.pickPosition(movement.position);
        console.log(cartesian);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    findInstanceByMap({}).then((res) => {
      const list = res.result?.list;
      list?.forEach((item: any) => {
        let coordinateString = item.ems_instance_coordinate;
        const coordinates = coordinateString
          .replace('POINT(', '') // 去除 "POINT("
          .replace(')', '') // 去除 ")"
          .split(' '); // 将字符串分割成数组
        const result = coordinates.map(parseFloat);

        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(result[0], result[1], 13),
          model: {
            uri: require('@/assets/model/glb/监测子站.glb'),
            scale: 0.01,
          },
        });

        //
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(result[0], result[1], 30),
          label: {
            text: item.ems_instance_name, // 设置标签文本为模型名称
            font: '14px sans-serif',
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -20),
          },
        });
      });
    });
    return () => {
      viewer.entities.removeAll();
    };
  }, []);
  return <div id="cesiumContainer" className={isMobile ? 'mobile' : ''} />;
};
export default Home;
