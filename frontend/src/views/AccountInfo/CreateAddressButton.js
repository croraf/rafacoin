import React from 'react';
import Button from '@material-ui/core/Button';

const createNewAddress = () => {
    return {
        type: 'newAddress',
        data: {
            address: Math.round(Math.random()*100000000).toString(16), 
            privateKey: Math.round(Math.random()*100000000).toString(16)
        }
    };
}

class CreateAddressButtonComponent extends React.Component {

    render() {
            return (
                <Button 
                    color='secondary'
                    variant='contained'
                    onClick={()=>{this.props.dispatch(createNewAddress());}}>
                    Create new address
                </Button>
            );
    }
}


import { connect } from 'react-redux';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state, props) => ({
});

const CreateAddressButton = connect(
  mapStateToProps,
  undefined
)(CreateAddressButtonComponent);

export {CreateAddressButton};
