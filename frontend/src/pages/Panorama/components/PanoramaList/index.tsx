import './index.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from 'antd';
import { UnorderedListOutlined, CloseOutlined } from '@ant-design/icons';
import { useParams, useModel } from 'umi';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Scrollbar } from 'swiper/core';
SwiperCore.use([Scrollbar]);

const PanoramaList = () => {
  const params: any = useParams();

  const { isListShow, setIsListShow, setToPanoramaId, panoramaData, allPanoramas } = useModel(
    'Panorama.data',
    (ret) => ({
      allPanoramas: ret.allPanoramas,
      setToPanoramaId: ret.setToPanoramaId,
      panoramaData: ret.panoramaData,
      isListShow: ret.isListShow,
      setIsListShow: ret.setIsListShow,
    }),
  );
  const handleToPanorama = (toPanoramaId: any) => {
    setToPanoramaId(toPanoramaId);
  };

  return (
    <>
      <div className={`PanoramaList ${isListShow ? 'showAnimation' : 'hideAnimation'}`}>
        <div className="btn">
          <Button type="ghost" icon={<UnorderedListOutlined />}>
            场景
          </Button>
          <CloseOutlined
            onClick={() => {
              setIsListShow(!isListShow);
            }}
            className="btn-close"
          />
        </div>
        <Swiper
          slidesPerView={3}
          freeMode={true}
          scrollbar={{
            hide: true,
          }}
        >
          {allPanoramas?.map((item: any) => {
            return (
              <SwiperSlide key={item.ems_panorama_id}>
                <div
                  className={`item ${
                    panoramaData?.ems_panorama_id === item.ems_panorama_id ? 'selected' : ''
                  }`}
                  onClick={() => {
                    handleToPanorama(item.ems_panorama_id);
                  }}
                >
                  <img
                    width="100%"
                    height="100%"
                    src={`/systemfile${item?.ems_panorama_cover?.ems_sysfile_path}`}
                  ></img>
                  <div className="card-name">{item.ems_panorama_name}</div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};
export default PanoramaList;
