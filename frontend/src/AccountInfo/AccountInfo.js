import React from 'react';

import {reduxForm, Field} from 'redux-form';

import {Col, Row} from 'react-flexbox-grid';
import { MyTextInputContainer } from './MyTextInput';
import { MySelectContainer } from './MySelectComponent';
import Button from '@material-ui/core/Button';
import { CreateAddressButton } from './CreateAddressButton';

class AccountInfoFormComponent extends React.Component {
    render () {

        return (
            <Col xs={12}>
                <form>
                    <Row>
                        <Col xs={4}>
                            <CreateAddressButton />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Field name='address' component={MySelectContainer} label="Address"/>
                        </Col>
                        <Col xs={6}>
                            <Field name='privateKey' component={MyTextInputContainer} label="Private key"/>
                        </Col>
                    </Row>
                </form>
            </Col>
        )
    }
}


const AccountInfo = reduxForm({
    form: 'addressInfo'
})(AccountInfoFormComponent);

export {AccountInfo};
