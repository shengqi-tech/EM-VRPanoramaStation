import './index.less';
import { useModel } from 'umi';
import { Rnd } from 'react-rnd';
import Marquee from 'react-fast-marquee';
import { Alert } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import OperateDirection from '../OperateDirection';
import LayerManagement from '../LayerManagement';
import FuncBtns from '../FuncBtns';
const PageDesign = () => {
  const boxRef = useRef<any>(null);

  const { logoImg, stationDes, setStationDes } = useModel('PanoramicTool.layout', (ret) => ({
    logoImg: ret.logoImg,
    stationDes: ret.stationDes,
    setStationDes: ret.setStationDes,
  }));

  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

  const [styles, setStyles] = useState({
    logo: { id: 1, width: 180, height: 80, position: { x: 0, y: 0 } },
    opt: { id: 2, width: 100, height: 100, position: { x: 0, y: 0 } },
    scene: { id: 3, width: 100, height: 170, position: { x: 0, y: 0 } },
    funcBtn: { id: 4, width: 260, height: 40, position: { x: 0, y: 0 } },
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === boxRef.current) {
          const width = entry.contentRect.width;
          const height = entry.contentRect.height;
          setBoxSize({
            width: width,
            height: height,
          });
          styles['logo'].position = {
            x: (width - styles['logo'].width) * 0,
            y: (height - styles['logo'].height) * 0.07,
          };
          styles['opt'].position = {
            x: (width - styles['opt'].width) * 0.99,
            y: (height - styles['opt'].height) * 0.99,
          };
          styles['scene'].position = {
            x: (width - styles['scene'].width) * 0,
            y: (height - styles['scene'].height) * 0.99,
          };
          styles['funcBtn'].position = {
            x: (width - styles['funcBtn'].width) * 0.99,
            y: (height - styles['funcBtn'].height) * 0.07,
          };
          setStyles({ ...styles });
        }
      }
    });
    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [boxRef]);
  return (
    <div className="pageDesignBox" ref={boxRef}>
      <div className="banner">
        {stationDes.desShow && (
          <Alert
            type="info"
            closable
            icon={<ReadOutlined />}
            banner
            message={
              <Marquee pauseOnHover gradient={false}>
                {stationDes.des}
              </Marquee>
            }
            afterClose={() => {
              setStationDes({
                des: stationDes.des,
                desShow: false,
              });
            }}
          />
        )}
      </div>

      {/* logo */}
      <Rnd
        className="rndBox"
        bounds="parent"
        size={{ width: styles['logo'].width, height: styles['logo'].height }}
        position={styles['logo'].position}
        onResize={(e, direction, ref, delta, position) => {
          styles['logo'].width = ref.offsetWidth;
          styles['logo'].height = ref.offsetHeight;
          styles['logo'].position = position;
          setStyles({ ...styles });
        }}
        onDragStop={(e: any, d: any) => {
          styles['logo'].position = { x: d.x, y: d.y };
          setStyles({ ...styles });
        }}
      >
        <div className="dragBox" draggable={false}>
          {logoImg && (
            <img
              draggable={false}
              src={
                logoImg
                  ? `/systemfile${logoImg.ems_sysfile_path}`
                  : require('@/assets/images/panoramicTool/logo.png')
              }
              alt=""
            />
          )}
        </div>
      </Rnd>
      {/* 操作盘 */}
      <Rnd
        className="rndBox"
        bounds="parent"
        size={{ width: styles['opt'].width, height: styles['opt'].height }}
        position={styles['opt'].position}
        onResize={(e, direction, ref, delta, position) => {
          styles['opt'].width = ref.offsetWidth;
          styles['opt'].height = ref.offsetHeight;
          styles['opt'].position = position;
          setStyles({ ...styles });
        }}
        onDragStop={(e: any, d: any) => {
          styles['opt'].position = { x: d.x, y: d.y };
          setStyles({ ...styles });
        }}
      >
        <div className="dragBox" draggable={false}>
          <OperateDirection />
        </div>
      </Rnd>
      {/* 场景选择 */}
      <Rnd
        enableResizing={false}
        className="rndBox"
        bounds="parent"
        size={{ width: styles['scene'].width, height: styles['scene'].height }}
        position={styles['scene'].position}
        onDragStop={(e: any, d: any) => {
          styles['scene'].position = { x: d.x, y: d.y };
          setStyles({ ...styles });
        }}
      >
        <div className="dragBox" draggable={false}>
          <LayerManagement />
        </div>
      </Rnd>
      {/* 功能键 */}
      <Rnd
        enableResizing={false}
        className="rndBox"
        bounds="parent"
        size={{ width: styles['funcBtn'].width, height: styles['funcBtn'].height }}
        position={styles['funcBtn'].position}
        onDragStop={(e: any, d: any) => {
          styles['funcBtn'].position = { x: d.x, y: d.y };
          setStyles({ ...styles });
        }}
      >
        <div className="dragBox" draggable={false}>
          <FuncBtns />
        </div>
      </Rnd>
    </div>
  );
};
export default PageDesign;
