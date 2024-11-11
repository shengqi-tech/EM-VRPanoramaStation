/*
 * @Author: hugangyong 609210276@qq.com
 * @Date: 2023-11-28 10:04:01
 * @LastEditors: hugangyong 609210276@qq.com
 * @LastEditTime: 2024-02-04 11:12:10
 * @FilePath: \em360station-backend\config\defaultSettings.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '生态环境720全景自动监测站系统(EM720Station)',
  pwa: false,
  iconfontUrl: '/iconfont/iconfont.js',
  logo: '/logo.svg',
};

export default Settings;
