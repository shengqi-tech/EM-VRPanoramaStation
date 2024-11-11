import * as THREE from 'three';
class Event {
  constructor(viewer) {
    this.viewer = viewer;
    this.init();
  }

  init() {
    this.container = this.viewer.container;
    this.camera = this.viewer.camera;
    this.scene = this.viewer.scene;
  }

  getMeshByClick(callback) {
    this.container.addEventListener('click', (event) => {
      const Sx = event.offsetX;
      const Sy = event.offsetY;
      const x = (Sx / this.container?.offsetWidth) * 2 - 1;
      const y = (-Sy / this.container?.offsetHeight) * 2 + 1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);
      var intersects = raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        const res = intersects.filter(function (res) {
          return res && res.object;
        })[0];
        if (res && res.object) {
          if (res.object.selectAble == true) {
            const selectedObject = res.object;
          }
          callback(res.object);
        }
      } else {
      }
    });
  }
}
export { Event };
