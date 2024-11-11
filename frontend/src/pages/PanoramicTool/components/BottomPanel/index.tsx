import { useModel } from 'umi';
import PanoramaList from './components/PanoramaList';
import TimeLine from './components/TimeLine';
import './index.less';

const BottomPanel = () => {
  const { timeLineShow } = useModel('PanoramicTool.timeLine', (ret) => ({
    timeLineShow: ret.timeLineShow,
  }));
  return (
    <div className="BottomPanel">
      <div className="bottomBox">{timeLineShow ? <TimeLine /> : <PanoramaList />}</div>
    </div>
  );
};
export default BottomPanel;
