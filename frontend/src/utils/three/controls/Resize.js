import { EventDispatcher, Matrix4, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { Common } from '@/utils/three/xThree';

class Resize {
  constructor(pointEl, element) {
    pointEl.addEventListener('mousedown', startResize);
    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    let viewer = window.viewer;
    function startResize(e) {
      viewer.orbitControls.enableRotate = false;
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    }
    function resize(e) {
      if (isResizing) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        element.style.width = startWidth + deltaX + 'px';
        element.style.height = startHeight + deltaY + 'px';
      }
    }
    function stopResize() {
      viewer.orbitControls.enableRotate = true;
      isResizing = false;
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    }

    function dispose() {
      pointEl.removeEventListener('mousedown', startResize);
    }

    this.enabled = true;
    this.dispose = dispose;
  }
}
export { Resize };
