import { useEffect, useState, useRef } from 'react';
import { Viewer, Panorama, Common } from '@/utils/three/xThree';
import { useModel, useParams } from 'umi';
import { uniqueId } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import styles from './index.less';
import Drag from '@/utils/drag';
let panorama: any;
const CenterPanel = () => {
  const [panoramaId, setPanoramaId] = useState<number | undefined>();
  const { panoramaData, setThreeImgData } = useModel('PanoramicTool.panoramaData', (ret) => ({
    panoramaData: ret.panoramaData,
    setThreeImgData: ret.setThreeImgData,
  }));
  const { menuId } = useModel('PanoramicTool.func', (ret) => ({
    menuId: ret.menuId,
  }));
  const {
    setPanorama,
    currentLabel,
    setCurrentLabel,
    addObject,
    addLabel,
    setLabels,
    currentLabelPos,
    setCurrentLabelPos,
    selectObject,
    refreshObjects,
    currentObject,
  } = useModel('PanoramicTool.label');

  // 标签监听
  useEffect(() => {
    if (!isEmpty(currentLabel) && !isEmpty(currentLabelPos)) {
      const id = uniqueId();
      let data = {
        id: id,
        pid: currentLabel?.ems_tagtype_pid,
        typeId: currentLabel.ems_tagtype_id,
        panoramaId: panoramaData?.ems_panorama_id,
        name: currentLabel.ems_tagtype_name,
        type: currentLabel.ems_tagtype_type,
        url: `/systemfile${currentLabel.ems_tagtype_iconfile?.ems_sysfile_path}`,
        imgType: currentLabel.ems_tagtype_iconfile?.ems_sysfile_type,
      };
      addLabel(data);
      let object = addObject(data, currentLabelPos);
      selectObject(object);
      setCurrentLabelPos({});
      setCurrentLabel({});
    }
  }, [currentLabel, currentLabelPos]);

  // 全景监听切换
  useEffect(() => {
    if (panoramaData) {
      setPanoramaId(panoramaData.ems_panorama_id);
      if (panoramaData.ems_panorama_id !== panoramaId) {
        let cameraPosition = JSON.parse(panoramaData?.ems_panorama_initview || '0'); // 相机初始坐标
        let imgs = panoramaData?.ems_panorama_slicefiles;
        let panoramaImgs = new Map();
        imgs?.forEach((item: API.Sysfile) => {
          let path = `/systemfile${item.ems_sysfile_path}`;
          let type = item.ems_sysfile_name;
          panoramaImgs.set(type, path);
        });
        panorama.dispose();
        panorama.setPanoramaImg(panoramaImgs);
        panorama.init();
        panorama.initView(cameraPosition);

        let loading = panorama.getLoadingManager();
        loading.onLoad = () => {
          let timer = setTimeout(() => {
            let imgData = Common.getThreeCanvasImgData(window.viewer);
            setThreeImgData(imgData);
            clearTimeout(timer);
          }, 200);
        };
      }
      if (menuId == 3) {
        refreshObjects(panoramaData);
        // 拖拽控制
        panorama.initDragControl((object: any) => {
          selectObject({ ...object });
        });
      } else if (menuId == 4) {
        panorama.disposeDragControl();
        refreshObjects(panoramaData);
      } else {
        panorama.disposeDragControl();
        panorama.removeAll();
      }
      setPanorama(panorama);
    }
  }, [panoramaData, menuId]);

  // 初始化
  useEffect(() => {
    let viewer: any;
    viewer = new Viewer({
      domId: 'threeCanvasBox',
    });
    window.viewer = viewer;
    panorama = new Panorama(viewer);
    // 拖拽到画布内
    let drag = new Drag('threeCanvasBox');
    drag.drop((offsetX: number, offsetY: number) => {
      let position = Common.getPointByScreen(viewer, offsetX, offsetY);
      setCurrentLabelPos(position);
    });
    setPanorama(panorama);
    return () => {
      panorama?.dispose();
      drag.remove();
      setLabels([]);
    };
  }, []);
  return <div id="threeCanvasBox" className={styles.threeCanvasBox}></div>;
};
export default CenterPanel;
