
import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';


class SelectedOutputInfoComponent extends React.Component {
    render () {

        const {UTxFound, outputIndex} = this.props;

        console.log('UTX found:', typeof outputIndex);
        return (
            <div>
                <Row>
                    Controlling address: { 
                        UTxFound && (outputIndex !== undefined) && UTxFound[1].transactionData.outputs[0].address
                    }
                </Row>
                <Row>
                    Amount: { 
                        UTxFound && (outputIndex !== undefined) && UTxFound[1].transactionData.outputs[0].amount
                    }
                </Row>
                <Row>
                    Optional: error, you do not controll this address :)
                </Row>
            </div>
        );
    }
}
                        

import { connect } from 'react-redux';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state, props) => {

    const selectedData = state.form.transaction.values.inputs[props.index];
    console.log('selected data:', selectedData);

    const UTxFound = state.UTxO.find(element => element[0] === selectedData.txHash);

    console.log('UTX found:', UTxFound);
    return {
        UTxFound: UTxFound,
        outputIndex: selectedData.outputIndex
    }
};

const SelectedOutputInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedOutputInfoComponent);

export {SelectedOutputInfo};
             