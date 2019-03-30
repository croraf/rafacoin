import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';

import {MyTextInput} from './MyTextInput';

import {MySelectUnspentOutputs} from './MySelectInputTx';
import {SelectedOutputInfo} from './SelectedOutputInfo';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

import Grid from '@material-ui/core/Grid';

const renderOutputMembers = ({fields}) => {

    return (
        <div style={{marginBottom: '10px'}}>
            {fields.map((output, index) => {

                return (
                    <Grid key={index}>
                        <Grid xs={8}>
                            <Field name={`${output}.address`} component={MyTextInput} label={`Output ${index} address`}/>
                        </Grid>
                        <Grid xs={3}>
                            <Field name={`${output}.amount`} component={MyTextInput} label={`Output ${index} amount`}/>
                        </Grid>
                        <Grid xs={1} style={{margin: 'auto'}}>
                            <IconButton onClick={() => fields.remove(index)}>
                                <DeleteForever />
                            </IconButton>
                        </Grid>
                    </Grid>
                )
            })}
            
            <Grid>
                <Button variant='contained' style={{margin: 'auto', marginTop: '10px'}} onClick={()=>{fields.push({})}}>
                    + Add output
                </Button>
            </Grid>
        </div>
    );
}

const renderInputMembers = ({fields}) => {

    return (
        <div style={{marginBottom: '10px'}}>
            {fields.map((input, index) => {

                return (
                    <div key={index}>
                        <Grid style={{marginTop: '10px', marginBottom: '5px'}}>
                            <Grid xs={11}>
                                <Field name={`${input}`} component={MySelectUnspentOutputs} index={index} label={`Input ${index} reference`}/>
                            </Grid>
                            <Grid xs={1} style={{margin: 'auto'}}>
                                <IconButton onClick={() => fields.remove(index)}>
                                    <DeleteForever />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <SelectedOutputInfo index={index}/>
                    </div>
                )
            })}
            
            <Grid>
                <Button variant='contained' style={{margin: 'auto'}} onClick={()=>{fields.push({})}}>
                    + Add input
                </Button>
            </Grid>
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
                
                <Grid xs={4} xsOffset={4}>
                    <Field name='fee' component={MyTextInput} label="Fee"/>
                </Grid>
            </form>
        )
    }
}


import {sendMessage} from '../../webSocket';

const submit = (values) => {
    console.log('vrijednosti', values);
    sendMessage({type: 'create_transaction', data: values});
}

const TransactionForm = reduxForm({
    form: 'transaction',
    onSubmit: submit,
})(TransactionFormComponent);

export {TransactionForm};
