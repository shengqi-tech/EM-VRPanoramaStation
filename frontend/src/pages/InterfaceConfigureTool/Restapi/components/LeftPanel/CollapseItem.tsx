/*
 * @Author: hugangyong 609210276@qq.com
 * @Date: 2023-12-14 13:54:11
 * @LastEditors: hugangyong 609210276@qq.com
 * @LastEditTime: 2023-12-20 17:30:18
 * @FilePath: \em360station-backend\src\pages\InterfaceConfigureTool\Restapi\components\LeftPanel\CollapseItem.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useImperativeHandle } from 'react';
import { List, Space, Collapse, Popconfirm, Tooltip } from 'antd';
import {
  CaretRightOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  FileAddOutlined,
  FileExcelOutlined,
  DeleteOutlined,
  // createFromIconfontCN,
} from '@ant-design/icons';

import DynamicInput from '../../../../../components/DynamicInput';

import { updateRestapigroup } from '@/services/swagger/restapigroupController';

// import './index.less';

// const IconFont = createFromIconfontCN({
//   scriptUrl: '/iconfont/iconfont.js',
// });
const { Panel } = Collapse;

type CollapseItemProps = {
  restapiGroup: API.RestapigroupVo;
  selectedRestapi: API.ApiVo | undefined;
  onSelect: (restApi: API.ApiVo) => void;

  onDelete: (restApi: API.ApiVo) => void;

  onDeleteGroup: () => void;
};

const CollapseItem = React.forwardRef((collapseItemProps: CollapseItemProps, ref: any) => {
  const { restapiGroup, selectedRestapi, onSelect, onDelete, onDeleteGroup } = collapseItemProps;

  const [collapseIsActive, setCollapseIsActive] = useState<boolean>(false);

  // const onChange = (key: string | string[]) => {};

  // useImperativeHandle(ref, () => ({
  //   async select(id: number | undefined) {},
  // }));

  return (
    <Collapse
      defaultActiveKey={restapiGroup?.ems_restapigroup_id}
      expandIcon={({ isActive }) => {
        setCollapseIsActive(isActive);
        return <CaretRightOutlined className="icon" rotate={isActive ? 90 : 0} />;
      }}
      ghost
      // onChange={onChange}
    >
      <Panel
        header={
          <>
            {collapseIsActive ? (
              <FolderOpenOutlined className="icon" />
            ) : (
              <FolderOutlined className="icon" />
            )}

            {/* <span className="title">{restapiGroup?.ems_restapigroup_name}</span> */}
            <DynamicInput
              className="title"
              size="small"
              bordered={false}
              defaultValue={restapiGroup?.ems_restapigroup_name}
              onFocus={(e) => {
                e.stopPropagation();
              }}
              maxLength={15}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onInputChange={(value: string) => {
                // const foundElement = items?.find(
                //   (element) => element.key == selectedRestapi.ems_api_id?.toString(),
                // );
                // setItems([...initialItems]);
                // requestPanelTabRef?.current?.setName(value);
              }}
              onBlur={(e) => {
                updateRestapigroup({ ...restapiGroup, ems_restapigroup_name: e.target.value });
              }}
            ></DynamicInput>
          </>
        }
        key={restapiGroup?.ems_restapigroup_id}
        extra={
          <Popconfirm
            title="是否删除该项！"
            okText="是"
            cancelText="否"
            onConfirm={(event) => {
              event.stopPropagation();
              onDeleteGroup();
            }}
            onCancel={(event) => {
              event.stopPropagation();
            }}
          >
            <Tooltip title="删除分类">
              <FileExcelOutlined
                className="icon"
                onClick={(event) => {
                  // If you don't want click extra trigger collapse, you can prevent this:
                  event.stopPropagation();
                  // onAdd();
                }}
              />
            </Tooltip>
          </Popconfirm>
        }
      >
        <List
          size="small"
          split={false}
          dataSource={restapiGroup?.ems_restapigroup_apivos}
          renderItem={(item: API.ApiVo) => (
            <List.Item
              className={`${selectedRestapi?.ems_api_id === item.ems_api_id ? 'seletedLabel' : ''}`}
              onClick={() => {
                onSelect(item);
              }}
            >
              <List.Item.Meta
                title={
                  <>
                    <Space>
                      <span style={{ color: 'green' }}>{item.ems_api_requesttype}</span>
                      <span className="title">{item.ems_api_name}</span>
                    </Space>
                    <Popconfirm
                      title="是否删除该项！"
                      okText="是"
                      cancelText="否"
                      onConfirm={(event) => {
                        event.stopPropagation();
                        onDelete(item);
                      }}
                      onCancel={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <Tooltip title="删除接口">
                        <DeleteOutlined
                          className="icon"
                          style={{ float: 'right' }}
                          onClick={(event) => {
                            // If you don't want click extra trigger collapse, you can prevent this:
                            event.stopPropagation();
                          }}
                        ></DeleteOutlined>
                      </Tooltip>
                    </Popconfirm>
                  </>
                }
              ></List.Item.Meta>
            </List.Item>
          )}
        />
      </Panel>
    </Collapse>
  );
});
export default CollapseItem;
