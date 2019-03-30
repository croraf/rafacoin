import React from 'react';

import {reduxForm, Field} from 'redux-form';

import { MyTextInputContainer } from './MyTextInput';
import { MySelectContainer } from './MySelectComponent';
import { CreateAddressButton } from './CreateAddressButton';

import Grid from '@material-ui/core/Grid';

class AccountInfoFormComponent extends React.Component {
    render () {

        return (
            <Grid item xs={12}>
                <form>
                    <Grid item>
                        <Grid item xs={4}>
                            <CreateAddressButton />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item xs={6}>
                            <Field name='address' component={MySelectContainer} label="Address"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field name='privateKey' component={MyTextInputContainer} label="Private key"/>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        )
    }
}


const AccountInfo = reduxForm({
    form: 'addressInfo'
})(AccountInfoFormComponent);

export {AccountInfo};
