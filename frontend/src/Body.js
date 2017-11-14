import React from 'react';

import {sendMessage, closeWebsocket} from './webSocket';

import {BlockchainContainer} from './BlockchainContainer';
import {TransactionsContainer} from './TransactionsContainer';

const Body = () => {

  return (
    <div>
      <div>Hello, Rafacoin</div>
      <button onClick={()=>{sendMessage('Start mining!!!');}}>Start mining</button>
      <button onClick={closeWebsocket}>Close websocket</button>
      <button onClick={()=>{sendMessage('Fetch blockchain');}}>Fetch blockchain</button>
      <button onClick={()=>{sendMessage('Make transaction');}}>Make transaction</button>

      <TransactionsContainer />
      <BlockchainContainer />
    </div>
  );
};

export {Body};
