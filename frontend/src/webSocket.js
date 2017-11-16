import {store} from './redux/store';

let webSocket;

const setupWebSocket = () => {
    webSocket = new WebSocket('ws://localhost:9000/');

    webSocket.onmessage = (message) => {

        const parsedMessage = JSON.parse(message.data);

        switch (parsedMessage.type) {
            case 'newBlock':
              console.log(parsedMessage.data);
              store.dispatch({type: 'newBlock', block: parsedMessage.data});
              break;
            case 'blockchain':

              console.log(parsedMessage.data);
              store.dispatch({type: 'blockchain', blockchain: parsedMessage.data});
              break;
            
            case 'sync transactions':
              /*console.log(parsedMessage.data);*/
              /*store.dispatch({type: 'transactions', transactions: parsedMessage.data});*/
              break;

            case 'newTransaction':
                store.dispatch({type: 'newTransaction', transaction: parsedMessage.data })
                break;
            case 'deleteTransaction':
                store.dispatch({type: 'deleteTransaction', transactionHash: parsedMessage.data});
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
    webSocket.send(JSON.stringify(message)); 
}

const closeWebsocket = () => {
    webSocket.close();
}

export {setupWebSocket, sendMessage, closeWebsocket};
