import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
export default {
  /**
   *
   * @param {*} viewer
   * @param {*} Sx 屏幕坐标x
   * @param {*} Sy 屏幕坐标y
   * @returns
   */
  getPointByScreen(viewer = window.viewer, Sx, Sy) {
    const x = (Sx / viewer.container?.offsetWidth) * 2 - 1;
    const y = (-Sy / viewer.container?.offsetHeight) * 2 + 1;
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), viewer.camera);
    var intersects = raycaster.intersectObjects(viewer.scene.children, true);
    if (intersects.length > 0) {
      const res = intersects.filter(function (res) {
        return res && res.object && res.object.name == 'panorama';
      })[0];
      if (res && res.object) {
        return res.point;
      }
    }
  },

  /**
   * 获取当前相机视角
   * @param {*} viewer
   * @returns
   */
  getCameraPosition(viewer = window.viewer) {
    return viewer.camera.position;
  },

  /**
   * 获取threejs当前视图图像数据
   * @param {*} viewer
   * @returns
   */
  getThreeCanvasImgData(viewer = window.viewer) {
    let canvas = viewer.renderer.domElement;
    viewer.renderer.render(viewer.scene, viewer.camera);
    var imageData = canvas.toDataURL('image/png');
    return imageData;
  },

  setCamera(viewer = window.viewer) {
    let mesh = viewer.scene.children.find((item) => {
      return item.name == 'panoramaGroup';
    });
    const camera = viewer.camera;
    const tween = new TWEEN.Tween({
      fov: 100,
      h: 50,
      rot: 0,
    }).easing(TWEEN.Easing.Quadratic.Out);
    tween.to(
      {
        fov: 50,
        h: 0,
        rot: Math.PI * 1.01,
      },
      2500,
    );
    tween.onUpdate(function (t) {
      // 视角由大到小
      camera.fov = t.fov;
      camera.position.set(0, t.h, 1);
      camera.updateProjectionMatrix();
      mesh.rotation.y = t.rot;
    });
    tween.onComplete(function () {
      TWEEN.remove(tween);
    });
    tween.start();
  },

  setViewAnimation(params, viewer = window.viewer) {
    let { autoRotate, autoRotateSpeed, angel } = params;
    viewer.orbitControls.autoRotate = autoRotate;
    viewer.orbitControls.autoRotateSpeed = autoRotateSpeed;
    viewer.orbitControls.minAzimuthAngle = ((-angel + 180) * Math.PI) / 180;
    viewer.orbitControls.maxAzimuthAngle = ((angel + 180) * Math.PI) / 180;
  },

  autoRotate(flag, speed = 0.2) {
    viewer.orbitControls.autoRotate = flag;
    viewer.orbitControls.autoRotateSpeed = speed;
  },

  // 获取中心点
  getCenterPoint(viewer = window.viewer) {
    const Sx = viewer.container?.offsetWidth / 2;
    const Sy = viewer.container?.offsetHeight / 2;
    const x = (Sx / viewer.container?.offsetWidth) * 2 - 1;
    const y = (-Sy / viewer.container?.offsetHeight) * 2 + 1;
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), viewer.camera);
    var intersects = raycaster.intersectObjects(viewer.scene.children, true);
    if (intersects.length > 0) {
      const res = intersects.filter(function (res) {
        return res && res.object;
      })[0];
      if (res && res.object) {
        return res.point;
      }
    }
  },

  changeView(translateType, step, viewer = window.viewer) {
    viewer.camera[translateType](step);
  },
};
