import React from 'react';

const formatTransactionsOutput = (transactions) => {
    return (
      transactions.map(item => {

        console.log(item);
        return (
          <div key={item[0]}>
              <div style={{fontWeight: 'bold'}}>transaction hash: {item[0]}</div>
              <div>transaction input: {item[1].transaction.inputs[0].address}</div>
              <div>transaction output: {item[1].transaction.outputs[0].address}</div>
              <div>transaction fee: {item[1].transaction.fee}</div>
          </div>
        );
      })
    );
};

class Transactions extends React.Component {

  render () {

    console.log(this.props.transactions);
    return (
      <div style={{border: '1px solid black'}}>
        <div>Transactions:</div>
        <div>
          {formatTransactionsOutput(this.props.transactions)}
        </div>
      </div>
    );
  } 
}

export {Transactions};
