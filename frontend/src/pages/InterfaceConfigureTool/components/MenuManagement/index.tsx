import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Card, List, Collapse, Tabs } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { findTagtypeByMap } from '@/services/swagger/tagtypeController';
import './index.less';
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
export function IconAndText(imgUrl: string | undefined, titleName?: string) {
  return (
    <div>
      <img src={`/systemfile${imgUrl}`} className="title-img"></img>
      <span className="title">{titleName}</span>
    </div>
  );
}
const MenuManagement: React.FC = () => {
  const { selectMenu, menuList, menuId } = useModel('InterfaceConfigureTool.menu', (ret) => ({
    menuId: ret.menuId,
    selectMenu: ret.selectMenu,
    menuList: ret.menuList,
  }));

  const handleClickMenu = (menu: any) => {
    selectMenu(menu.id);
  };
  return (
    <div className="MenuManagement">
      {menuList?.map((item) => {
        return (
          <div
            key={item.id}
            className={`${menuId == item.id ? 'selectedMenu' : ''}  menu`}
            onClick={() => {
              handleClickMenu(item);
            }}
          >
            <div className="iconBox">
              <IconFont type={item.icon} className={item.icon} />
            </div>
            <span className="text">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};
export default MenuManagement;
