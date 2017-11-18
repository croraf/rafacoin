import React from 'react';
import {Header} from './Header/Header';
import {Body} from './Body';

import {setupWebSocket} from './webSocket';

class Main extends React.Component {

  componentDidMount () {

    setupWebSocket();
  }

  render() {
    return (
      <div>
        <Header/>
        <Body/>
      </div>
    );
  }
}

export {Main};
