import { connect } from 'react-redux';

import {MySelectComponent} from './MySelectComponent';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => {

  const selectedTx = state.form.transaction.values && state.form.transaction.values.referenceHash;
  console.log('selected tx: ', selectedTx, state.UTxO);

  let outputIndexVector = [];
  state.UTxO.forEach(item => {
    console.log('Utxo:', item[0])
    if (item[0] === selectedTx) {
      console.log(true);
      console.log(item[1]);
      outputIndexVector = item[1].unspentOutputs;
      console.log(outputIndexVector);
    }
  });

  return {
    selectItems: outputIndexVector
}};

const MySelectInputOutputIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(MySelectComponent);

export {MySelectInputOutputIndex};
