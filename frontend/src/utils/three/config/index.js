// 默认的配置
export const DEFAULT_CONFIG = {
  domId: 'webgl-output',

  cameraPosition: {
    x: 0,
    y: 0,
    z: 1,
  },
  fov: 50,
  near: 1,
  far: 10000,
  rendererOptions: {},
  clearColor: '#041022', // 背景颜色
  helper: 0, // AxesHelper
  exposure: 1, // 曝光值
  enableDamping: true, // 启用阻尼（惯性）
  dampingFactor: 0.1, // 阻尼系数
};
