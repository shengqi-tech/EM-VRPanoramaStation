import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined, createFromIconfontCN } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer, MenuDataItem } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import { ResponseError } from 'umi-request';
import { history, Link, NavLink } from 'umi';
import { Space } from 'antd';
import { stringify } from 'querystring';
import useMyLocalStorage from '@/utils/mylocalstorage';
import defaultSettings from '../config/defaultSettings';
import { getCurrentUser as getUser } from '@/services/swagger/sysuserController';
import { findMenusByUserId } from '@/services/swagger/itemController';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const IconFont = createFromIconfontCN({
  scriptUrl: '/iconfont/iconfont.js',
});

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.SysuserVoRes;
  token?: string;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.SysuserVoRes | undefined>;
}> {
  if (window.USER_Token) {
    const token = window.USER_Token;
    localStorage.setItem('sq-token', JSON.stringify(token));
  }
  const fetchUserInfo = async () => {
    try {
      const { getCurrentUser, savaCurrentUser } = useMyLocalStorage();
      let currentUser = getCurrentUser();
      if (!currentUser) {
        const msg = await getUser();
        currentUser = msg?.result;
        savaCurrentUser(currentUser);
      }
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    const { getToken } = useMyLocalStorage();
    const token = getToken();
    return {
      fetchUserInfo,
      currentUser,
      token,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // 水印
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],

    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: initialState,
      request: async (params, defaultMenuData) => {
        const loopMenuItem = (items: any) =>
          items.map((item: API.Item) => ({
            path: item.ems_item_path,
            name: item.ems_item_name,
            // component: item.ems_item_component,
            icon: item.ems_item_icon,
            children: loopMenuItem(item.ems_item_items),
          }));
        const res: API.Item = await findMenusByUserId({
          mpi_sysuser_id: initialState?.currentUser?.ems_sysuser_id,
        });
        const menus: MenuDataItem[] = loopMenuItem(res?.result);

        // const fixMenuItemIcon = (menus: MenuDataItem[] | any, iconType = 'Outlined'): MenuDataItem[] => {
        //   menus.forEach((item: { icon: any; children: any }) => {
        //     const { icon, children } = item;
        //     if (typeof icon === 'string') {
        //       const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
        //       item.icon = < IconFont type={item.icon.toString()} />;
        //     }
        //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        //     children && children.length > 0 ? (item.children = fixMenuItemIcon(children)) : null;
        //   });
        //   return menus;
        // };
        // return fixMenuItemIcon(menus);
        return menus;
      },
    },
    menuItemRender: (item, dom) =>
      !item.children ? (
        <NavLink to={item.path ? item.path : '#'}>
          <Space size={15}>
            {item.icon && <IconFont type={item.icon.toString()} />}
            {item.name}
            {/* {item.icon &&<svg class="iconfont" aria-hidden="true"><use href={item.icon.toString()} /></svg>} */}
          </Space>
        </NavLink>
      ) : null,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/* {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )} */}
        </>
      );
    },
    ...initialState?.settings,
  };
};

const authHeaderInterceptorRequest = (url: string, options: any) => {
  const { getToken } = useMyLocalStorage();
  const token: string = getToken();
  if (token) {
    const authHeader = { Authorization: `Bearer ${token}` };
    return {
      url: '/api' + url,
      options: { ...options, interceptors: true, headers: authHeader },
    };
  } else {
    return {
      url: '/api' + url,
      options: { ...options, interceptors: true },
    };
  }
};

// response拦截器, 处理response
const authHeaderInterceptorResponse = (response: Response) => {
  const responseCopy = response.clone();
  // let token = response.headers.get("Authorization");
  // let token = response.headers.get("Authorization");
  responseCopy.json().then((data) => {
    // console.log(data);
    if (data?.code == 401) {
      //token超时，用户没有权限（令牌、用户名、密码错误）。

      // if (!token) {
      const { savaCurrentUser, savaToken } = useMyLocalStorage();
      savaCurrentUser(undefined);
      savaToken('');
      // }
      const { query = {}, search, pathname } = history.location;
      const { redirect } = query;
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: pathname + search,
          }),
        });
      }
      // history.replace({
      //   pathname: loginPath,
      // });
    }
  });

  return response;
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;

  //如果出现异常 则跳转至登录页面
  if (response?.status != 200) {
    const { query = {}, search, pathname } = history.location;
    const { redirect } = query;
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  }
  throw error;
};

export const request: RequestConfig = {
  timeout: 50000,
  errorHandler,
  middlewares: [],
  requestInterceptors: [authHeaderInterceptorRequest],
  responseInterceptors: [authHeaderInterceptorResponse],
};
