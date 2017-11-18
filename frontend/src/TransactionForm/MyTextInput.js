import React from 'react';


import { Grid, Row, Col } from 'react-flexbox-grid';

import TextField from 'material-ui/TextField';

class MyTextInput extends React.Component {

    render () {
        return (
            <TextField 
                {...this.props.input}
                floatingLabelFixed={true}
                floatingLabelText={this.props.label} 
                style={{width: '95%'}}/>
        );
    }
}

export {MyTextInput};
