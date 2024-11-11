import React, { useEffect, useState, useRef } from 'react';
import { useModel } from 'umi';
import { Card, List, Button, Avatar, Collapse } from 'antd';
import {
  DoubleLeftOutlined,
  CaretRightOutlined,
  FolderOpenOutlined,
  AppstoreOutlined,
  FolderOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { findTagtypeByMap } from '@/services/swagger/tagtypeController';
import TagSelect from '@/components/TagSelect';
import IconManagement from '../IconManagement';
import './index.less';
const { Panel } = Collapse;

export function IconAndText(imgUrl: string | undefined, titleName?: string) {
  return (
    <div>
      <img src={`/systemfile${imgUrl}`} className="title-img"></img>
      <span className="title">{titleName}</span>
    </div>
  );
}
const LabelManagement: React.FC = () => {
  const ref = useRef<any>();
  const {
    currentObject,
    labels,
    setCurrentLabel,
    setCurrentLabelPos,
    objects,
    selectObject,
    labelTypeList,
    setLabelTypeList,
  } = useModel('PanoramicTool.label', (ret) => ({
    labels: ret.labels,
    objects: ret.objects,
    currentObject: ret.currentObject,
    selectObject: ret.selectObject,
    setCurrentLabel: ret.setCurrentLabel,
    setCurrentLabelPos: ret.setCurrentLabelPos,
    labelTypeList: ret.labelTypeList,
    setLabelTypeList: ret.setLabelTypeList,
  }));
  const { selectMenu } = useModel('PanoramicTool.func', (ret) => ({
    selectMenu: ret.selectMenu,
  }));

  const [isActive, setIsActive] = useState<boolean>(true);

  const onChange = (keys: string | string[]) => {
    if (keys.includes('1')) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const selectLabelTypes = (labelTypes: any) => {};

  /**
   * 选中标签
   * @param label
   */
  const selectLabel = (label: any) => {
    let object = objects.find((item) => {
      return item.data.id == label.id;
    });
    selectObject(object);
  };

  /**
   * 打开图标管理弹窗
   */
  const showModal = () => {
    ref.current.showModal();
  };

  useEffect(() => {
    findTagtypeByMap({}).then((res) => {
      setLabelTypeList(res?.result);
    });
  }, []);

  return (
    <>
      <div className="LabelManagement">
        <div className="labelTitle">
          新增热点
          <DoubleLeftOutlined
            className="labelTitleIcon"
            onClick={() => {
              selectMenu(0);
            }}
          />
        </div>
        <div className="labels">
          <Collapse
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => {
              return <CaretRightOutlined className="icon-rotate" rotate={isActive ? 90 : 0} />;
            }}
            ghost
            onChange={onChange}
          >
            <Panel
              header={
                <>
                  {isActive ? (
                    <FolderOpenOutlined className="icon" />
                  ) : (
                    <FolderOutlined className="icon" />
                  )}
                  <span className="title">标签管理</span>
                  <FilterOutlined
                    className="icon icon-right"
                    onClick={(event) => {
                      event.stopPropagation;
                    }}
                  />
                </>
              }
              key="1"
            >
              <List
                size="small"
                split={false}
                dataSource={labels}
                renderItem={(item: any) => (
                  <List.Item
                    className={`${currentObject?.data?.id === item.id ? 'seletedLabel' : ''}`}
                    onClick={() => {
                      selectLabel(item);
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size="small"
                          className="icon-title"
                          src={`/systemfile${
                            labelTypeList?.find((tagtype: API.TagtypeVo) => {
                              return item.pid == tagtype.ems_tagtype_id;
                            })?.ems_tagtype_iconfile?.ems_sysfile_path
                          }`}
                          alt="avatar"
                        />
                      }
                      // avatar={<FileOutlined className="icon" />}
                      title={
                        <span className="title">
                          {item.name} {item?.form?.text ? ' - ' + item?.form?.text : ''}
                        </span>
                      }
                    ></List.Item.Meta>
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
        </div>

        <div className="labelList">
          <div className="tagListBox">
            <TagSelect
              className="tagList"
              expandable
              actionsText={{ collapseText: '', expandText: '' }}
              onChange={selectLabelTypes}
            >
              {labelTypeList?.map((labelType, i) => {
                return (
                  <TagSelect.Option
                    key={labelType?.ems_tagtype_id}
                    value={labelType?.ems_tagtype_id}
                  >
                    {labelType.ems_tagtype_name}
                  </TagSelect.Option>
                );
              })}
            </TagSelect>
          </div>
          <Button className="btn" ghost icon={<AppstoreOutlined />} block onClick={showModal}>
            图标管理
          </Button>
          <div className="labelTypeListBox">
            {labelTypeList?.map((labelType: API.TagtypeVo) => {
              return (
                <div className="labelTypeList" key={labelType?.ems_tagtype_id}>
                  {IconAndText(
                    labelType?.ems_tagtype_iconfile?.ems_sysfile_path,
                    labelType.ems_tagtype_name,
                  )}
                  <List
                    className="list"
                    grid={{ gutter: 10, column: 4 }}
                    dataSource={labelType?.ems_tagtype_tagtypes || []}
                    renderItem={(item: API.TagtypeVo) => (
                      <List.Item key={item.ems_tagtype_id}>
                        <Card
                          onDragStart={(event) => {
                            // 创建一个新的图片元素
                            const img = new Image();
                            event.dataTransfer.setDragImage(img, 0, 0);
                            setCurrentLabelPos({});
                            selectObject({});
                            setCurrentLabel(item);
                          }}
                          className="card"
                          draggable="true"
                          hoverable
                          cover={
                            <div className="imgBox" draggable="false">
                              <img
                                alt="暂无"
                                src={`/systemfile${item?.ems_tagtype_iconfile?.ems_sysfile_path}`}
                                draggable="false"
                                className={`${
                                  item?.ems_tagtype_iconfile?.ems_sysfile_type == 'FrameAnimation'
                                    ? 'card-img-animate'
                                    : ''
                                } card-img`}
                              />
                            </div>
                          }
                        >
                          <Card.Meta description={item?.ems_tagtype_name} />
                        </Card>
                      </List.Item>
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <IconManagement ref={ref} />
    </>
  );
};
export default LabelManagement;
