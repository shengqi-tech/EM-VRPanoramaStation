import { useEffect, useState, useRef } from 'react';
import { useParams, useModel } from 'umi';
import { Viewer, Panorama } from '@/utils/three/xThree';
import { findPanoramaByMap, getPanoramaView } from '@/services/swagger/panoramaController';
import './index.less';
let panorama: any;
let isPanoramaInitialized = false;
const PanoramaCanvas = () => {
  const params: any = useParams();
  const { instanceId } = params;

  const { setCommonBind } = useModel('Panorama.device', (ret) => ({
    setCommonBind: ret.setCommonBind,
  }));

  const {
    toPanoramaId,
    setPanoramaData,
    setAllPanoramas,
    allPanoramas,
    setIsTaskShow,
    setDataModalType,
    panoramaData,
  } = useModel('Panorama.data', (ret) => ({
    panoramaData: ret.panoramaData,
    toPanoramaId: ret.toPanoramaId,
    setPanoramaData: ret.setPanoramaData,
    setAllPanoramas: ret.setAllPanoramas,
    allPanoramas: ret.allPanoramas,
    setIsTaskShow: ret.setIsTaskShow,
    setDataModalType: ret.setDataModalType,
  }));

  const { refreshObjects } = useModel('Panorama.object');

  const toPanorama = async (panoramaId: any) => {
    const { result } = await getPanoramaView({ ems_panorama_id: panoramaId });
    const panoramaData = result;
    if (panoramaData) {
      setPanoramaData(panoramaData);
      let cameraPosition = JSON.parse(panoramaData?.ems_panorama_initview || '0'); // 相机初始坐标
      if (panoramaData.ems_panorama_fov) {
        let values = JSON.parse(panoramaData.ems_panorama_fov);
        panorama.changeCameraParams(values);
      }
      panorama.initView(cameraPosition);
      let panoramaImgs = getPanoramaImgs(panoramaData?.ems_panorama_slicefiles);
      panorama.setPanoramaImg(panoramaImgs);
      refreshObjects(panorama, panoramaData);

      if (!isPanoramaInitialized) {
        panorama.init();
        isPanoramaInitialized = true;
      }
    }
    return result;
  };

  const getPanoramaImgs = (files) => {
    let panoramaImgs = new Map();
    files?.forEach((item: API.Sysfile) => {
      let path = `/systemfile${item.ems_sysfile_path}`;
      let type = item.ems_sysfile_name;
      panoramaImgs.set(type, path);
    });
    return panoramaImgs;
  };

  /**
   * 全景点击实体触发事件
   * @param list
   * @param panoramaData
   */
  const handleClickMesh = (list, panoramaData) => {
    panorama.cancelClickSelected();
    panorama.handleClickSelected((object: any) => {
      if (object && object.data) {
        const { type, form, id } = object.data;
        // 判断点击导航
        if (type === 'navigation') {
          const toPanoramaId = form.toPanoramaId;
          list?.forEach((item: any) => {
            if (item.ems_panorama_id === toPanoramaId) {
              const panoramaImgs = getPanoramaImgs(item?.ems_panorama_slicefiles);
              panorama.setToPanoramaImg(panoramaImgs);
              panorama.changeScene();
              toPanorama(toPanoramaId);
            }
          });
        } else if (type === 'hotspot') {
          // 展示模版
          if (form.bindJsonData) {
            const json = JSON.parse(form.bindJsonData);
            const { template } = json;
            if (template) {
              setDataModalType(template);
              const dataType = json?.form?.dataType; // 0：标况 ; 1：工况
              if (dataType == 1) {
                const properties = panoramaData?.ems_panorama_commonvos?.find((item) => {
                  return item.ems_common_id === id;
                })?.ems_common_properties;
                setCommonBind({ type: 1, bind: properties });
              } else {
                const currentDevice = panoramaData?.ems_panorama_commonvos?.find((item) => {
                  return item.ems_common_id === id;
                }).ems_common_devices;
                setCommonBind({ type: 0, bind: currentDevice });
              }
            }
            return;
          }
          // // 运维任务
          if (form.task?.length > 0) {
            setIsTaskShow(true);
            return;
          }
        }
      }
    });
  };

  /**
   * 初始化全景
   */
  const initPanorama = () => {
    // 查询所有全景
    findPanoramaByMap({
      ems_panorama_instanceid: instanceId,
    }).then(async (res) => {
      const list = res?.result?.list || [];
      setAllPanoramas(list);
      let panoramaId: any = list[0]?.ems_panorama_id;
      list?.forEach((item: API.PanoramaVo, index) => {
        if (item.ems_panorama_default === 1) {
          panoramaId = item.ems_panorama_id;
        }
      });
      // 初次加载全景
      toPanorama(panoramaId);
    });
  };

  /**
   * 监听全景图详情数据切换，刷新热点相关数据提供给点击事件。
   */
  useEffect(() => {
    if (allPanoramas.length > 0 && panoramaData && panorama) {
      handleClickMesh(allPanoramas, panoramaData);
    }
  }, [allPanoramas, panoramaData]);

  /**
   * 监听切换全景
   */
  useEffect(() => {
    if (toPanoramaId) {
      allPanoramas?.forEach((item: any) => {
        if (item.ems_panorama_id === toPanoramaId) {
          const panoramaImgs = getPanoramaImgs(item?.ems_panorama_slicefiles);
          panorama.setToPanoramaImg(panoramaImgs);
          panorama.changeScene();
          toPanorama(toPanoramaId);
        }
      });
    }
  }, [toPanoramaId]);

  // 初始化
  useEffect(() => {
    let viewer: any;
    viewer = new Viewer({
      domId: 'panoramaCanvas',
    });
    viewer.viewHelper.visible = false;
    panorama = new Panorama(viewer);
    window.viewer = viewer;
    window.panorama = panorama;
    initPanorama();
    return () => {
      panorama?.dispose();
    };
  }, []);

  return <div id="panoramaCanvas"></div>;
};
export default PanoramaCanvas;
