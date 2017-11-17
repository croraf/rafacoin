import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {MyTextInput} from './MyTextInput';

import {MySelectInputTx} from './MySelectInputTx';
import {MySelectInputOutputIndex} from './MySelectInputOutputIndex';

class TransactionFormComponent extends React.Component {
    render () {

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Field name='referenceHash' component={MySelectInputTx} label="Reference transaction hash"/>
                    <Field name='referenceOutputIndex' component={MySelectInputOutputIndex} label="Reference transaction output index"/>
                </Row>
                <Row>
                    <Field name='output1Address' component={MyTextInput} label="Output1 Address"/>
                    <Field name='output1Amount' component={MyTextInput} label="Output1 Amount"/>
                </Row>
                <Row>
                    <Field name='output2Address' component={MyTextInput} label="Output2 Address"/>
                    <Field name='outpu2Amount' component={MyTextInput} label="Output2 Amount"/>
                </Row>
                <Field name='fee' component={MyTextInput} label="Fee"/>
                
            </form>
        )
    }
}


import {sendMessage} from '../webSocket';

const submit = (values) => {
    console.log('vrijednosti', values);
    sendMessage({type: 'create_transaction', data: values});
}

const TransactionForm = reduxForm({
    form: 'transaction',
    onSubmit: submit,
})(TransactionFormComponent);

export {TransactionForm};
