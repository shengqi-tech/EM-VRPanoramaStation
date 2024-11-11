import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
class Css2dObject {
  constructor(viewer) {
    this.viewer = viewer;
    this.meshs = null;
    this.init();
  }
  init() {
    this.meshs = new THREE.Group();
    this.meshs.name = "cssObjectGroup";
    this.viewer.scene.add(this.meshs);
  }

  show(key, name, visible = false) {
    this.meshs.children.forEach((item) => {
      if (item[key] == name) {
        item.visible = visible;
      }
    });
  }

  remove(key, name) {
    this.meshs.children.forEach((item) => {
      if (item[key] == name) {
        this.meshs.remove(item);
      }
    });
  }

  showAll(visible) {
    this.meshs.children.forEach((item) => {
      item.visible = visible;
    });
  }
}
export { Css2dObject };
