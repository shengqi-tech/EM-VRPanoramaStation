import {
  CloseOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  InsuranceOutlined,
  UngroupOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { useModel, useLocation } from 'umi';
import { useEffect, useState } from 'react';
import { hisValue, workHisValue } from '@/services/swagger/MonitordataController';
import LineEchart from './LineEchart';
import './index.less';
import './mobile.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Scrollbar, Autoplay } from 'swiper/core';
SwiperCore.use([Scrollbar, Autoplay]);

const ModalB = () => {
  const address = useLocation();
  const [lineEchartData, setLineEchartData] = useState([]);
  const [deviceList, setDeviceList] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 当前标题索引
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  const { setDataModalType } = useModel('Panorama.data', (ret) => ({
    setDataModalType: ret.setDataModalType,
  }));
  const { commonBind, setCommonBind, rtdValueList, workRtdValueList } = useModel(
    'Panorama.device',
    (ret) => ({
      commonBind: ret.commonBind,
      rtdValueList: ret.rtdValueList,
      workRtdValueList: ret.workRtdValueList,
      setCommonBind: ret.setCommonBind,
    }),
  );

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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? deviceList.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === deviceList.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    return () => {
      setCommonBind({ type: 0, bind: [] });
    };
  }, []);
  return (
    <div>
      {isMobile ? (
        <div className="ModalB-mobile">
          <div className="header">
            <CloseOutlined
              className="return"
              onClick={() => {
                setDataModalType(0);
              }}
            />
          </div>
          <div className="content">
            <div className="contentTitle title-scanning">
              <div>实时监测数据</div>
            </div>
            <div className="contentC">
              <div className="cTop">
                <div className="ct-Left">
                  <div className="switch">
                    <CaretLeftOutlined className="icon" onClick={handlePrev} />
                    <div className="title">{deviceList[currentIndex]?.ems_device_no}</div>
                    <CaretRightOutlined className="icon" onClick={handleNext} />
                  </div>
                  <div className="valueBox">
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
                      {deviceList[currentIndex]?.values?.map((value, valueIndex) => (
                        <SwiperSlide key={valueIndex}>
                          <span key={valueIndex}>
                            <div className="valueTitle">{value.name}</div>
                            <div>
                              {value.rtdValue} {value.unit}
                            </div>
                          </span>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="round-1"></div>
                  <div className="round-2"></div>
                  <div className="round-time">
                    <div>{deviceList[currentIndex]?.values[0]?.time}</div>
                  </div>
                </div>
                <div className="ct-Right">
                  <div className="ctrItem">
                    <div className="item-left">
                      <IdcardOutlined />
                    </div>
                    <div className="item-right">
                      <div className="title">产品名称</div>
                      <div className="content">
                        {deviceList[currentIndex]?.product?.ems_product_name}
                      </div>
                    </div>
                  </div>
                  <div className="ctrItem">
                    <div className="item-left">
                      <EnvironmentOutlined />
                    </div>
                    <div className="item-right">
                      <div className="title">产品品牌</div>
                      <div className="content">
                        {deviceList[currentIndex]?.product?.ems_product_brand}
                      </div>
                    </div>
                  </div>
                  <div className="ctrItem">
                    <div className="item-left">
                      <InsuranceOutlined />
                    </div>
                    <div className="item-right">
                      <div className="title">监测方法</div>
                      <div className="content">
                        {deviceList[currentIndex]?.product?.ems_product_monitormethod}
                      </div>
                    </div>
                  </div>
                  <div className="ctrItem">
                    <div className="item-left">
                      <UngroupOutlined />
                    </div>
                    <div className="item-right">
                      <div className="title">产品型号</div>
                      <div className="content">
                        {deviceList[currentIndex]?.product?.ems_product_type}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cBottom">
                <div className="bottom">
                  <div className="bottomTitle title-scanning">
                    <div>因子历史监测数据曲线信息</div>
                  </div>
                  <div className="echart">
                    {lineEchartData?.length > 0 ? <LineEchart data={lineEchartData} /> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ModalB">
          <div className="header">
            <CloseOutlined
              className="return"
              onClick={() => {
                setDataModalType(0);
              }}
            />
          </div>
          <div className="content">
            <div className="contentTitle title-scanning">
              <div>实时监测数据</div>
            </div>
            <div className="contentC">
              <div className="ct-Left">
                <div className="switch">
                  <CaretLeftOutlined className="icon" onClick={handlePrev} />
                  <div className="title">{deviceList[currentIndex]?.ems_device_no}</div>
                  <CaretRightOutlined className="icon" onClick={handleNext} />
                </div>
                <div className="ct-Left-Top">
                  <div className="valueBox">
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
                      {deviceList[currentIndex]?.values?.map((value, valueIndex) => (
                        <SwiperSlide key={valueIndex}>
                          <span key={valueIndex}>
                            <div className="valueTitle">{value.name}</div>
                            <div>
                              {value.rtdValue} {value.unit}
                            </div>
                          </span>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="round-1"></div>
                  <div className="round-2"></div>
                  <div className="round-time">
                    <div>{deviceList[currentIndex]?.values[0]?.time}</div>
                  </div>
                </div>
              </div>
              <div className="ct-Right">
                <div className="ct-Right-Top">
                  <div className="ctrItem">
                    <div className="item-left">
                      <IdcardOutlined />
                    </div>
                    <div className="item-right">
                      <div className="title">产品名称</div>
                      <div className="content">
                        {deviceList[currentIndex]?.product?.ems_product_name}
                      </div>
                    </div>
                  </div>
                  <div className="ctrItem">
                    <div className="item-left">
                      <EnvironmentOutlined />
                    </div>
                    <div className="item-right">
                      <div className="title">产品品牌</div>
                      <div className="content">
                        {deviceList[currentIndex]?.product?.ems_product_brand}
                      </div>
                    </div>
                  </div>
                  <div className="ctrItem">
                    <div className="item-left">
                      <InsuranceOutlined />
                    </div>
                    <div className="item-right">
                      <div className="title">监测方法</div>
                      <div className="content">
                        {deviceList[currentIndex]?.product?.ems_product_monitormethod}
                      </div>
                    </div>
                  </div>
                  <div className="ctrItem">
                    <div className="item-left">
                      <UngroupOutlined />
                    </div>
                    <div className="item-right">
                      <div className="title">产品型号</div>
                      <div className="content">
                        {deviceList[currentIndex]?.product?.ems_product_type}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ct-Right-Bottom">
                  <div className="echart">
                    {lineEchartData?.length > 0 ? <LineEchart data={lineEchartData} /> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalB;
