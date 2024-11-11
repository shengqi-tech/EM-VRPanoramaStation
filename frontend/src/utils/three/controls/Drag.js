import { EventDispatcher, Matrix4, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { Common } from '@/utils/three/xThree';

let startPoint = new Vector3();

class Drag extends EventDispatcher {
  constructor(_objects, _viewer, _domElement) {
    super();

    let _selected = null;
    const scope = this;

    function onPointerMove(event) {
      if (scope.enabled === false) return;
      if (_selected) {
        scope.dispatchEvent({ type: 'drag', object: _selected });
        let position = Common.getPointByScreen(_viewer, event.offsetX, event.offsetY);
        const translationVector = position.sub(startPoint);
        _selected.position.add(translationVector);
        startPoint.add(translationVector);
        _selected.rotation.copy(_viewer.camera.rotation);
        _domElement.style.cursor = 'grabbing';
      }
    }

    function onPointerDown(event) {
      const clientX = event.clientX;
      const clientY = event.clientY;

      const rect = _domElement.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;

      startPoint = Common.getPointByScreen(_viewer, offsetX, offsetY);
      if (scope.enabled === false) return;
      const elements = document.elementsFromPoint(event.clientX, event.clientY);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.classList.contains('css3dObject-pointRight')) {
          return;
        }
        if (element.classList.contains('css3dObject')) {
          _selected = _objects.find((item) => {
            return item.data.id == element.id;
          });
          scope.dispatchEvent({ type: 'dragstart', object: _selected });
          _domElement.style.cursor = 'grabbing';
          break;
        }
      }
    }

    function onPointerCancel() {
      if (scope.enabled === false) return;
      if (_selected) {
        scope.dispatchEvent({ type: 'dragend', object: _selected });
        _domElement.style.cursor = 'default';
        _selected = null;
      }
    }

    function updatePointer(event) {}

    function activate() {
      _domElement.addEventListener('pointermove', onPointerMove);
      _domElement.addEventListener('pointerdown', onPointerDown);
      _domElement.addEventListener('pointerup', onPointerCancel);
      _domElement.addEventListener('pointerleave', onPointerCancel);
    }

    function deactivate() {
      _domElement.removeEventListener('pointermove', onPointerMove);
      _domElement.removeEventListener('pointerdown', onPointerDown);
      _domElement.removeEventListener('pointerup', onPointerCancel);
      _domElement.removeEventListener('pointerleave', onPointerCancel);
      _domElement.style.cursor = '';
    }

    function dispose() {
      deactivate();
    }
    activate();

    this.enabled = true;
    this.dispose = dispose;
  }
}
export { Drag };
