import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {ConnectInfoContainer} from './ConnectInfoContainer';

const Header = () => {
    return (
        <Grid>
            <Row>
                <Col xs={9}>
                    <h1 style={{textAlign: 'center'}}>Rafacoin manager: Welcome!</h1>
                </Col>
                <Col xs={3} style={{margin: 'auto'}}>
                    <ConnectInfoContainer />
                </Col>
            </Row>
        </Grid>
    );
};

export {Header};
