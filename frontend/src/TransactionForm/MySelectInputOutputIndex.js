import { connect } from 'react-redux';

import {MySelectComponent} from './MySelectComponent';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state, props) => {

    console.log('transaction form:', state.form.transaction.values);
    const selectedTx = state.form.transaction.values && state.form.transaction.values.inputs[props.index];
    console.log('selected tx: ', selectedTx, state.UTxO);

    let outputIndexVector = [];
    state.UTxO.forEach(item => {
        console.log('Utxo:', item[0])
        if (item[0] === selectedTx.txHash) {
                console.log('UTx block and outputs:', item[1]);
                outputIndexVector = item[1].unspentOutputs;
                console.log('output indices vector:', outputIndexVector);
        }
    });

    return {
      selectItems: outputIndexVector
    }
};

const MySelectInputOutputIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(MySelectComponent);

export {MySelectInputOutputIndex};
