import React from 'react';

import Grid from '@material-ui/core/Grid';

import {ConnectInfoContainer} from './ConnectInfoContainer';

const Header = () => {
    return (
        <Grid container style={{backgroundColor: '#303f9f', margin: '0px', marginBottom: '20px', width: '100%'}}>
            <Grid item>
                <Grid item xs={6} xsOffset={3}>
                    <h1 style={{textAlign: 'center', color: 'white'}}>Rafacoin manager</h1>
                </Grid>
                <Grid item xs={3} style={{margin: 'auto'}}>
                    <ConnectInfoContainer />
                </Grid>
            </Grid>
        </Grid>
    );
};

export {Header};
