import { useState } from 'react';

export default () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [stationListData, setStationListData] = useState<any>([]);

  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth <= 768);
  });
  const [dataModalType, setDataModalType] = useState(0);
  const [isTaskShow, setIsTaskShow] = useState(false);
  const [isIntroShow, setIsIntroShow] = useState<any>(false);
  const [isListShow, setIsListShow] = useState<any>(false);
  const [isGuideShow, setIsGuideShow] = useState<any>(false);
  const [isAlarmShow, setIsAlarmShow] = useState<any>(false);
  const [instanceConf, setInstanceConf] = useState<any>({});
  const [panoramaData, setPanoramaData] = useState<any>({});
  const [toPanoramaId, setToPanoramaId] = useState<any>();
  const [allPanoramas, setAllPanoramas] = useState<API.PanoramaVo[]>([]);

  return {
    stationListData,
    setStationListData,
    isIntroShow,
    setIsIntroShow,
    isMobile,
    setIsMobile,
    isGuideShow,
    setIsGuideShow,
    isAlarmShow,
    setIsAlarmShow,
    instanceConf,
    setInstanceConf,
    panoramaData,
    setPanoramaData,
    toPanoramaId,
    setToPanoramaId,
    allPanoramas,
    setAllPanoramas,
    isListShow,
    setIsListShow,
    isTaskShow,
    setIsTaskShow,
    dataModalType,
    setDataModalType,
  };
};
