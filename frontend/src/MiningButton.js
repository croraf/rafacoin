import React from 'react';
import Button from 'material-ui/Button';

import {sendMessage} from './webSocket';

class MiningButtonComponent extends React.Component {

    render() {
            return (
                <Button 
                    raised={true}
                    style={{width: '100%'}}
                    color='primary'
                    onClick={()=>{sendMessage({type: 'mine'});}}
                    disabled={this.props.mining}
                    >

                    Start mining
                </Button>
            );
    }
}


import { connect } from 'react-redux';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state, props) => ({
    mining: state.mining
});

const MiningButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(MiningButtonComponent);

export {MiningButton};
