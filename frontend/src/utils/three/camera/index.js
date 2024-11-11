import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
let tween_flyTo;
export default {
  /**
   * 获取中心点
   * @param {*} viewer
   * @returns
   */
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

  /**
   * 重置相机
   * @param {*} position
   * @param {*} fov
   * @param {*} viewer
   */
  resetCamera(position, fov, viewer = window.viewer) {
    viewer.camera.position.set(position.x, position.y, position.z);
    viewer.camera.lookAt(viewer.scene.position);
    viewer.camera.fov = fov;
    viewer.camera.updateProjectionMatrix();
  },

  setCameraFov(fov, viewer = window.viewer) {
    viewer.camera.fov = fov;
    viewer.camera.updateProjectionMatrix();
  },

  /**
   * 1、用射线屏幕中心点到三维坐标并归一化，算出原点到中心点的向量。
   * 2、算出圆点到选中实体坐标点的向量。
   * 3、创建四元数、求出向量一到向量二的旋转矩阵。
   * 4、 把旋转矩阵应用于相机坐标点。
   * @param {*} position
   * @param {*} viewer
   */
  flyTo(params, viewer = window.viewer) {
    const { position, onComplete } = params;
    const camera = viewer.camera;
    const scene = viewer.scene;
    let point = this.getCenterPoint();

    const vec1 = new THREE.Vector3();
    vec1.subVectors(point, scene.position);
    vec1.normalize().multiplyScalar(1);

    const vec2 = new THREE.Vector3();
    vec2.subVectors(position, scene.position);
    vec2.normalize().multiplyScalar(1);

    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(vec1, vec2);

    let targetPosition = camera.position.clone();
    targetPosition.applyQuaternion(quaternion);

    const distance = targetPosition.distanceTo(camera.position);
    const duration = params.duration || distance;
    const fov = params.fov || camera.fov;

    const delay = params.delay || 0;
    if (tween_flyTo) {
      this.stopFlyTo();
    }

    tween_flyTo = new TWEEN.Tween({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      fov: camera.fov,
    })
      .to(
        { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z, fov: fov },
        duration * 1000,
      )
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function (p) {
        // 更新相机位置和fov
        camera.position.set(p.x, p.y, p.z);
        camera.fov = p.fov;
        camera.updateProjectionMatrix();
      })
      .delay(delay * 1000) // 延迟执行时间
      .start(); // 启动动画
    tween_flyTo.onComplete(function () {
      if (typeof onComplete === 'function') {
        onComplete();
      }
    });
  },

  stopFlyTo() {
    if (tween_flyTo) {
      tween_flyTo.stop();
      TWEEN.remove(tween_flyTo);
    }
  },

  pauseFlyTo() {
    if (tween_flyTo) {
      tween_flyTo.pause();
    }
  },
  resumeFlyTo() {
    if (tween_flyTo) {
      tween_flyTo.resume();
    }
  },
};
