import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {ConnectInfoContainer} from './ConnectInfoContainer';

const Header = () => {
    return (
        <Grid style={{backgroundColor: '#303f9f', margin: '0px', marginBottom: '20px', width: '100%'}}>
            <Row>
                <Col xs={6} xsOffset={3}>
                    <h1 style={{textAlign: 'center', color: 'white'}}>Rafacoin manager</h1>
                </Col>
                <Col xs={3} style={{margin: 'auto'}}>
                    <ConnectInfoContainer />
                </Col>
            </Row>
        </Grid>
    );
};

export {Header};
