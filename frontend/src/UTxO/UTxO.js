import React from 'react';


class UTxO extends React.Component {

  render () {

    return (
        <div style={{border: '1px solid black', overflowX: 'auto', marginTop: '20px'}}>
            <div style={{borderBottom: '1px solid black'}}>Unspent tx outputs:</div>
            {this.props.UTxO.map(UTxOutput => {
                return(
                    <div key={UTxOutput[0]}>
                      <div style={{fontWeight: 'bold'}}>
                          transaction: {UTxOutput[0]}
                      </div>
                      <div>
                          location block hash: {UTxOutput[1].blockHash}
                      </div>
                      <div>
                          output indexes: 
                          {
                              UTxOutput[1].unspentOutputs.map(
                                outputIndex => <span key={outputIndex} style={{marginRight: '5px'}}>{outputIndex}</span>
                              )
                          }
                      </div>
                    </div>
                );
            })}
            
        </div>
    );
  } 
}

export {UTxO};
