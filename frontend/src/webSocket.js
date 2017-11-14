
let webSocket;

const setupWebSocket = () => {
  webSocket = new WebSocket('ws://localhost:9000/');

  webSocket.onmessage = (message) => {
      console.log(JSON.parse(message.data));
  }

  webSocket.onclose = () => {
      console.log('Socket closed');
    }

  webSocket.onopen = (event) => {
    console.log('Socket opened');
  };
}

const sendMessage = () => {
    webSocket.send("Start mining!!!"); 
}

const closeWebsocket = () => {
    webSocket.close();
}

export {setupWebSocket, sendMessage, closeWebsocket};
