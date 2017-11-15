import React from 'react';

const formatBlockInputs = (inputs) => {
    return (
      <div>
         {inputs.map((input, index) => {
            return (
              <div key={index} style={{marginLeft: '20px'}}>
                  <div>address: {input.address}</div>
                  <div>output index: {input.outputIndex}</div>
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
        <div>transactions: </div>
        <div>
          {transactions.map(((transaction, index) => {
              console.log('transaction:', transaction);
              return (
                <div key={index} style={{marginLeft: '20px'}}>
                    <div>hash: {transaction[0]}</div>
                    <div>inputs: {formatBlockInputs(transaction[1].transaction.inputs)}</div>
                    <div>outputs: {formatBlockOutputs(transaction[1].transaction.outputs)}</div>
                    <div>fee: {transaction[1].transaction.fee}</div>
                </div>
              );
          }))}
        </div>
      </div>
    );
};

class Block extends React.Component {

    state = {
        expanded: false
    };

    toggleExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        });
        console.log(this.state);
    }

    render () {

        const {item} = this.props;
        return (
            <div>
                <div style={{cursor: 'pointer'}} onClick={this.toggleExpand}>
                    <div style={{fontWeight: 'bold'}}>block hash: {item[0]}</div> 
                    <div style={{marginLeft: '20px'}}>previousHash: {item[1].previousHash}</div>
                </div>
                <div style={{display: this.state.expanded ? 'block' : 'none', marginLeft: '20px'}}> 
                    <div>nonce: {item[1].nonce}</div> 
                    <div>target: {item[1].target}</div> 
                    {formatBlockTransactions(item[1].transactions)} 
                </div>
            </div> 
        );
    }
};

class Blockchain extends React.Component {

  render () {

    console.log(this.props.blockchain);
    return (
      <div style={{border: '1px solid black'}}>
        <div style={{borderBottom: '1px solid black'}}>Blockchain:</div>
        {this.props.blockchain.map(item => <Block key={item[0]} item={item} />)}
      </div>
    );
  } 
}

export {Blockchain};
