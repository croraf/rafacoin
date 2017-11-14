
let webSocket;

const setupWebSocket = () => {
  webSocket = new WebSocket('ws://localhost:9000/');

  webSocket.onmessage = (message) => {

      const parsedMessage = JSON.parse(message.data);

      switch (parsedMessage.type) {
        case 'blockchain':
          console.log(parsedMessage.data);
          break;
      
        default:
          console.log(parsedMessage);
          break;
      }
  }

  webSocket.onclose = () => {
      console.log('Socket closed');
    }

  webSocket.onopen = (event) => {
    console.log('Socket opened');
  };
}

const sendMessage = (message) => {
    webSocket.send(message); 
}

const closeWebsocket = () => {
    webSocket.close();
}

export {setupWebSocket, sendMessage, closeWebsocket};
