import './index.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Camera } from '@/utils/three/xThree';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useParams, useModel } from 'umi';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Scrollbar } from 'swiper/core';
import { findGuideByMap } from '@/services/swagger/guideController';
import { useEffect, useState } from 'react';
SwiperCore.use([Scrollbar]);

let flag = true;

const Guide = () => {
  const params: any = useParams();
  const { instanceId } = params;
  const [guidePointlist, setGuidePointList] = useState<any>([]);
  const [currentGuideId, setCurrentGuideId] = useState<any>([]);
  const [isPlay, setIsPlay] = useState(false);
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  const { isGuideShow, setIsGuideShow, setToPanoramaId } = useModel('Panorama.data', (ret) => ({
    setToPanoramaId: ret.setToPanoramaId,
    isGuideShow: ret.isGuideShow,
    setIsGuideShow: ret.setIsGuideShow,
  }));

  const guide = (points: any, index = 0, onComplete: () => void) => {
    if (index >= points.length) {
      // 所有点都已经飞完，结束引导
      onComplete();
      return;
    }
    const currentPosition = points[index].data.form.position;
    const fov = points[index].fov;
    const duration = points[index].width / 60;
    let time = points[0].x;
    if (index > 0) {
      time = points[index].x - points[index - 1].x - points[index - 1].width;
    }

    time = time / 60;

    Camera.flyTo({
      position: currentPosition,
      fov: fov,
      duration: duration,
      delay: time,
      onComplete: () => {
        guide(points, index, onComplete);
      },
    });
    index += 1;
  };

  const startAnimation = () => {
    if (isPlay) {
      Camera.pauseFlyTo();
    } else {
      Camera.resumeFlyTo();
    }
    setIsPlay(!isPlay);

    let arr = guidePointlist?.map((item) => {
      const { points } = JSON.parse(item.jsonData);
      return {
        id: item.id,
        panoramaId: item.panoramaId,
        points,
      };
    });

    let index = 0;

    const startGuide = () => {
      if (index >= arr.length) {
        // 所有点都已经引导完成
        setIsPlay(false);
        flag = true;
        return;
      }

      setCurrentGuideId(arr[index].id);
      setToPanoramaId(arr[index].panoramaId);

      setTimeout(() => {
        guide(arr[index].points, 0, () => {
          index += 1; // 当前点引导完成后，递增索引
          startGuide(); // 继续引导下一个点
        });
      }, 1000);
    };

    if (flag) {
      startGuide();
      flag = false;
    }
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!isGuideShow) {
      flag = true;
      Camera.stopFlyTo();
      setIsPlay(false);
    }
  }, [isGuideShow]);

  return (
    <>
      <div className={`swiperBox ${isGuideShow ? 'showAnimation' : 'hideAnimation'}`}>
        <div className="btn">
          <Button
            type="ghost"
            icon={isPlay ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            onClick={startAnimation}
          >
            {isPlay ? '暂停' : '播放'}
          </Button>
          <CloseOutlined
            onClick={() => {
              setIsGuideShow(!isGuideShow);
            }}
            className="btn-close"
          />
        </div>

        <Swiper
          slidesPerView={isMobile ? 3 : guidePointlist?.length}
          freeMode={true}
          scrollbar={{
            hide: true,
          }}
        >
          {guidePointlist?.map((item: any) => {
            return (
              <SwiperSlide key={item.id}>
                <div className={`item ${currentGuideId === item.id ? 'selected' : ''}`}>
                  <img width="100%" height="100%" src={`/systemfile${item.cover}`}></img>
                  <div className="card-name">{item.panoramaName}</div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};
export default Guide;
