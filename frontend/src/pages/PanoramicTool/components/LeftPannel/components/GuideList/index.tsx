import React, { useEffect, useState, useRef } from 'react';
import { useModel, useParams, history } from 'umi';
import { CheckCard } from '@ant-design/pro-components';
import { DoubleLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Image, Tag, Typography, Tooltip, message } from 'antd';
import { sortGuide } from '@/services/swagger/guideController';
import './index.less';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Paragraph } = Typography;
const GuideList: React.FC = () => {
  const params: any = useParams();
  const { instanceId } = params;

  const url = `/msManagement/panoramicConfig/${instanceId}`;

  const { selectMenu } = useModel('PanoramicTool.func', (ret) => ({
    selectMenu: ret.selectMenu,
  }));
  const {
    guidePointlist,
    getGuidePointlist,
    setGuidePointList,
    setCurrentGuidePoint,
    currentGuidePoint,
  } = useModel('PanoramicTool.timeLine', (ret) => ({
    guidePointlist: ret.guidePointlist,
    setGuidePointList: ret.setGuidePointList,
    getGuidePointlist: ret.getGuidePointlist,
    setCurrentGuidePoint: ret.setCurrentGuidePoint,
    currentGuidePoint: ret.currentGuidePoint,
  }));
  const handleDragEnd = async (result: any) => {
    const { draggableId, destination, source } = result;
    // 从原位置移除元素
    const [removed] = guidePointlist.splice(source.index, 1);
    // 将元素插入到目标位置
    guidePointlist.splice(destination.index, 0, removed);
    setGuidePointList(guidePointlist);

    let next = guidePointlist[destination.index + 1] || {};
    let res = await sortGuide({
      sortId: draggableId,
      id: next.id || null,
    });
    if (res?.code == 200) {
      message.success(res?.message);
      // getGuidePointlist(instanceId);
    }
  };

  const selectGuidePoint = (value) => {
    setCurrentGuidePoint(value);
    if (value) {
      history.push(`${url}/${value.panoramaId}`);
    }
  };

  useEffect(() => {
    getGuidePointlist(instanceId);
  }, []);

  return (
    <>
      <div className="GuideList">
        <div className="title">
          导览线路图
          <Tooltip title="拖拽排序">
            <InfoCircleOutlined style={{ verticalAlign: 'middle', margin: '0 5px' }} />
          </Tooltip>
          <DoubleLeftOutlined
            className="titleIcon"
            onClick={() => {
              selectMenu(0);
            }}
          />
        </div>
        <div className="content">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable-guideList">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <CheckCard.Group
                    style={{ width: '100%' }}
                    onChange={selectGuidePoint}
                    value={currentGuidePoint}
                  >
                    {guidePointlist?.map((item, index) => {
                      return (
                        <Draggable
                          draggableId={String(item.id)}
                          key={String(item.id)}
                          index={index}
                        >
                          {(p) => (
                            <div
                              ref={p.innerRef}
                              {...p.draggableProps}
                              {...p.dragHandleProps}
                              key={String(item.id)}
                            >
                              <CheckCard
                                value={item}
                                key={item.id}
                                avatar={
                                  <div style={{ position: 'relative' }}>
                                    <Image
                                      width={150}
                                      height={100}
                                      src={`/systemfile${item.cover}`}
                                    />
                                    <div className="card-name">{item.panoramaName}</div>
                                  </div>
                                }
                                title={
                                  <div
                                    style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                  >
                                    <strong>{item.name}</strong>
                                    <Tag
                                      color="#1677ff"
                                      style={{
                                        marginLeft: 'auto',
                                        color: '#fff',
                                      }}
                                    >
                                      {index + 1}/{guidePointlist.length}
                                    </Tag>
                                  </div>
                                }
                                description={
                                  <Paragraph ellipsis={{ rows: 3 }}>{item.des}</Paragraph>
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </CheckCard.Group>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};
export default GuideList;
