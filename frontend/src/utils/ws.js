class Ws {
  constructor(param) {
    this.param = param;
    this.websocket = null;
    this.isConnect = false;
    this.timeoutNum = null;
    this.isActivelyClose = false;

    // 绑定this指向，确保在事件回调中this指向类实例
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  connect() {
    if (!this.param || !this.param.url) {
      console.error('WebSocket连接失败：未提供有效的URL');
      return;
    }
    this.isActivelyClose = false;
    this.websocket = new WebSocket(this.param.url);
    this.initSocket();
  }

  initSocket() {
    this.websocket.onclose = this.onClose;
    this.websocket.onerror = this.onError;
    this.websocket.onopen = this.onOpen;
    this.websocket.onmessage = this.onMessage;
  }

  onOpen() {
    console.log('WebSocket已连接~ ' + this.param.url);
    this.isConnect = true;
    if (this.param.msg) {
      this.send(this.param.msg);
    }
  }

  onClose() {
    console.log('WebSocket连接关闭~ ' + this.param.url);
    this.isConnect = false;
    if (!this.isActivelyClose) {
      this.reconnectSocket();
    }
  }

  onError(e) {
    console.log('WebSocket发生异常~ ' + this.param.url, e);
    this.reconnectSocket();
  }

  onMessage(e) {
    if (this.param.callback && typeof this.param.callback === 'function') {
      this.param.callback(e.data);
    }
  }

  reconnectSocket() {
    if (this.isConnect) return;
    console.log('WebSocket重新连接~');
    clearTimeout(this.timeoutNum);
    this.timeoutNum = setTimeout(() => {
      this.connect();
    }, 1000);
  }

  send(msg) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(msg));
    } else {
      console.error('WebSocket未连接，无法发送消息');
    }
  }

  close() {
    this.isActivelyClose = true;
    if (this.websocket) {
      this.websocket.close();
    }
  }
}

export default Ws;
