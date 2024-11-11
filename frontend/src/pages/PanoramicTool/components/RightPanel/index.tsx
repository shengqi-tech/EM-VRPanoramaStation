import { useModel } from 'umi';
import HostTagPanel from './components/HostTagPanel';
import ViewPanel from './components/ViewPanel';
import LayoutPanel from './components/LayoutPanel';
import GuidePanel from './components/GuidePanel';
import './index.less';

const RightPanel = () => {
  const { menuId } = useModel('PanoramicTool.func');
  return (
    <div className="rightPanel">
      {menuId == 1 && <LayoutPanel />}
      {menuId == 2 && <ViewPanel />}
      {menuId == 3 && <HostTagPanel />}
      {menuId == 4 && <GuidePanel />}
    </div>
  );
};
export default RightPanel;
