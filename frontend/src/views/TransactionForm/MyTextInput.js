import React from 'react';

import TextField from '@material-ui/core/TextField';

class MyTextInput extends React.Component {

    render () {
        return (
            <TextField 
                {...this.props.input}
                label={this.props.label} 
                style={{width: '95%'}}/>
        );
    }
}

export {MyTextInput};
