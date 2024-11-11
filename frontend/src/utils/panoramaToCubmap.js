export function loadImage(file, callback) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const dom = {
    imageInput: document.getElementById('imageInput'),
    faces: document.getElementById('faces'),
    generating: document.getElementById('generating'),
  };

  class CubeFace {
    constructor(faceName) {
      this.faceName = faceName;
      this.anchor = document.createElement('a');
      this.anchor.style.position = 'absolute';
      this.anchor.title = faceName;
      this.img = document.createElement('img');
      this.img.style.filter = 'blur(4px)';
      this.anchor.appendChild(this.img);
    }
  }

  function removeChildren(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function getDataURL(imgData, faceName) {
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    ctx.putImageData(imgData, 0, 0);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], faceName, { type: blob.type });
        resolve(file);
      });
    });
  }
  const facePositions = {
    pz: { x: 1, y: 1 },
    nz: { x: 3, y: 1 },
    px: { x: 2, y: 1 },
    nx: { x: 0, y: 1 },
    py: { x: 1, y: 0 },
    ny: { x: 1, y: 2 },
  };

  // --------
  let finished = 0;
  let workers = [];
  let fileList = [];

  function processImage(data) {
    removeChildren(dom.faces);
    dom.generating.style.visibility = 'visible';
    for (let worker of workers) {
      worker.terminate();
    }
    for (let [faceName, position] of Object.entries(facePositions)) {
      renderFace(data, faceName, position);
    }
  }

  function renderFace(data, faceName, position) {
    const face = new CubeFace(faceName);
    dom.faces.appendChild(face.anchor);
    const options = {
      data: data,
      face: faceName,
      rotation: Math.PI,
      interpolation: 'linear',
    };
    const worker = new Worker('/js/convert.js');

    const setDownload = async ({ data: imageData }) => {
      await getDataURL(imageData, faceName).then((data) => {
        fileList.push(data);
      });
      finished++;
      if (finished === 6) {
        dom.generating.style.visibility = 'hidden';
        finished = 0;
        workers?.forEach((item) => {
          item.terminate();
        });
        workers = [];
        callback(fileList);
      }
    };
    worker.onmessage = () => {
      worker.onmessage = setDownload;
      worker.postMessage(options);
    };
    worker.postMessage(
      Object.assign({}, options, {
        maxWidth: 200,
        interpolation: 'linear',
      }),
    );
    workers.push(worker);
  }
  if (!file) {
    return;
  }
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.addEventListener('load', () => {
    const { width, height } = img;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, width, height);
    processImage(data);
    // 压缩质量
    // var dataUrl = canvas.toDataURL('image/jpeg', 0.3);
    // const img1 = new Image();
    // img1.src = dataUrl;
    // img.onload = () => {
    //   const { width, height } = img;
    //   canvas.width = width;
    //   canvas.height = height;
    //   ctx.drawImage(img, 0, 0);
    //   const data = ctx.getImageData(0, 0, width, height);
    //   processImage(data);
    // };
  });
}
