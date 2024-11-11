class Drag {
  id: string;
  canvas: any;
  dropListener: any;
  dragoverListener: any;
  dragleaveListener: any;
  dragenterListener: any;
  constructor(id: string) {
    this.id = id;
    this.canvas = null;
    this.dropListener = null;
    this.dragoverListener = null;
    this.init();
  }
  init() {
    this.canvas = document.getElementById(this.id);
    this.dragover();
  }

  drop(callback: any) {
    this.dropListener = (event: any) => {
      const clientX = event.clientX;
      const clientY = event.clientY;

      const rect = this.canvas.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;

      if (event && event.offsetX && event.offsetY) callback(offsetX, offsetY);
    };
    this.canvas?.addEventListener('drop', this.dropListener);
  }

  dragover() {
    this.dragoverListener = (event: any) => {
      event.preventDefault();
    };
    this.canvas?.addEventListener('dragover', this.dragoverListener);
  }
  dragleave() {
    this.dragleaveListener = (event: any) => {};
    this.canvas?.addEventListener('dragleave', this.dragleaveListener);
  }
  dragenter() {
    this.dragenterListener = (event: any) => {};
    this.canvas?.addEventListener('dragenter', this.dragenterListener);
  }
  remove() {
    this.canvas?.removeEventListener('drop', this.dropListener);
    this.canvas?.removeEventListener('dragover', this.dragoverListener);
    this.canvas?.removeEventListener('dragleave', this.dragleaveListener);
    this.canvas?.removeEventListener('dragenter', this.dragenterListener);
  }
}
export default Drag;
