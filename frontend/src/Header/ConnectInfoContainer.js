import React from 'react';

import {connect} from 'react-redux';

class ConnectInfo extends React.Component {
    render () {
        return (
            <div style={{backgroundColor: this.props.connected === 'open' ? 'lime' : 'red', textAlign: 'center', border: '1px solid black'}}>
                Connection {this.props.connected}
            </div>
        )
    }
}

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => {
  return {
    connected: state.websocket
}};

const ConnectInfoContainer = connect(
    mapStateToProps,
    mapDispatchToProps)(ConnectInfo);

export {ConnectInfoContainer};
