import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {MyTextInput} from './MyTextInput';

import {MySelectInputTx} from './MySelectInputTx';
import {MySelectInputOutputIndex} from './MySelectInputOutputIndex';
import {SelectedOutputInfo} from './SelectedOutputInfo';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteForever from 'material-ui-icons/DeleteForever';


const renderOutputMembers = ({fields}) => {

    return (
        <div style={{marginBottom: '10px'}}>
            {fields.map((output, index) => {

                return (
                    <Row key={index}>
                        <Col xs={8}>
                            <Field name={`${output}.address`} component={MyTextInput} label={`Output ${index} address`}/>
                        </Col>
                        <Col xs={3}>
                            <Field name={`${output}.amount`} component={MyTextInput} label={`Output ${index} amount`}/>
                        </Col>
                        <Col xs={1} style={{margin: 'auto'}}>
                            <IconButton onClick={() => fields.remove(index)}>
                                <DeleteForever />
                            </IconButton>
                        </Col>
                    </Row>
                )
            })}
            
            <Row>
                <Button raised={true} style={{margin: 'auto', marginTop: '10px'}} onClick={()=>{fields.push({})}}>
                    + Add output
                </Button>
            </Row>
        </div>
    );
}

const renderInputMembers = ({fields}) => {

    return (
        <div style={{marginBottom: '10px'}}>
            {fields.map((input, index) => {

                return (
                    <div key={index}>
                        <Row style={{marginTop: '10px', marginBottom: '5px'}}>
                            <Col xs={8}>
                                <Field name={`${input}.txHash`} component={MySelectInputTx} index={index} label={`Input ${index} Tx hash`}/>
                            </Col>
                            <Col xs={3}>
                                <Field name={`${input}.outputIndex`} component={MySelectInputOutputIndex} index={index} label={`Input ${index} Tx output index`}/>
                            </Col>
                            <Col xs={1} style={{margin: 'auto'}}>
                                <IconButton onClick={() => fields.remove(index)}>
                                    <DeleteForever />
                                </IconButton>
                            </Col>
                        </Row>
                        <SelectedOutputInfo index={index}/>
                    </div>
                )
            })}
            
            <Row>
                <Button raised={true} style={{margin: 'auto'}} onClick={()=>{fields.push({})}}>
                    + Add input
                </Button>
            </Row>
        </div>
    );
}

class TransactionFormComponent extends React.Component {
    render () {

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>

                <FieldArray name='inputs' component={renderInputMembers} />

                <FieldArray name="outputs" component={renderOutputMembers} />
                
                <Col xs={4} xsOffset={4}>
                    <Field name='fee' component={MyTextInput} label="Fee"/>
                </Col>
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
