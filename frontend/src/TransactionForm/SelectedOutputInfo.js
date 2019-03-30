
import React from 'react';


class SelectedOutputInfoComponent extends React.Component {
    render () {

        const {selectedUTxO} = this.props;

        console.log('UTX found:', typeof outputIndex);
        return (
            selectedUTxO ? 
                (<div>
                    <Grid>
                        Controlling address: { 
                            selectedUTxO.output.address
                        }
                    </Grid>
                    <Grid>
                        Amount: { 
                            selectedUTxO.output.amount
                        }
                    </Grid>
                    <Grid>
                        Optional: error, you do not controll this address :)
                    </Grid>
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
             