import * as THREE from 'three';
let onPointerDownMouseX = 0,
  onPointerDownMouseY = 0,
  onPointerDownHeading = 0,
  onPointerDownPitch = 0,
  heading = -180,
  pitch = 0,
  phi = 0,
  theta = 0;
class Util {
  constructor(viewer) {
    this.viewer = viewer;
    this.init();
  }

  init() {}

  clearBackground() {
    this.viewer.scene.background = null;
    this.viewer.renderer.setClearColor('#ffffff', 0);
  }

  clearAll() {
    if (this.viewer.scene) {
      window.cancelAnimationFrame(this.viewer.requestAnimation);
      this.viewer.scene.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        child = null;
      });
      let meshs = this.viewer.scene.children;
      meshs.forEach((group) => {
        for (var i = group.children.length - 1; i >= 0; i--) {
          group.remove(group.children[i]);
        }
      });
      this.viewer.renderer.dispose();
      this.viewer.renderer.forceContextLoss();
      this.viewer.renderer.domElement = null;
      this.viewer.renderer = null;
      this.viewer.css2dRenderer = null;
      this.viewer.scene.clear();
      this.viewer.scene = null;
      this.viewer.camera = null;
      this.viewer.controls = null;
      this.viewer.render = null;
      this.viewer.animateEventList = [];
    }
  }

  removeAll() {
    let meshs = this.viewer.scene.children;
    meshs.forEach((group) => {
      for (var i = group.children.length - 1; i >= 0; i--) {
        group.remove(group.children[i]);
      }
    });
    this.viewer.animateEventList = [];
  }

  resetCamera(position) {
    this.viewer.camera.position.set(position.x, position.y, position.z);
    this.viewer.camera.lookAt(this.viewer.scene.position);
  }

  // 控制 控制器自动旋转
  operateControlAnimation(flag) {
    this.viewer.orbitControls.autoRotate = flag;
  }

  animate() {
    const animation = () => {
      pitch = Math.max(-85, Math.min(85, pitch));
      phi = THREE.MathUtils.degToRad(90 - pitch);
      theta = THREE.MathUtils.degToRad(heading);
      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);
      this.viewer.camera.lookAt(x, y, z);
    };
    this.animaObject = {
      fun: animation,
      content: this,
    };
    this.viewer.addAnimate(this.animaObject);
  }
}
export { Util };
