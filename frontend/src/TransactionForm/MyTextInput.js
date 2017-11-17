import React from 'react';


import { Grid, Row, Col } from 'react-flexbox-grid';

import TextField from 'material-ui/TextField';

class MyTextInput extends React.Component {

    render () {
        return (
            <Col xs={6}>
                <TextField 
                    {...this.props.input}
                    floatingLabelFixed={true}
                    floatingLabelText={this.props.label} />
            </Col>
        );
    }
}

export {MyTextInput};
