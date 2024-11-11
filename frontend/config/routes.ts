export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { component: './404' },
    ],
  },
  {
    hideInMenu: true,
    layout: false,
    icon: '',
    path: '/home',
    routes: [
      {
        name: '主页',
        path: '/home',
        component: './Home',
      },
      { component: './404' },
    ],
  },
  {
    name: '监测站管理',
    icon: 'icon-zhanfangjiance',
    path: '/msManagement',
    routes: [
      {
        hideInMenu: true,
        name: '监测站',
        path: '/msManagement',
        component: './MsManagement',
      },
      {
        hideInMenu: true,
        layout: false,
        name: '全景展示',
        path: '/msManagement/panorama/:instanceId',
        component: './Panorama',
      },
      {
        hideInMenu: true,
        name: '站房详情',
        path: '/msManagement/stationDetail/:instanceId',
        component: './MsManagement/StationDetail',
      },
      {
        hideInMenu: true,
        name: '站房360全景',
        path: '/msManagement/panoramicConfig/:instanceId',
        component: './MsManagement/PanoramicConfig',
      },
      {
        hideInMenu: true,
        layout: false,
        name: '全景标注工具',
        path: '/msManagement/panoramicConfig/:instanceId/:id',
        component: './PanoramicTool',
      },
    ],
  },
  {
    name: '连接管理',
    icon: 'icon-link',
    path: '/connetionManagement',
    routes: [
      {
        hideInMenu: true,
        name: '连接报告',
        path: '/connetionManagement',
        component: './ConnetionManagement',
      },
      {
        hideInMenu: true,
        layout: false,
        path: '/connetionManagement/interfaceConfigureTool/:id',
        name: '连接配置',
        component: './InterfaceConfigureTool',
      },
    ],
  },
  {
    name: '客户管理',
    icon: 'icon-customer',
    path: '/customerManagement',
    routes: [
      {
        hideInMenu: true,
        path: '/customerManagement',
        name: '客户管理',
        component: './UserCenter/CustomerManagement',
      },
      {
        hideInMenu: true,
        path: '/customerManagement/add/:customerId',
        name: '新建客户',
        component: './UserCenter/CustomerManagement/edit',
      },
      {
        path: '/customerManagement/view/:customerId/:id',
        hideInMenu: true,
        name: '客户详情',
        component: './UserCenter/CustomerManagement/view',
      },
      {
        path: '/customerManagement/edit/:customerId/:id',
        hideInMenu: true,
        name: '修改客户',
        component: './UserCenter/CustomerManagement/edit',
      },
      {
        path: '/customerManagement/distribute/:customerId/:id',
        hideInMenu: true,
        name: '分配',
        component: './UserCenter/CustomerManagement/distribute',
      },
    ],
  },
  {
    path: '/userCenter/setting',
    name: '个人设置',
    icon: 'icon-personalsetting',

    component: './UserCenter/AccountSetting',
  },

  {
    path: '/systemManagement',
    name: '系统管理',
    icon: 'icon-setting',
    routes: [
      {
        path: '/systemManagement',
        redirect: '/systemManagement/menuManagement',
      },
      {
        path: '/systemManagement/menuManagement',
        name: '菜单管理',
        icon: 'icon-caidanguanli1',
        component: './SystemManagement/MenuManagement',
      },
      {
        path: '/systemManagement/roleManagement',
        name: '角色管理',
        icon: 'icon-jiaoseguanli',
        component: './SystemManagement/RoleManagement',
      },
      {
        path: '/systemManagement/logManagement',
        name: '日志管理',
        icon: 'icon-rizhiguanli',
        component: './SystemManagement/LogManagement',
      },

      { component: './404' },
    ],
  },
  { path: '/', redirect: '/msManagement' },
  { component: './404' },
];
