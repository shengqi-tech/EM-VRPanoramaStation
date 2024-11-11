import { useEffect, useRef } from 'react';
import { useParams, useModel, useLocation } from 'umi';
import {
  createFromIconfontCN,
  UnorderedListOutlined,
  HomeOutlined,
  AlertOutlined,
} from '@ant-design/icons';
import Banner from './components/Banner';
import FuncBtns from './components/FuncBtns';
import { findInstanceByMap } from '@/services/swagger/instanceController';
import PanoramaCanvas from './components/Canvas';
import Layers from './components/Layers';
import Direction from './components/Direction';
import Task from './components/Task';
import Guide from './components/Guide';
import Intro from './components/Intro';
import PanoramaList from './components/PanoramaList';
import DataModal from './components/DataModal';
import Alarm from './components/Alarm';
import DataPopup from './components/DataPopup';
import './index.less';
import './moblie.less';
import Ws from '@/utils/ws';
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
let myWebSocket: any;
let workWebSocket: any;

const PanoramaView = () => {
  const address = useLocation();
  const alarmRef = useRef<any>(null);
  const params: any = useParams();
  const { instanceId } = params;
  const { setRtdValueList, setWorkRtdValueList } = useModel('Panorama.device', (ret) => ({
    setRtdValueList: ret.setRtdValueList,
    setWorkRtdValueList: ret.setWorkRtdValueList,
  }));
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  const {
    instanceConf,
    setInstanceConf,
    setIsGuideShow,
    isGuideShow,
    isListShow,
    setIsListShow,
    isIntroShow,
    setIsIntroShow,
    isAlarmShow,
    setIsAlarmShow,
  } = useModel('Panorama.data', (ret) => ({
    isIntroShow: ret.isIntroShow,
    setIsIntroShow: ret.setIsIntroShow,
    isListShow: ret.isListShow,
    setIsListShow: ret.setIsListShow,
    isGuideShow: ret.isGuideShow,
    isAlarmShow: ret.isAlarmShow,
    setIsAlarmShow: ret.setIsAlarmShow,
    setIsGuideShow: ret.setIsGuideShow,
    setInstanceConf: ret.setInstanceConf,
    instanceConf: ret.instanceConf,
  }));

  /**
   * 实时数据刷新
   */
  const refreshRtdValueList = () => {
    const queryParams = new URLSearchParams(address.search);
    const no = queryParams.get('no');
    const wsParams = {
      url: `ws://${location.host}/wsUrl/monitordata/rtdValueList`,
      msg: {
        ems_instance_no: no,
      },
      callback: (data: string) => {
        if (data) {
          const rtdValueList = JSON.parse(data);
          setRtdValueList(rtdValueList);
        }
      },
    };
    myWebSocket = new Ws(wsParams);
    myWebSocket.connect();
  };

  /**
   * 实时工况数据刷新
   */
  const refreshWorkRtdValueList = () => {
    const queryParams = new URLSearchParams(address.search);
    const no = queryParams.get('no');
    const wsParams = {
      url: `ws://${location.host}/wsUrl/monitordata/workRtdValueList`,
      msg: {
        ems_instance_no: no,
      },
      callback: (data: string) => {
        if (data) {
          const rtdValueList = JSON.parse(data);
          setWorkRtdValueList(rtdValueList);
        }
      },
    };
    workWebSocket = new Ws(wsParams);
    workWebSocket.connect();
  };

  /**
   * 基础全局配置
   */
  const setConfig = () => {
    findInstanceByMap({ ems_instance_id: instanceId }).then((res) => {
      const list = res.result?.list || [];
      const instanceData: any = list[0];
      if (instanceData) {
        let conf = { ...JSON.parse(instanceData.ems_instance_globeconf), ...instanceData };
        setInstanceConf(conf);
      }
    });
  };

  useEffect(() => {
    setConfig();
    refreshRtdValueList();
    refreshWorkRtdValueList();
  }, []);

  return (
    <div className="panoramaViewBox">
      <div className={`panoramaView-${isMobile ? 'mobile' : 'web'}`}>
        <div className="banner">
          <Banner />
        </div>
        <div className="logo">
          <img
            src={
              instanceConf?.logoImgFile?.ems_sysfile_path
                ? `/systemfile${instanceConf?.logoImgFile?.ems_sysfile_path}`
                : require('@/assets/images/panoramicTool/logo.png')
            }
            alt=""
          />
        </div>
        <div className="funcBtns">
          <FuncBtns />
        </div>
        <div className="layers">
          <Layers />
        </div>
        <div
          className="intro"
          onClick={() => {
            setIsIntroShow(!isIntroShow);
          }}
        >
          <HomeOutlined className="icon-intro" />
          <div>站房</div>
        </div>
        <div
          className="list"
          onClick={() => {
            setIsListShow(!isListShow);
          }}
        >
          <UnorderedListOutlined className="icon-list" />
          <div>场景</div>
        </div>
        <div className="leftIcon">
          <div
            className="alarmIcon"
            onClick={() => {
              setIsAlarmShow(!isAlarmShow);
              alarmRef?.current.open();
            }}
          >
            <AlertOutlined className={isAlarmShow ? 'icon-alarm selected' : 'icon-alarm'} />
            <div className={isAlarmShow ? 'selected' : ''}>报警</div>
          </div>
          <div
            className="guide"
            onClick={() => {
              setIsGuideShow(!isGuideShow);
            }}
          >
            <IconFont
              type="icon-daolan"
              className={isGuideShow ? 'icon-guide selected' : 'icon-guide'}
            />
            <div className={isGuideShow ? 'selected' : ''}>导览</div>
          </div>
        </div>

        <PanoramaList />
        <Guide />
        <Intro />
        {!isMobile ? (
          <div className="direction">
            <Direction />
          </div>
        ) : null}
        {/* 任务窗口 */}
        <Task />
        <DataModal />
        <PanoramaCanvas />
        <Alarm ref={alarmRef} />
        <DataPopup />
      </div>
    </div>
  );
};
export default PanoramaView;
