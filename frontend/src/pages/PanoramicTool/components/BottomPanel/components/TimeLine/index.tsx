import React, { useEffect, useState, useRef } from 'react';
import { useModel } from 'umi';
import { Rnd } from 'react-rnd';
import {
  PlayCircleOutlined,
  BackwardOutlined,
  ForwardOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';
import './index.less';
import { Camera } from '@/utils/three/xThree';
let timer: any = null;
const TimeLine = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectObject } = useModel('PanoramicTool.label', (ret) => ({
    selectObject: ret.selectObject,
  }));
  const { points, setPoints, setCurrentPoint, currentPoint } = useModel(
    'PanoramicTool.timeLine',
    (ret) => ({
      points: ret.points,
      setPoints: ret.setPoints,
      setCurrentPoint: ret.setCurrentPoint,
      currentPoint: ret.currentPoint,
    }),
  );

  const [isPlay, setIsPlay] = useState(false);
  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
  });
  const [touchStartTime, setTouchStartTime] = useState<any>(null);

  const handleTouchStart = () => {
    setTouchStartTime(Date.now());
  };

  const handleTouchEnd = (item) => {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration >= 200) {
      return;
    }
    // 执行事件
    selectObject({});
    setCurrentPoint(item);
    Camera.flyTo({
      fov: item.fov,
      position: item.position,
    });
  };

  /**
   * 拖拽结束
   * @param e
   * @param id
   * @param x
   * @param y
   */
  const handleDragStop = (e, id, x, y) => {
    const updatedItems = points.map((item) => {
      if (item.id === id) {
        let newX = x;
        const currentIndex = points.findIndex((item) => item.id === id);
        const prevItem = points[currentIndex - 1];
        const nextItem = points[currentIndex + 1];

        if (prevItem && newX < prevItem.x + prevItem.width) {
          newX = prevItem.x + prevItem.width;
        }

        if (nextItem && newX + item.width > nextItem.x) {
          newX = nextItem.x - item.width;
        }

        return { ...item, x: newX, y };
      } else {
        return item;
      }
    });

    setPoints(updatedItems);
  };

  const handleResizeStop = (id, width, height, x, y) => {
    const updatedItems = points.map((item) =>
      item.id === id ? { ...item, width: parseInt(width), height: parseInt(height), x, y } : item,
    );
    setPoints(updatedItems);
  };

  /**
   * 滚轮事件
   * @param event
   */
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    const delta = Math.max(-1, Math.min(1, event.deltaY)) * 150;
    scrollRef.current!.scrollLeft = scrollLeft + delta;
  };

  const guide = (points: any, index = 0) => {
    if (index >= points.length) {
      // 所有点都已经飞完，结束引导
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
        guide(points, index);
      },
    });
    index += 1;
  };

  const startAnimate = () => {
    // 列表空，指针不在初始位置
    if (points.length == 0 && pointer.x !== 0) {
      setPointer({
        x: 0,
        y: 0,
      });
      return;
    }
    //
    if (pointer.x == 0) {
      guide(points);
      Camera.pauseFlyTo();
    }
    // 列表不为空，指针位置大于全部长度
    if (points.length > 0) {
      let width = parseInt(points[points.length - 1].width);
      const x = points[points.length - 1].x + width;

      if (pointer.x >= x) {
        Camera.pauseFlyTo();
        setPointer({
          x: 0,
          y: 0,
        });
      } else {
        setIsPlay(true);
        Camera.resumeFlyTo();
        timer = setInterval(() => {
          setPointer((prevState) => {
            if (prevState.x + 1 >= x) {
              setIsPlay(false);
              clearInterval(timer);
            }
            return {
              x: prevState.x + 1,
              y: 0,
            };
          });
        }, 1000 / 60);
      }
    }
  };

  useEffect(() => {
    setIsPlay(false);
    setPointer({
      x: 0,
      y: 0,
    });
    if (timer) clearInterval(timer);
    Camera.stopFlyTo();
  }, [points]);

  useEffect(() => {
    var chartDom = document.getElementById('timeEchart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      grid: {
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '50%',
        containLabel: true,
      },
      xAxis: {
        name: '',
        min: 0,
        max: 120,
        splitNumber: 100,
        axisTick: {
          show: true,
          length: 10,
        },
        axisLabel: {
          formatter: '  {value}s',
          textStyle: {
            color: 'gray',
          },
          align: 'left',
        },
        minorTick: {
          show: true,
          splitNumber: 10,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        show: false,
      },
      series: [],
    };
    option && myChart.setOption(option);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className="TimeLine">
      <div className="funcIcons">
        <BackwardOutlined className="icon-timeline" />
        {isPlay ? (
          <PauseCircleOutlined
            className="icon-timeline"
            onClick={() => {
              setIsPlay(false);
              Camera.pauseFlyTo();
              if (timer) clearInterval(timer);
            }}
          />
        ) : (
          <PlayCircleOutlined className="icon-timeline" onClick={startAnimate} />
        )}
        <ForwardOutlined className="icon-timeline" />
      </div>
      <div className="content">
        <div className="contentLeft">
          <div className="timeTitle"></div>
          <div className="trackTitle">导览看点</div>
          <div className="introduceTitle">介绍</div>
        </div>
        <div className="contentRight">
          <div className="box">
            <div className="boxIn" onWheel={handleWheel} ref={scrollRef}>
              <div className="time" id="timeEchart"></div>
              <div className="track">
                {points.map((item) => (
                  <Rnd
                    key={item.id}
                    bounds="parent"
                    enableResizing={{
                      top: false,
                      right: true,
                      bottom: false,
                      left: true,
                      topRight: false,
                      bottomRight: false,
                      bottomLeft: false,
                      topLeft: false,
                    }}
                    size={{ width: item.width, height: item.height }}
                    position={{ x: item.x, y: item.y }}
                    onDragStop={(e, d) => handleDragStop(e, item.id, d.x, d.y)}
                    onResizeStop={(e, direction, ref, delta, position) =>
                      handleResizeStop(
                        item.id,
                        ref.style.width,
                        ref.style.height,
                        position.x,
                        position.y,
                      )
                    }
                  >
                    <div
                      className={`range ${currentPoint.id == item.id ? 'selected' : ''}`}
                      onMouseDown={handleTouchStart}
                      onMouseUp={() => handleTouchEnd(item)}
                    >
                      {item.name} - {(parseInt(item.width) / 60).toFixed(2)}s
                    </div>
                  </Rnd>
                ))}

                <Rnd
                  enableResizing={{
                    top: false,
                    right: false,
                    bottom: false,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                  }}
                  key="pointer"
                  bounds="parent"
                  size={{ width: 0, height: 50 }}
                  position={{ x: pointer.x, y: pointer.y }}
                  onDragStop={(e, d) => {
                    setPointer({
                      x: d.x,
                      y: d.y,
                    });
                  }}
                >
                  <div className="pointer"></div>
                </Rnd>
              </div>
              <div className="introduce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
