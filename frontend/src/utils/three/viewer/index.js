import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper.js';
import TWEEN from '@tweenjs/tween.js';
import { DEFAULT_CONFIG } from '../config';
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
class Viewer {
  constructor(config) {
    const dConfig = DEFAULT_CONFIG;
    if (isObject(config)) {
      Object.assign(dConfig, config);
    }

    const { fov, near, far, cameraPosition, clearColor, domId, enableDamping, dampingFactor } =
      dConfig;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x041022);
    this.container = document.getElementById(domId);
    var width = this.container?.clientWidth;
    var height = this.container?.clientHeight;

    // 相机
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    this.camera.position.copy(cameraPosition);
    this.camera.lookAt(this.scene.position);

    // css2dRenderer

    this.css2dRenderer = new CSS2DRenderer();
    this.css2dRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.css2dRenderer.domElement.style.position = 'absolute';
    this.css2dRenderer.domElement.style.top = '0px';
    this.container?.appendChild(this.css2dRenderer.domElement);

    // css3dRenderer
    this.css3dRenderer = new CSS3DRenderer();
    this.css3dRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.css3dRenderer.domElement.style.position = 'absolute';
    this.css3dRenderer.domElement.style.top = 0;
    this.container?.appendChild(this.css3dRenderer.domElement);

    // 光源
    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    // hemiLight.position.set(0, 20, 0);
    // this.scene.add(hemiLight);
    // const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    // dirLight.position.set(3, 10, 10);
    // dirLight.castShadow = true;
    // dirLight.shadow.camera.top = 2;
    // dirLight.shadow.camera.bottom = -2;
    // dirLight.shadow.camera.left = -2;
    // dirLight.shadow.camera.right = 2;
    // dirLight.shadow.camera.near = 0.1;
    // dirLight.shadow.camera.far = 40;
    // this.scene.add(dirLight);
    const canvas = document.createElement('canvas');
    canvas.id = 'threeCanvas'; // 设置 id 属性
    // 开启抗锯齿
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    // 从配置中设置背景颜色
    this.renderer.setClearColor(clearColor, 1);
    // 表示启用阴影贴图，
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    // 将启用正确的物理灯光。
    this.renderer.physicallyCorrectLights = true;
    this.container?.append(this.renderer.domElement);

    // 控制器
    this.orbitControls = new OrbitControls(this.camera, this.css3dRenderer.domElement);
    this.orbitControls.enableDamping = enableDamping;
    this.orbitControls.dampingFactor = dampingFactor;

    // 视图
    this.viewHelper = new ViewHelper(this.camera, this.renderer.domElement);

    // 屏幕变化
    const onresize = () => {
      const width = this.container?.offsetWidth;
      const height = this.container?.offsetHeight;
      this.renderer.setSize(width, height);
      this.css2dRenderer.setSize(width, height);
      this.css3dRenderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    };

    function debounce(callback, delay) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          callback(...args);
        }, delay);
      };
    }
    // 创建 ResizeObserver 实例
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        debounce(onresize, 16)();
      }
    });
    resizeObserver.observe(this.container);

    this.animateEventList = []; //动画事件集合
    this.requestAnimation = undefined;
    this.render();
  }

  render(time) {
    if (this.orbitControls) {
      this.orbitControls.update();
    }
    this.requestAnimation = requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.css2dRenderer.render(this.scene, this.camera);
    this.css3dRenderer.render(this.scene, this.camera);

    this.renderer.autoClear = false;
    this.viewHelper.render(this.renderer);
    this.renderer.autoClear = true;
    TWEEN.update(time);
    this.animateEventList.forEach((event) => {
      event.fun && event.content && event.fun(event.content);
    });
  }

  addAnimate(animate) {
    this.animateEventList.push(animate);
  }

  removeAnimate(animate) {
    this.animateEventList.map((val, i) => {
      if (val === animate) this.animateEventList.splice(i, 1);
    });
  }
}
export { Viewer };
