import { useState } from 'react';

export default () => {
  const [menuId, setMenuId] = useState(1);

  const menuList = [
    { id: 1, name: 'RESTApi', icon: 'icon-jiemianshezhi' },
    { id: 2, name: '实时消息', icon: 'icon-shijiaoshoucang' },
    { id: 3, name: '数据库', icon: 'icon-B' },
    { id: 4, name: '其他', icon: 'icon-luxian' },
  ];

  const selectMenu = (id: number) => {
    setMenuId(id);
  };

  return { menuId, menuList, selectMenu };
};
