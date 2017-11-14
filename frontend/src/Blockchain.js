import React from 'react';

const formatTransactionsOutput = (transactions) => {

    return (
      <div>
        <div>transactions: </div>
        <div>
          {transactions.map(((transaction, index) => {
              console.log('transaction:', transaction);
              return (
                <div key={index} style={{marginLeft: '20px'}}>
                    <div>transaction hash: {transaction[0]}</div>
                    <div>output address: {transaction[1].transaction.outputs[0].address}</div>
                    <div>output amount: {transaction[1].transaction.outputs[0].value}</div>
                </div>
              );
          }))}
        </div>
      </div>
    );
};

const formatBlockOutput = (item) => {
    return (
      <div key={item[0]}>
          <div style={{fontWeight: 'bold'}}>block hash: {item[0]}</div> 
          <div>previousHash: {item[1].previousHash}</div> 
          <div>nonce: {item[1].nonce}</div> 
          <div>target: {item[1].target}</div> 
          {formatTransactionsOutput(item[1].transactions)} 
      </div> 
    );
};

class Blockchain extends React.Component {

  render () {

    console.log(this.props.blockchain);
    return (
      <div>
        <div>Blockchain:</div>
        {this.props.blockchain.map(item => formatBlockOutput(item))}
      </div>
    );
  } 
}

export {Blockchain};
