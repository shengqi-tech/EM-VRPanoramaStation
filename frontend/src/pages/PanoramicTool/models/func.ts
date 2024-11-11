import { useState } from 'react';

export default () => {
  const [menuId, setMenuId] = useState(3);
  const menuList = [
    { id: 1, name: '全局', icon: 'icon-jiemianshezhi' },
    { id: 2, name: '视角', icon: 'icon-shijiaoshoucang' },
    { id: 3, name: '热点', icon: 'icon-B' },
    { id: 4, name: '导览', icon: 'icon-luxian' },
    { id: 5, name: '其他', icon: 'icon-qita' },
  ];

  const selectMenu = (id: number) => {
    setMenuId(id);
  };

  return { menuId, menuList, selectMenu };
};
