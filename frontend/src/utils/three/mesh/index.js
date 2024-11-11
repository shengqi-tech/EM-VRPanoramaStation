import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
class Mesh {
  constructor(viewer) {
    this.viewer = viewer;
    this.meshs = null;
    this.init();
  }

  init() {
    this.meshs = new THREE.Group();
    this.meshs.name = "meshGroup";
    this.viewer.scene.add(this.meshs);
  }

  add3dText(opts) {
    let { name, position, rotation, scale } = opts;
    // 创建文字几何体
    const loader = new FontLoader();
    loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      var textGeometry = new TextGeometry(name, {
        font: font, // 加载字体数据
        size: 20,
        height: 1,
        curveSegments: 1,
      });
      // 创建材质
      var textMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      // 创建文字网格
      var textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(position.x, position.y, position.z);
      textMesh.rotation.set(
        rotation.x * (Math.PI / 180),
        rotation.y * (Math.PI / 180),
        rotation.z * (Math.PI / 180)
      );
      textMesh.scale.set(scale.x, scale.y, scale.z);
      textMesh.type = "text";
      this.meshs.add(textMesh);
    });
  }

  addPlane(params) {
    let { url, name, position, scale, rotation, width, height, visible } =
      params;
    const geometry = new THREE.PlaneGeometry(width, height);
    var texture = new THREE.TextureLoader().load(url);
    const plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture })
    );
    plane.name = name;
    plane.visible = visible;
    plane.position.set(position.x, position.y, position.z);
    plane.rotation.set(
      rotation.x * (Math.PI / 180),
      rotation.y * (Math.PI / 180),
      rotation.z * (Math.PI / 180)
    );
    plane.scale.set(scale.x, scale.y, scale.z);
    this.meshs.add(plane);
  }

  addSprite(params) {
    let { url, name, position, scale, flow, visible } = params;
    var pointTexture = new THREE.TextureLoader().load(url);
    var pointMaterial = new THREE.SpriteMaterial({
      map: pointTexture,
      depthTest: false,
    });
    pointTexture.colorSpace = THREE.SRGBColorSpace;
    let sprite = new THREE.Sprite(pointMaterial);
    sprite.name = name;
    sprite.flow = flow;
    sprite.visible = visible;
    sprite.scale.set(scale.x, scale.y, 1);
    sprite.initPosition = position;
    sprite.position.set(position.x, position.y, position.z);
    this.meshs.add(sprite);
    if (flow) {
      this.addFlowAnimation(sprite);
    }
  }

  addFlowAnimation(mesh) {
    const animation = () => {
      const time = Date.now() * 0.005;
      const init = mesh.initPosition.y;
      mesh.position.y = Math.cos(time) * 0.75 + init;
    };
    this.animaObject = {
      fun: animation,
      content: this,
    };
    this.viewer.addAnimate(this.animaObject);
  }

  show(name) {
    this.meshs.children.forEach((item) => {
      if (item.name == name) {
        item.visible = !item.visible;
      }
    });
  }

  animate(model) {
    const rotationObj = () => {
      model.rotation.x += 0.01;
    };
    this.animaObject = {
      fun: rotationObj,
      content: this,
    };
    this.viewer.addAnimate(this.animaObject);
  }

  remove(key, name) {
    this.meshs.children.forEach((item) => {
      if (item[key] == name) {
        this.meshs.remove(item);
      }
    });
  }

  addGui(mesh) {
    const gui = new GUI();
    gui.domElement.style.position = "fixed";
    gui.domElement.style.top = "0";
    gui.domElement.style.right = "0px";
    gui.domElement.style.zIndex = 9999;
    const position = gui.addFolder("");
    position.add(mesh.position, "x", -600, 600).name("postion-x").step(1);
    position.add(mesh.position, "y", -600, 600).name("postion-y").step(1);
    position.add(mesh.position, "z", -600, 600).name("postion-z").step(1);
    position.add(mesh.scale, "x", 0, 10).name("scaleX").step(0.001);
    position.add(mesh.scale, "y", 0, 10).name("scaleY").step(0.001);
    position.add(mesh.scale, "z", 0, 10).name("scaleZ").step(0.001);
    position.add(mesh.rotation, "x", -180, 180).name("rotationX").step(1);
    position.add(mesh.rotation, "y", -180, 180).name("rotationY").step(1);
    position.add(mesh.rotation, "z", -180, 180).name("rotationZ").step(1);
  }
}
export { Mesh };
