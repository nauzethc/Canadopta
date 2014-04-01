(function(){


function Image(element, callback) {
  /*
   * Turn HTML IMG element into a droppable zone
   * Toggle drop zone with 'toggle' method
   * Input element must be IMG type, and dropped image is loaded
   * into element when
   */
  this.element  = element.nodeName === "IMG" ? element : function(){
    throw "DOM Element must be IMG type";
  };

  var active    = false,
      callback  = callback,
      _handlers = {};

  function addEventListener(element, eventName, eventHandler, scope) {
    /*
     * Binds event scope to object scope, so object scope may be
     * reachable from methods that work as event handler
     */
    if (!_handlers[eventName]) {
      _handlers[eventName] = scope ? function(e) {
        eventHandler.apply(scope, [e])
      } : eventHandler;
    }
    element.addEventListener(
      eventName,
      _handlers[eventName],
      false);
  }

  function removeEventListener(element, eventName, eventHandler) {
    /*
     * Unbind event listener, previous method inverse operation
     */
    element.removeEventListener(
      eventName,
      _handlers[eventName],
      false);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    this.element.classList.add('droppableOver');
    return false;
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    return false;
  }

  function handleDrop(e) {
    /*
     * Final method on events chain
     * Constructor callback param is called with event as first param
     * to handle dropped file outside of Droppable class
     */
    e.preventDefault();
    e.stopPropagation();
    this.element.classList.remove('droppableOver');
    if (callback) return callback(e);
    return false;
  }

  function handleDragLeave(e) {
    e.preventDefault();
    this.element.classList.remove('droppableOver');
    return false;
  }

  function handleDragEnd(e) {
    e.preventDefault();
    this.element.classList.remove('droppableOver');
    return false;
  }

  this.isActive = function() {
    return active;
  };

  this.toggle = function() {
    /*
     * Toggle between detault state and 'droppable' state
     */
    active = !active;
    var el = this.element;
    if (active) {
      el.setAttribute('droppable', 'true');
      el.classList.add('droppable');
      addEventListener(el, 'dragenter', handleDragEnter, this);
      addEventListener(el, 'dragover',  handleDragOver,  this);
      addEventListener(el, 'drop',      handleDrop,      this);
      addEventListener(el, 'dragleave', handleDragLeave, this);
      addEventListener(el, 'dragend',   handleDragEnd,   this);
    } else {
      el.setAttribute('droppable', 'false');
      el.classList.remove('droppable');
      removeEventListener(el, 'dragenter', handleDragEnter);
      removeEventListener(el, 'dragover',  handleDragOver);
      removeEventListener(el, 'drop',      handleDrop);
      removeEventListener(el, 'dragleave', handleDragLeave);
      removeEventListener(el, 'dragend',   handleDragEnd);
    }
  }
}

window.Dropper = {
  Image: Image,
};

})();