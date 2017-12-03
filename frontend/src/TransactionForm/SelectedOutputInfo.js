
import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';


class SelectedOutputInfoComponent extends React.Component {
    render () {

        const {selectedUTxO} = this.props;

        console.log('UTX found:', typeof outputIndex);
        return (
            selectedUTxO ? 
                (<div>
                    <Row>
                        Controlling address: { 
                            selectedUTxO.output.address
                        }
                    </Row>
                    <Row>
                        Amount: { 
                            selectedUTxO.output.amount
                        }
                    </Row>
                    <Row>
                        Optional: error, you do not controll this address :)
                    </Row>
                </div>) : <div />
        );
    }
}
                        

import { connect } from 'react-redux';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state, props) => {

    const selectedData = state.form.transaction.values.inputs[props.index];
    console.log('Selected unspent output _id:', selectedData);

    const selectedUTxO = state.UTxO.find(element => element._id === selectedData);

    console.log('Selected UTxO:', selectedUTxO);
    return {
        selectedUTxO
    }
};

const SelectedOutputInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedOutputInfoComponent);

export {SelectedOutputInfo};
             