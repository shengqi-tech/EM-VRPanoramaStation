import { useEffect, useState } from 'react';
import { history, useParams, useModel } from 'umi';
import { Resizable } from 're-resizable';
import styles from './index.less';
import './index.less';
import GuideList from './components/LeftPannel/components/GuideList';
import LabelManagement from './components/LeftPannel/components/LabelManagement';
import LayoutTemplate from './components/LeftPannel/components/LayoutTemplate';
import MenuManagement from './components/LeftPannel/components/MenuManagement';
import BottomPanel from './components/BottomPanel';
import TopPanel from './components/TopPanel';
import RightPanel from './components/RightPanel';
import RightSlider from './components/RightPanel/components/RightSlider';
import CenterPanel from './components/CenterPanel';
import InitView from './components/CenterPanel/components/InitView';
import GuideCenter from './components/CenterPanel/components/GuideCenter';
import ToolBtns from './components/CenterPanel/components/ToolBtns';
import PageDesign from './components/CenterPanel/components/PageDesign';

const PanoramicTool = () => {
  const params: any = useParams();

  const { queryPanoramaView } = useModel('PanoramicTool.panoramaData', (ret) => ({
    queryPanoramaView: ret.queryPanoramaView,
  }));

  const { menuId } = useModel('PanoramicTool.func', (ret) => ({
    menuId: ret.menuId,
  }));

  useEffect(() => {
    if (params && params.id) {
      queryPanoramaView(params.id);
    }
  }, [params]);

  return (
    <div className={styles.panoramicToolPanel}>
      <div className={styles.top}>
        <TopPanel />
      </div>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          {/* 菜单 */}
          <div className={styles.menuList}>
            <MenuManagement />
          </div>
          {/* 二级菜单列表 */}
          {menuId == 1 && (
            <Resizable className={styles.leftPanel} enable={{ right: true }}>
              <LayoutTemplate />
            </Resizable>
          )}
          {menuId == 3 && (
            <Resizable className={styles.leftPanel} enable={{ right: true }}>
              <LabelManagement />
            </Resizable>
          )}
          {menuId == 4 && (
            <Resizable className={styles.leftPanel} enable={{ right: true }}>
              <GuideList />
            </Resizable>
          )}
          <div className={styles.center}>
            {/* 全景显示 */}
            <div className={styles.centerT}>
              <div className={styles.toolbar}>
                <ToolBtns />
              </div>
              <div className={styles.canvas} id="canvasBox">
                {menuId == 1 && <PageDesign />}
                {menuId == 2 && <InitView />}
                {menuId == 4 && <GuideCenter />}
                <CenterPanel />
              </div>
            </div>
            {/* 底部 */}
            <BottomPanel />
          </div>
        </div>
        <div className={styles.contentRightSlider}>
          <RightSlider />
        </div>
        <Resizable className={styles.contentRight} enable={{ left: true }}>
          <RightPanel />
        </Resizable>
      </div>
    </div>
  );
};
export default PanoramicTool;
