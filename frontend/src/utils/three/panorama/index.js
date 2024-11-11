import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import TWEEN from '@tweenjs/tween.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { Drag, Resize } from '../xThree';
class Panorama {
  constructor(viewer) {
    this.viewer = viewer;
    this.panoramaGroups = null; //全景集合
    this.panoramaBox = null; // 全景box
    this.panoramaImgs = []; // 渲染全景所需照片
    this.textureArray = [];
    this.toTextureArray = [];
    this.materialArray = []; // 全景材质数组 6面
    this.materialIndexs = []; // 全景材质 6面下标 px nx py ny pz nz
    this.dragMeshs = []; // 可拖拽mesh集合
    this.dragControl = null; // 拖拽控制器
    this.loadingManager = null; // 加载器
    this.selectControl = null;
    this.resize = null;
    this.currentObject = null;
    this.raycaster = new THREE.Raycaster();

    this.minFov = 10;
    this.maxFov = 50;
    this._init();
  }

  _init() {
    this.panoramaGroups = new THREE.Group();
    this.panoramaGroups.name = 'panoramaGroup';
    this.viewer.orbitControls.enablePan = false;
    this.viewer.orbitControls.maxDistance = 20;
    this.viewer.orbitControls.rotateSpeed = -0.5;
    this.viewer.scene.add(this.panoramaGroups);
    this.addMouseWheel();
    this.addTouch();
  }

  addTouch() {
    this.viewer.orbitControls.enableZoom = false;
    var scaleRatio = 0;
    var start = 0;
    document.addEventListener(
      'touchstart',
      (event) => {
        if (event.touches.length == 2) {
          this.viewer.orbitControls.enabled = false;
          var first = event.touches[0];
          var second = event.touches[1];
          var distance = Math.sqrt(
            Math.pow(first.clientX - second.clientX, 2) +
              Math.pow(first.clientY - second.clientY, 2),
          );
          start = distance / 100;
        }
      },
      false,
    );
    document.addEventListener(
      'touchmove',
      (event) => {
        if (event.touches.length == 2) {
          var first = event.touches[0];
          var second = event.touches[1];
          var distance = Math.sqrt(
            Math.pow(first.clientX - second.clientX, 2) +
              Math.pow(first.clientY - second.clientY, 2),
          );
          scaleRatio = distance / 100;
          let y = 1;
          if (scaleRatio > start) {
            y = -1;
          } else {
            y = 1;
          }
          this.viewer.orbitControls.enabled = false;
          const camera = this.viewer.camera;
          const fov = camera.fov + y;
          camera.fov = THREE.MathUtils.clamp(fov, 10, 50);
          camera.updateProjectionMatrix();
        } else {
          this.viewer.orbitControls.enabled = true;
        }
      },
      false,
    );
    document.addEventListener(
      'touchend',
      (event) => {
        if (event.touches.length == 2) {
          var first = event.touches[0];
          var second = event.touches[1];
          var distance = Math.sqrt(
            Math.pow(first.clientX - second.clientX, 2) +
              Math.pow(first.clientY - second.clientY, 2),
          );
          scaleRatio = distance / 100;
          this.viewer.orbitControls.enabled = true;
        }
      },
      false,
    );
    // 缩放比例
  }

  add3dObject(params) {
    let { data, position } = params;
    let { width, height, text, type } = data;
    const element = document.createElement('div');
    element.draggable = false;
    element.id = data?.id;
    element.className = 'css3dObject';

    element.style.width = (width || 30) + 'px';
    element.style.height = (height || 30) + 'px';

    // 添加可拖拽点
    const pointRight = document.createElement('span');
    pointRight.className = 'css3dObject-pointRight';
    element.appendChild(pointRight);
    // 需优化
    this.resize = new Resize(pointRight, element);

    // 添加图片框元素
    const imgbox = document.createElement('div');
    imgbox.className = 'css3dObject-imgbox';
    imgbox.draggable = false;
    element.appendChild(imgbox);
    const img = document.createElement('img');
    img.draggable = false;
    img.style.width = '100%';
    img.style.height = '100%';
    img.src = data?.url;
    imgbox.appendChild(img);
    if (data && data.imgType == 'FrameAnimation') {
      img.className = 'frame-animation';
    }

    // 添加数据展示
    const dataBox = document.createElement('div');
    dataBox.classList.add('data-box');
    element.appendChild(dataBox);

    // 添加文字框元素
    const textBox = document.createElement('div');
    textBox.classList.add('text-box');
    element.appendChild(textBox);
    textBox.innerText = text || '';

    // 添加iframe
    if (type == 'iframe') {
      const iframeBox = document.createElement('iframe');
      iframeBox.classList.add('iframe-box');
      element.appendChild(iframeBox);
    }
    // 添加video
    if (type == 'video') {
      const videoBox = document.createElement('video');
      videoBox.classList.add('video-box');
      videoBox.setAttribute('x5-video-player-type', 'h5-page');
      videoBox.setAttribute('webkit-playsinline', 'true');
      videoBox.setAttribute('playsinline', 'true');
      element.appendChild(videoBox);
    }
    // 添加cover
    if (type == 'image') {
      const cover = document.createElement('img');
      cover.draggable = false;
      cover.classList.add('cover-box');
      element.appendChild(cover);
    }

    // threejs 添加3dobject
    const object = new CSS3DObject(element);
    object.data = data;
    object.scale.set(0.05, 0.05, 0.05);
    object.position.copy(position);
    object.rotation.copy(this.viewer.camera.rotation);
    this.panoramaGroups.add(object);
    this.dragMeshs.push(object);
    this.currentObject = object;
    return object;
  }

  addElement(params) {
    const { element, position, rotation, name } = params;
    const object = new CSS3DObject(element);
    object.scale.set(0.03, 0.03, 0.03);
    object.position.copy(position);
    object.rotation.set(rotation._x, rotation._y, rotation._z);
    object.name = name;
    this.panoramaGroups.add(object);
    return object;
  }

  addScaleAnimation(object) {
    // 定义缩放动画
    let scaleDirection = 1; // 用于控制缩放方向的标志，1表示放大，-1表示缩小
    const animation = () => {
      const scaleSpeed = 0.0001; // 缩放速度
      if (object.scale.x > 0.032) scaleDirection = -1; // 如果对象太大，则开始缩小
      else if (object.scale.x < 0.028) scaleDirection = 1; // 如果对象太小，则开始放大
      // 根据缩放方向调整缩放比例
      object.scale.x += scaleSpeed * scaleDirection;
      object.scale.y += scaleSpeed * scaleDirection;
      object.scale.z += scaleSpeed * scaleDirection;
    };

    let animaObject = {
      fun: animation,
      content: this,
    };
    this.viewer.addAnimate(animaObject);
  }

  removeObejctByName(name) {
    for (var i = this.panoramaGroups.children.length - 1; i >= 0; i--) {
      if (this.panoramaGroups.children[i].name === name) {
        this.panoramaGroups.remove(this.panoramaGroups.children[i]);
      }
    }
  }

  initDragControl(callback) {
    if (this.dragControl) this.dragControl.dispose();
    this.dragControl = new Drag(this.dragMeshs, this.viewer, this.viewer.css3dRenderer.domElement);
    this.dragControl.addEventListener('drag', (event) => {
      this.currentObject = event.object;
      callback(this.currentObject);
    });
    this.dragControl.addEventListener('dragstart', (event) => {
      this.currentObject = event.object;
      callback(this.currentObject);
      this.viewer.orbitControls.enableRotate = false;
    });
    this.dragControl.addEventListener('dragend', (event) => {
      this.currentObject = event.object;
      this.viewer.orbitControls.enableRotate = true;
    });
  }

  /**
   * 选中css3Dobject实体事件
   * @param {*} callback
   */
  handleClickSelected(callback) {
    const selectControl = (event) => {
      const elements = document.elementsFromPoint(event.clientX, event.clientY);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (
          element.classList.contains('css3dObject-pointRight') ||
          element.classList.contains('alarm-popup')
        ) {
          return;
        }
        if (element.classList.contains('css3dObject')) {
          const _selected = this.dragMeshs.find((item) => {
            return item.data.id == element.id;
          });
          this.currentObject = _selected;
          callback(this.currentObject);
          return;
        }
      }
    };
    let _domElement = this.viewer.css3dRenderer.domElement;
    this.selectControl = selectControl;
    _domElement.addEventListener('click', selectControl);
  }

  cancelClickSelected() {
    let _domElement = this.viewer.css3dRenderer.domElement;
    _domElement.removeEventListener('click', this.selectControl);
  }

  disposeDragControl() {
    if (this.dragControl) this.dragControl.dispose();
  }

  getCurrentObject() {
    return this.currentObject;
  }

  //
  changeCameraParams(params) {
    let { fovs, azimuthAngle, polarAngle } = params;
    this.minFov = fovs[0];
    this.maxFov = fovs[1];
    const controls = this.viewer.orbitControls;
    // 设置最大水平和垂直角度
    if (azimuthAngle[0] == -180 && azimuthAngle[1] == 180) {
      this.viewer.orbitControls.minAzimuthAngle = -Infinity;
      this.viewer.orbitControls.maxAzimuthAngle = Infinity;
    } else {
      controls.maxAzimuthAngle = azimuthAngle[1] * (Math.PI / 180);
      controls.minAzimuthAngle = azimuthAngle[0] * (Math.PI / 180);
    }
    controls.maxPolarAngle = (polarAngle[1] + 90) * (Math.PI / 180);
    controls.minPolarAngle = (polarAngle[0] + 90) * (Math.PI / 180);
    // this.minFov = minFov;
  }

  // 滚轮移动事件 需优化
  addMouseWheel() {
    this.viewer.orbitControls.enableZoom = false;
    this.viewer.container.addEventListener('wheel', (event) => {
      event.preventDefault();
      const camera = this.viewer.camera;
      const fov = camera.fov + event.deltaY * 0.02;
      camera.fov = THREE.MathUtils.clamp(fov, this.minFov, this.maxFov);
      camera.updateProjectionMatrix();
      if (fov < 30 && fov > 27) {
        let indexs = this.getFaceMaterialIndex();
        indexs.forEach((item) => {
          if (this.materialIndexs.includes(item)) {
          } else {
            this.updateMaterial(item);
            this.materialIndexs.push(item);
          }
        });
      }
    });
    this.viewer.orbitControls.addEventListener('end', () => {
      const camera = this.viewer.camera;
      const fov = camera.fov;
      if (fov < 30) {
        let indexs = this.getFaceMaterialIndex();
        indexs.forEach((item) => {
          if (this.materialIndexs.includes(item)) {
          } else {
            this.updateMaterial(item);
            this.materialIndexs.push(item);
          }
        });
      }
    });
  }

  // 三点获取当前视角的面
  getFaceMaterialIndex() {
    const getIndex = (point) => {
      this.raycaster.setFromCamera(point, this.viewer.camera);
      const intersects = this.raycaster.intersectObject(this.panoramaBox, true);
      if (intersects.length > 0) {
        const res = intersects.filter(function (res) {
          return res && res.object;
        })[0];
        if (res && res.object) {
          return res.face.materialIndex;
        }
      }
    };
    let index1 = getIndex(new THREE.Vector2(-1, 0));
    let index2 = getIndex(new THREE.Vector2(0, 0));
    let index3 = getIndex(new THREE.Vector2(1, 0));
    return Array.from(new Set([index1, index2, index3]));
  }

  // 切换场景
  changeScene() {
    this.removeAll();
    var move_begin = {
      mix: 0,
    };
    var tween = new TWEEN.Tween(move_begin);
    tween
      .to({ mix: 1 }, 1600)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        // this.viewer.camera.fov -= 0.1;
        // this.viewer.camera.updateProjectionMatrix();
        document.time = move_begin.mix;
        if (document.time < 1) {
          for (let i = 0; i < 6; i++) {
            this.materialArray[i].uniforms.time.value = document.time;
            this.viewer.renderer.render(this.viewer.scene, this.viewer.camera);
          }
        }
      })
      .start();
  }

  // 设置目标全景材质
  setToPanoramaImg(panoramaImgs) {
    var textureArray = [];
    const loadingManager = new THREE.LoadingManager();
    var texturepx = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('px'));
    var texturenx = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('nx'));
    var texturepy = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('py'));
    var textureny = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('ny'));
    var texturepz = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('pz'));
    var texturenz = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('nz'));
    textureArray.push(texturepx, texturenx, texturepy, textureny, texturepz, texturenz);
    this.loadingManager = loadingManager;
    this.toTextureArray = textureArray;
    this.update();
  }

  // 设置全景材质
  setPanoramaImg(panoramaImgs) {
    var textureArray = [];
    const loadingManager = new THREE.LoadingManager();
    var texturepx = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('px'));
    var texturenx = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('nx'));
    var texturepy = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('py'));
    var textureny = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('ny'));
    var texturepz = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('pz'));
    var texturenz = new THREE.TextureLoader(loadingManager).load(panoramaImgs.get('nz'));
    textureArray.push(texturepx, texturenx, texturepy, textureny, texturepz, texturenz);
    this.textureArray = textureArray;
    this.loadingManager = loadingManager;

    this.panoramaImgs = panoramaImgs;
  }

  // 添加全景
  init() {
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    geometry.scale(1, 1, -1);
    document.time = 0;
    this.panoramaBox = new THREE.Mesh(geometry, this.materialArray);
    this.update();
    this.panoramaBox.name = 'panorama';
    this.panoramaGroups.add(this.panoramaBox);
  }

  update() {
    this.materialArray = [];
    for (let i = 0; i < 6; i++) {
      this.materialArray.push(
        new THREE.ShaderMaterial({
          // lights: true,
          uniforms: {
            texture1: {
              value: this.textureArray[i],
            },
            texture2: {
              value: this.toTextureArray[i],
            },
            time: {
              value: document.time,
            },
          },
          vertexShader: `
          varying vec2 vUv;
          void main(){
              vUv = uv;
              gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
          }
          `,
          fragmentShader: `
          uniform sampler2D texture1;
          uniform sampler2D texture2;
          uniform float time;
          varying vec2 vUv;
          void main() {
              gl_FragColor = mix(texture2D( texture1, vUv ),texture2D( texture2, vUv ), time);
           }
          `,
          side: THREE.DoubleSide,
        }),
      );
    }
    this.panoramaBox.material = this.materialArray;
  }

  getLoadingManager() {
    return this.loadingManager;
  }

  // 全景初始视角
  initView(position) {
    if (position && position.x && position.y && position.z) {
      this.viewer.camera.position.set(position.x, position.y, position.z);
    } else {
      this.viewer.camera.position.set(0, 0, 1);
    }
  }

  // 移除全景
  dispose() {
    for (var i = this.panoramaGroups.children.length - 1; i >= 0; i--) {
      this.panoramaGroups.remove(this.panoramaGroups.children[i]);
    }
    this.dragMeshs.splice(0, this.dragMeshs.length);
    this.materialArray = [];
  }

  // 移除全景内所有实体
  removeAll() {
    for (var i = this.panoramaGroups.children.length - 1; i >= 0; i--) {
      if (this.panoramaGroups.children[i].name !== 'panorama') {
        this.panoramaGroups.remove(this.panoramaGroups.children[i]);
      }
    }
    this.dragMeshs.splice(0, this.dragMeshs.length);
  }

  // 更新材质
  updateMaterial(materialIndex) {
    const uniforms = {};
    const loadingManager = new THREE.LoadingManager(() => {
      this.materialArray[materialIndex] = material;
      this.panoramaBox.materials = this.materialArray;
    });
    let nameMap = new Map([
      [0, 'px'],
      [1, 'nx'],
      [2, 'py'],
      [3, 'ny'],
      [4, 'pz'],
      [5, 'nz'],
    ]);
    for (var i = 1; i < 5; i++) {
      let name = nameMap.get(materialIndex) + '-' + i;
      uniforms[`texture${i}`] = {
        value: new THREE.TextureLoader(loadingManager).load(this.panoramaImgs.get(name)),
      };
    }
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
      varying vec2 vUv;
      uniform float offsetX;
      uniform float offsetY;
      uniform float offsetZ;
      void main(){
          vUv = uv;
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position.x, position.y, position.z, 1.0 );
      }
      `,
      fragmentShader: `
      uniform sampler2D texture1;
      uniform sampler2D texture2;
      uniform sampler2D texture3;
      uniform sampler2D texture4;
      varying vec2 vUv;
      vec2 offset1 = vec2(0.0 , -1.0);
      vec2 offset2 = vec2(-1.0 , -1.0);
      vec2 offset3 = vec2(0.0 , 0.0);
      vec2 offset4 = vec2(-1.0 , 0.0);
      void main() {
        if(vUv.x <= 0.5 && vUv.y >= 0.5  ){
          gl_FragColor = texture2D( texture1, vUv * 2.0  + offset1);
        }else if(vUv.x > 0.5 && vUv.y >= 0.5  ){
          gl_FragColor = texture2D( texture2, vUv * 2.0 + offset2 );
        }else if(vUv.x < 0.5 && vUv.y < 0.5  ){
          gl_FragColor = texture2D( texture3, vUv * 2.0 + offset3 );
        }else if(vUv.x >= 0.5 && vUv.y < 0.5  ){
          gl_FragColor = texture2D( texture4, vUv * 2.0 + offset4  );
        }
       }

      `,
      side: THREE.DoubleSide,
    });
  }

  /**
   *
   * @param {*} params
   */
  addImg(params) {
    let { width, height, position, rotation, name, url } = params;
    const geometry = new THREE.PlaneGeometry(4, 3);
    var texture = new THREE.TextureLoader().load(url);
    const plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        depthTest: false,
        side: THREE.DoubleSide, // 双面显示
        transparent: true,
        color: 0xffffff,
        map: texture,
      }),
    );
    plane.center = new THREE.Vector2(0.5, 0.5);
    plane.scale.set(width, height, 1);
    plane.position.set(position.x, position.y, position.z);
    plane.rotation.set(
      this.viewer.camera.rotation.x,
      this.viewer.camera.rotation.y,
      this.viewer.camera.rotation.z,
    );
    this.panoramaGroups.add(plane);
    this.dragMeshs.push(plane);
  }

  // 添加显示面板
  addPlane(params) {
    let { width, height, position, rotation, name, url } = params;
    const geometry = new THREE.PlaneGeometry(4, 3);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let image = new Image();
    image.src = url;
    image.onload = () => {
      window.devicePixelRatio = 2;
      let scale = window.devicePixelRatio;
      ctx.scale(scale, scale);
      ctx.drawImage(image, 0, 0, canvas.width / scale, canvas.height / scale);
      ctx.font = 'bold 16px 微软雅黑';
      ctx.fillStyle = '#5E97FF';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 10;
      const text = name;
      const y = canvas.height / 2; // 文本在画布中央垂直居中
      let offsetX = 70; // 初始水平位置
      for (let i = 0; i < text?.length; i++) {
        const word = text[i];
        ctx.fillText(word, offsetX / scale, y / scale);
        const wordWidth = ctx.measureText(word).width; // 计算当前字的宽度
        offsetX += wordWidth + 15; // 字与字之间添加间距
      }
      let texture = new THREE.CanvasTexture(canvas);
      const plane = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          depthTest: false,
          side: THREE.DoubleSide, // 双面显示
          transparent: true,
          color: 0xffffff,
          map: texture,
        }),
      );
      // const highlightColor = 0xff0000; // 高亮颜色，例如红色
      // const edges = new THREE.EdgesGeometry(geometry);
      // const lineMaterial = new THREE.LineBasicMaterial({
      //   linewidth: 2,
      //   color: highlightColor,
      //   depthTest: false,
      //   side: THREE.DoubleSide, // 双面显示
      //   transparent: true,
      // });
      // const wireframe = new THREE.LineSegments(edges, lineMaterial);
      // plane.add(wireframe);
      plane.center = new THREE.Vector2(0.5, 0.5);
      plane.scale.set(width, height, 1);
      plane.position.set(position.x, position.y, position.z);
      plane.rotation.set(
        this.viewer.camera.rotation.x,
        this.viewer.camera.rotation.y,
        this.viewer.camera.rotation.z,
      );
      this.panoramaGroups.add(plane);
      this.dragMeshs.push(plane);
    };
  }

  /**
   * 添加球体全景盒子
   * @param {*} panoramaImg
   */
  addSphere(panoramaImg) {
    const geometry = new THREE.SphereGeometry(100, 100, 50);
    const texture = new THREE.TextureLoader().load(panoramaImg);
    let material = new THREE.ShaderMaterial({
      wireframe: false,
      side: THREE.DoubleSide,
      map: texture,
      uniforms: {
        tex_0: new THREE.Uniform(texture),
      },
      vertexShader: `
    precision highp float;
    varying vec2 v_uv;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
      v_uv = uv;
    }
    `,
      fragmentShader: `
    precision highp float;
    varying vec2 v_uv;
    uniform sampler2D tex_0;
    void main() {
      vec4 texColor = texture2D(tex_0, vec2(1. - v_uv.x, v_uv.y));
      gl_FragColor = texColor;
    }
    `,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = Math.PI / 2;
    this.viewer.scene.add(mesh);
  }

  /**
   * 添加video
   * @param {*} panoramaVideo
   */
  addVideo() {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    video.src = '/panorama.mp4';
    video.muted = true;
    video.play();
    var geometry = new THREE.SphereGeometry(5, 60, 40);
    geometry.scale(-1, 1, 1);

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    this.panoramaGroups.add(mesh);
  }

  /**
   * 添加动画
   */
  addAnimation() {
    const animation = () => {};
    this.animaObject = {
      fun: animation,
      content: this,
    };
    this.viewer.addAnimate(this.animaObject);
  }
}
export { Panorama };
