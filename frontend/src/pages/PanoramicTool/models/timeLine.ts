import { useState } from 'react';
import { uniqueId } from 'lodash';
import { findGuideByMap } from '@/services/swagger/guideController';

export default () => {
  const [timeLineShow, setTimeLineShow] = useState(false);
  const [guidePointlist, setGuidePointList] = useState<any>([]);

  const [points, setPoints] = useState<any>([]);
  const [currentPoint, setCurrentPoint] = useState<any>({});
  const [currentGuidePoint, setCurrentGuidePoint] = useState<any>({});

  const addPoint = (params: any) => {
    const { data, name, fov, position } = params;
    let x = 0;
    if (points.length > 0) {
      let width = parseInt(points[points.length - 1].width);
      x = points[points.length - 1].x + width;
    }
    let newId = uniqueId();
    while (points.some((point) => point.id === newId)) {
      newId = uniqueId();
    }
    const newPoint = {
      id: newId,
      data,
      fov,
      position,
      name,
      x,
      y: 0,
      width: 300,
      height: 50,
    };
    setPoints([...points, newPoint]);
  };

  const getGuidePointlist = (instanceId) => {
    findGuideByMap({ ems_guide_instanceid: instanceId }).then((res) => {
      const list = res.result?.list;
      const arr = list?.map((item) => {
        return {
          id: item.ems_guide_id,
          name: item.ems_guide_name,
          des: item.ems_guide_intr,
          cover: item.ems_guide_coverfile?.ems_sysfile_path,
          jsonData: item.ems_guide_jsondata,
          panoramaId: item.ems_guide_panoramaid,
          panoramaName: item.ems_guide_panoramaname,
        };
      });
      setGuidePointList(arr);
    });
  };

  return {
    timeLineShow,
    setTimeLineShow,
    points,
    addPoint,
    setPoints,
    setCurrentPoint,
    currentPoint,
    guidePointlist,
    setGuidePointList,
    getGuidePointlist,
    currentGuidePoint,
    setCurrentGuidePoint,
  };
};
