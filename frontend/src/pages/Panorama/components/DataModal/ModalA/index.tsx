import { useModel, useLocation } from 'umi';
import { CloseOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import LineEchart from './LineEchart';
import './index.less';
import './mobile.less';
import { useEffect, useState } from 'react';
import { hisValue, workHisValue } from '@/services/swagger/MonitordataController';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Scrollbar, Autoplay } from 'swiper/core';
SwiperCore.use([Scrollbar, Autoplay]);

const ModalA = () => {
  const address = useLocation();
  const [deviceList, setDeviceList] = useState<any>([]);
  const [lineEchartData, setLineEchartData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 当前标题索引

  const { commonBind, setCommonBind, rtdValueList, workRtdValueList } = useModel(
    'Panorama.device',
    (ret) => ({
      commonBind: ret.commonBind,
      workRtdValueList: ret.workRtdValueList,
      rtdValueList: ret.rtdValueList,
      setCommonBind: ret.setCommonBind,
    }),
  );
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  const { setDataModalType, instanceConf } = useModel('Panorama.data', (ret) => ({
    setDataModalType: ret.setDataModalType,
    instanceConf: ret.instanceConf,
  }));

  useEffect(() => {
    if (commonBind.type == 0 && commonBind.bind?.length > 0) {
      const queryParams = new URLSearchParams(address.search);
      const no = queryParams.get('no');
      const deviceList = commonBind.bind?.map((device) => {
        const values = rtdValueList?.filter((rtdValue) => {
          return rtdValue.ems_device_no === device.ems_device_no;
        });
        device.values = values;
        return device;
      });
      const promises = deviceList?.map(async (device) => {
        const res = await hisValue({ ems_device_no: device.ems_device_no, ems_instance_no: no });
        return res.result;
      });
      Promise.all(promises).then((res) => {
        const filteredData = res?.filter((item) => item?.length > 0);
        setLineEchartData(filteredData);
      });
      setDeviceList(deviceList);
    }
  }, [commonBind, rtdValueList]);

  useEffect(() => {
    if (commonBind.type == 1 && commonBind.bind?.length > 0) {
      const queryParams = new URLSearchParams(address.search);
      const no = queryParams.get('no');
      let deviceList: any = [];
      commonBind.bind?.forEach((item) => {
        const values = workRtdValueList?.filter((workRtd) => {
          return workRtd.polltant === item.ems_property_code;
        });
        if (values?.length > 0) {
          deviceList.push({ values: values });
        }
      });
      let polltants = [];
      deviceList?.forEach((item) => {
        item?.values?.forEach((value) => {
          polltants.push(value.polltant);
        });
      });
      workHisValue({ polltants: polltants, ems_instance_no: no }).then((res) => {
        if (res.code == 200) {
          const list = res.result?.map((innerArray) => {
            return innerArray.map((item) => {
              return {
                ...item,
                hisValue: item.workHisValue,
              };
            });
          });
          setLineEchartData([list]);
        }
      });
      setDeviceList(deviceList);
    }
  }, [commonBind, workRtdValueList]);

  useEffect(() => {
    return () => {
      setCommonBind({ type: 0, bind: [] });
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? deviceList.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === deviceList.length - 1 ? 0 : prevIndex + 1));
  };
  return (
    <div className={`${isMobile ? 'DataModalShow-mobile' : 'DataModalShow'}`}>
      <div className="header">
        <CloseOutlined
          className="return"
          onClick={() => {
            setDataModalType(0);
          }}
        />
      </div>
      <div className="planeLeft">
        <div className="pl-top">
          <div
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '1.042vw',
            }}
          >
            基础概况
          </div>
          <p>站房名称： {instanceConf?.ems_instance_name}</p>
          <p>站房地址：{instanceConf?.ems_instance_address}</p>
          <div>
            <p>产品名称： {deviceList[currentIndex]?.product?.ems_product_name}</p>
            <p>产品品牌： {deviceList[currentIndex]?.product?.ems_product_brand}</p>
            <p>产品型号： {deviceList[currentIndex]?.product?.ems_product_type}</p>
            <p>监测方法： {deviceList[currentIndex]?.product?.ems_product_monitormethod}</p>
          </div>
        </div>
      </div>
      <div className="planeContent">
        <div className="switch">
          <CaretLeftOutlined className="icon" onClick={handlePrev} />
          <div className="title">{deviceList[currentIndex]?.ems_device_no}</div>
          <CaretRightOutlined className="icon" onClick={handleNext} />
        </div>
        {lineEchartData?.length > 0 ? <LineEchart data={lineEchartData} /> : null}
      </div>
      <div className="planeRight">
        <div className="right-area">
          <h3 className="typing">
            <div className="typing-effect">{deviceList[currentIndex]?.ems_device_no}</div>
            <b></b>
          </h3>
          <div className="area-inbox-1">
            <dl>
              <dd>
                <Swiper
                  direction={'vertical'}
                  slidesPerView={1}
                  freeMode={true}
                  scrollbar={{
                    hide: true,
                  }}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                >
                  {deviceList[currentIndex]?.values?.map((value, index) => (
                    <SwiperSlide key={index}>
                      <div>{value.name}</div>
                      <div>
                        {value.rtdValue} {value.unit}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </dd>
            </dl>
            <div className="round-1"></div>
            <div className="round-2"></div>
            <div className="round-3"></div>
            <div className="round-4"></div>
          </div>
          <div className="round-time">
            <div>
              {deviceList[currentIndex]?.values ? deviceList[currentIndex]?.values[0]?.time : null}
            </div>
          </div>
        </div>
      </div>
      <div className="line-left fadeleftIn"></div>
      <div className="line-right fadeRightIn"></div>
    </div>
  );
};

export default ModalA;
