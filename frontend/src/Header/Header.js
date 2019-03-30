import React from 'react';

import Grid from '@material-ui/core/Grid';

import {ConnectInfoContainer} from './ConnectInfoContainer';

const Header = () => {
    return (
        <Grid container style={{backgroundColor: '#303f9f', margin: '0px', padding: '0% 2.5%', marginBottom: '20px',}}>
            <Grid item xs={9}>
                <h1 style={{textAlign: 'left', color: 'white'}}>Rafacoin manager</h1>
            </Grid>
            <Grid item xs={3} style={{margin: 'auto',}}>
                <ConnectInfoContainer />
            </Grid>
        </Grid>
    );
};

export {Header};
