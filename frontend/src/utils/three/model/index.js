import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
class Model {
  constructor(viewer) {
    this.viewer = viewer;
    this.meshs = null;
    this.model = null;
    this.curve = null;
    this.progress = 0; // 物体运动时在运动路径的初始位置，范围0~1
    this.velocity = 0.002; // 影响运动速率的一个值，范围0~1，需要和渲染频率结合计算才能得到真正的速率

    this.init();
  }

  init() {
    this.meshs = new THREE.Group();
    this.meshs.name = 'modelGroup';
    this.viewer.scene.add(this.meshs);
    this.loadModel();
    this.makeCurve();
    this.moveOnCurve();
  }

  remove() {
    this.viewer.scene.remove(this.meshs);
  }

  loadModel() {
    // 加载模型并开启阴影和接受阴影
    const gltfLoader = new GLTFLoader();
    let url = require('@/assets/model/glb/Xbot.glb');
    gltfLoader.load(url, (gltf) => {
      // gltf.scene.rotation.y = Math.PI;
      let model = gltf.scene;
      this.model = model;
      model.traverse(function (object) {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
      model.scale.set(15, 15, 15);
      model.position.set(10, -25, 23.54);
      model.rotation.set(0, (-135 / 180) * Math.PI, 0);

      const animations = gltf.animations;
      const mixer = new THREE.AnimationMixer(model);
      mixer.timeScale = 0.7;
      const action = mixer.clipAction(animations[0]);
      action.play();

      this.animateObj(mixer);

      this.meshs.add(model);
      this.addMaterialForObj(model);
    });
  }

  addMaterialForObj(model) {
    // 建筑面材质
    let buildMaterial = new THREE.MeshBasicMaterial({
      color: '#05fbff', // 颜色
      transparent: true, // 是否开启使用透明度
      opacity: 0.5, // 透明度
      depthWrite: false, // 关闭深度写入 透视效果
      depthTest: false,
      side: THREE.DoubleSide, // 双面显示
    });
    model.traverse((e) => {
      e.material = buildMaterial; // 赋模型材质
    });
  }

  makeCurve() {
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9, -25, 23.54),
      new THREE.Vector3(10, -25, 16),
    ]);
    this.curve.curveType = 'catmullrom';
    this.curve.closed = true; //设置是否闭环
    this.curve.tension = 0.5; //设置线的张力，0为无弧度折线

    // // 为曲线添加材质在场景中显示出来，不显示也不会影响运动轨迹，相当于一个Helper
    // const points = this.curve.getPoints(50);
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    // const curveObject = new THREE.Line(geometry, material);
    // this.viewer.scene.add(curveObject);
  }

  // 物体沿线移动方法
  moveOnCurve() {
    if (this.curve == null || this.model == null) {
      console.log('Loading', this.model);
    } else {
      if (this.progress <= 1 - this.velocity) {
        const point = this.curve.getPointAt(this.progress); //获取样条曲线指定点坐标
        const pointBox = this.curve.getPointAt(this.progress + this.velocity); //获取样条曲线指定点坐标
        if (point && pointBox) {
          this.model.position.set(point.x, point.y, point.z);
          // this.model.lookAt(pointBox.x, pointBox.y, pointBox.z);//因为这个模型加载进来默认面部是正对Z轴负方向的，所以直接lookAt会导致出现倒着跑的现象，这里用重新设置朝向的方法来解决。
          var targetPos = pointBox; //目标位置点
          var offsetAngle = 0; //目标移动时的朝向偏移
          // //以下代码在多段路径时可重复执行
          var mtx = new THREE.Matrix4(); //创建一个4维矩阵
          // .lookAt ( eye : Vector3, target : Vector3, up : Vector3 ) : this,构造一个旋转矩阵，从eye 指向 target，由向量 up 定向。
          mtx.lookAt(targetPos, this.model.position, this.model.up); //设置朝向
          mtx.multiply(
            new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, offsetAngle, 0)),
          );
          var toRot = new THREE.Quaternion().setFromRotationMatrix(mtx); //计算出需要进行旋转的四元数值
          this.model.quaternion.slerp(toRot, 0.2);
        }
        this.progress += this.velocity;
      } else {
        this.progress = 0;
      }
    }
  }

  animateObj(mixer) {
    var clock = new THREE.Clock();
    const animationObj = () => {
      if (mixer) {
        mixer.update(clock.getDelta());
      }
      //   this.moveOnCurve();
    };
    this.animaObject = {
      fun: animationObj,
      content: this,
    };
    this.viewer.addAnimate(this.animaObject);
  }
}
export { Model };
