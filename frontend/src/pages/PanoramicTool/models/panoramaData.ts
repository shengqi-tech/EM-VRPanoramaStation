import { useState } from 'react';
import { getPanoramaView } from '@/services/swagger/panoramaController';
import { Common } from '@/utils/three/xThree';
export default () => {
  const [panoramaData, setPanoramaData] = useState<API.PanoramaViewVo>(); // 全景详情数据
  const [threeImgData, setThreeImgData] = useState<any>(); // 当前视图图像数据

  /**
   * 查全景详情数据
   * @param id
   */
  const queryPanoramaView = async (id) => {
    let res = await getPanoramaView({ ems_panorama_id: id });
    if (res?.code == 200) {
      setPanoramaData(res?.result);
    }
    return res;
  };

  return {
    panoramaData,
    queryPanoramaView,
    threeImgData,
    setThreeImgData,
  };
};
