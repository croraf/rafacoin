import React from 'react';

import {sendMessage, closeWebsocket} from './webSocket';

import {BlockchainContainer} from './BlockchainContainer';

const Body = () => {

  return (
    <div>
      <div>Hello, Rafacoin</div>
      <button onClick={()=>{sendMessage('Start mining!!!');}}>Start mining</button>
      <button onClick={closeWebsocket}>Close websocket</button>
      <button onClick={()=>{sendMessage('Fetch blockchain');}}>Fetch blockchain</button>

      <BlockchainContainer />
    </div>
  );
};

export {Body};
