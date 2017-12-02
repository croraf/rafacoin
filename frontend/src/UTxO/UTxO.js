import React from 'react';


class UTxO extends React.Component {

  render () {

    return (
        <div style={{border: '1px solid black', overflowX: 'auto', marginTop: '20px'}}>
            <div style={{borderBottom: '1px solid black'}}>Unspent tx outputs:</div>
            {this.props.UTxO.map(UTxOutput => {
                return(
                    <div key={UTxOutput.txID + '-' + UTxOutput.index}>
                      <div style={{fontWeight: 'bold'}}>
                          transaction: {UTxOutput.txID}
                      </div>
                      <div>
                          location block hash: {UTxOutput.blockHash}
                      </div>
                      <div>
                        transaction data: TO ADD!!!
                      </div>
                      <div style={{marginRight: '5px'}}>
                          index: {UTxOutput.index}
                      </div>
                    </div>
                );
            })}
            
        </div>
    );
  } 
}

export {UTxO};
