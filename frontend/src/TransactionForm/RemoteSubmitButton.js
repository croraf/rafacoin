import React from 'react';

import { connect } from 'react-redux';
import { submit } from 'redux-form';

import Button from '@material-ui/core/Button';

const RemoteSubmitButton = ({ dispatch, handleClose }) => (
  
    <Button 
        raised={true}
        color='primary'
        onClick={() => {
            console.log('submit'); 
            handleClose();
            dispatch(submit('transaction'));
        }}>
        Broadcast transaction
    </Button>
)

export default connect()(RemoteSubmitButton)
