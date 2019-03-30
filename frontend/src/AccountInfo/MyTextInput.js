import React from 'react';

import TextField from '@material-ui/core/TextField';

class MyTextInput extends React.Component {

    render () {

        return (
            <TextField 
                label={this.props.label} 
                disabled={true}
                value={this.props.value}
                style={{width: '100%'}}
                onChange={()=>{}}/>
        );
    }
}


import { connect } from 'react-redux';

const mapDispatchToProps = () => ({});


const mapStateToProps = (state, props) => {

    /* const selectedAddressIndex = state.form.addressInfo.values && state.form.addressInfo.values.address;

    return {
      value: selectedAddressIndex !== undefined ? state.addressInfo[selectedAddressIndex].privateKey : '' 
    }; */
    return {value: 'abcd'};
};

const MyTextInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTextInput);

export {MyTextInputContainer};
