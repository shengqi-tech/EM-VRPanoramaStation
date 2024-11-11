import React, { useEffect, useState } from 'react';
import { useRequest, useModel } from 'umi';
import { List, Space, Collapse, Drawer } from 'antd';
import {
  DoubleLeftOutlined,
  CaretRightOutlined,
  FolderAddOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';

import { findRestapigroupByMap } from '@/services/swagger/restapigroupController';
import { deleteApi } from '@/services/swagger/apiController';
import CollapseItem from './CollapseItem';

import './index.less';

import SwaggerUI from 'swagger-ui-react';
// import 'swagger-ui-react/swagger-ui.css';

import { insertRestapigroup } from '@/services/swagger/restapigroupController';

const IconFont = createFromIconfontCN({
  scriptUrl: '/iconfont/iconfont.js',
});
const { Panel } = Collapse;

export function IconAndText(imgUrl: string | undefined, titleName?: string) {
  return (
    <div>
      <img src={`/systemfile${imgUrl}`} className="title-img"></img>
      <span className="title">{titleName}</span>
    </div>
  );
}
const ApiManagement: React.FC = () => {
  const [collapseIsActive, setCollapseIsActive] = useState<boolean>(false);

  const { initRestapiGroups, restapiGroups, selectedRestapi, selectRestApi, deleteRestApi } =
    useModel('InterfaceConfigureTool.apiConfig', (ret) => ({
      initRestapiGroups: ret.initRestapiGroups,
      restapiGroups: ret.restapiGroups,
      selectedRestapi: ret.selectedRestapi,
      selectRestApi: ret.selectRestApi,
      deleteRestApi: ret.deleteRestApi,
    }));

  const { customer } = useModel('InterfaceConfigureTool.customer', (ret) => ({
    customer: ret.customer,
  }));

  /**
   * @description: 左栏获取restapi接口配置，并通过状态管理 初始化
   * @return {*}
   */
  const {} = useRequest(
    () => {
      return findRestapigroupByMap({});
    },
    {
      formatResult: (response: any) => {
        initRestapiGroups(response.result);
        return response.result;
      },
      refreshDeps: [customer],
    },
  );

  const onChange = (key: string | string[]) => {};

  useEffect(() => {}, []);
  // const [open, setOpen] = useState(false);

  // const onClose = () => {
  //   setOpen(false);
  // };
  // const containerStyle: React.CSSProperties = {
  //   // position: 'relative',
  //   height: 200,
  //   width: 200,
  //   paddingTop: 100,
  //   // overflow: 'hidden',
  //   // textAlign: 'center',
  //   // background: token.colorFillAlter,
  //   // border: `1px solid ${token.colorBorderSecondary}`,
  //   // borderRadius: token.borderRadiusLG,
  // };
  return (
    <>
      <div className="LabelManagement">
        <div className="labelTitle">
          {/* <SwaggerUI url="http://192.168.2.2:18083/v3/api-docs" /> */}

          <Space>
            <IconFont type="icon-jiemianshezhi" />
            <span>RESTApi</span>
          </Space>

          <FolderAddOutlined
            className="labelTitleIcon"
            onClick={() => {
              // selectMenu(0);
              // setOpen(!open);
              const newGroup = {
                ems_restapigroup_name: '测试',
                ems_restapigroup_userid: 1,
              };
              insertRestapigroup(newGroup);
              initRestapiGroups([...restapiGroups, newGroup]);
            }}
          />
        </div>
        <div className="labels">
          <List
            size="small"
            split={false}
            dataSource={restapiGroups}
            renderItem={(item: API.RestapigroupVo, index: number) => (
              <List.Item
                // className={`${
                //   selectedRestapi?.ems_api_id === item.ems_api_id ? 'seletedLabel' : ''
                // }`}
                onClick={() => {}}
              >
                {/* {index == 0 ? (
                  <Drawer
                    // title="Basic Drawer"
                    placement="right"
                    closable={false}
                    open={open}
                    getContainer={false}
                    onClose={onClose}
                    width={250}
                    style={{ height: 150, backgroundColor: 'transparent' }}
                    // style={containerStyle}
                  >
                    <p>Some contents...</p>
                  </Drawer>
                ) : (
                  ''
                )} */}
                <CollapseItem
                  restapiGroup={item}
                  selectedRestapi={selectedRestapi}
                  onSelect={selectRestApi}
                  onDelete={(api) => {
                    deleteRestApi(api);
                    deleteApi({ ems_api_id: api.ems_api_id });
                  }}
                  onDeleteGroup={() => {
                    const filterRestG = restapiGroups.filter((rg) => {
                      return item.ems_restapigroup_id != rg.ems_restapigroup_id;
                    });
                    initRestapiGroups([...filterRestG]);
                  }}
                ></CollapseItem>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};
export default ApiManagement;
