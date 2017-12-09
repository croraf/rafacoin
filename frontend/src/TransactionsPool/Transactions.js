import React from 'react';

const formatBlockInputs = (inputs) => {
    return (
      <div>
         {inputs.map((input, index) => {
            return (
              <div key={index} style={{marginLeft: '20px'}}>
                  <div>Tx ID: {input.txID}</div>
                  <div>Index: {input.index}</div>
              </div>
            );
         })}
      </div>
    )
}

const formatBlockOutputs = (outputs) => {
    return (
        <div>
            {outputs.map((output, index) => {
                return (
                    <div key={index} style={{marginLeft: '20px'}}>
                      <div>address: {output.address}</div>
                      <div>amount: {output.amount}</div>
                    </div>
                );
            })}
        </div>
      )
}

const formatBlockTransactions = (transactions) => {

    return (
        <div>
            {transactions.map(((transaction, index) => {
                return (
                    <div key={index}>
                        <div style={{fontWeight: 'bold'}}>Tx ID: {transaction.txID}</div>
                        <div>inputs: {formatBlockInputs(transaction.signedTransaction.transactionPayload.inputs)}</div>
                        <div>outputs: {formatBlockOutputs(transaction.signedTransaction.transactionPayload.outputs)}</div>
                        <div>fee: {transaction.signedTransaction.transactionPayload.fee}</div>
                    </div>
                );
            }))}
        </div>
    );
};

class Transactions extends React.Component {

  render () {

    console.log('transactions:', this.props.transactions);
    return (
      <div style={{border: '1px solid black', overflowX: 'auto'}}>
        <div style={{borderBottom: '1px solid black'}}>Unconfirmed transactions pool:</div>
        <div>
          {formatBlockTransactions(this.props.transactions)}
        </div>
      </div>
    );
  } 
}

export {Transactions};
