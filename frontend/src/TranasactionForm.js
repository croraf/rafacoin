import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';

class MyInput extends React.Component {

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

class TransactionFormComponent extends React.Component {
    render () {

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Field name='referenceHash' component={MyInput} label="Reference transaction hash"/>
                    <Field name='referenceOutputIndex' component={MyInput} label="Reference transaction output index"/>
                </Row>
                <Row>
                    <Field name='output1Address' component={MyInput} label="Output1 Address"/>
                    <Field name='output1Amount' component={MyInput} label="Output1 Amount"/>
                </Row>
                <Row>
                    <Field name='output2Address' component={MyInput} label="Output2 Address"/>
                    <Field name='outpu2Amount' component={MyInput} label="Output2 Amount"/>
                </Row>
                <Field name='fee' component={MyInput} label="Fee"/>
                
            </form>
        )
    }
}


import {sendMessage} from './webSocket';

const submit = (values) => {
    console.log('vrijednosti', values);
    sendMessage({type: 'create_transaction', data: values});
}

const TransactionForm = reduxForm({
    form: 'transaction',
    onSubmit: submit,
})(TransactionFormComponent);

export {TransactionForm};
