import React from 'react';


class UTxO extends React.Component {

  render () {

    return (
        <div style={{border: '1px solid black', overflowX: 'auto', marginTop: '20px'}}>
            <div style={{borderBottom: '1px solid black'}}>Unspent tx outputs:</div>
            {this.props.UTxO.map(UTxOutput => {
                return(
                    <div key={UTxOutput._id}>
                        <div style={{fontWeight: 'bold'}}>
                            transaction ID: {UTxOutput.txID}
                        </div>
                        <div style={{fontWeight: 'bold'}}>
                            index: {UTxOutput.index}
                        </div>
                        <div>
                            Controlling address: {UTxOutput.output.address}
                        </div>
                        <div>
                            Amount: {UTxOutput.output.amount}
                        </div>
                        <div>
                            location block hash: {UTxOutput.blockHash}
                        </div>
                    </div>
                );
            })}
            
        </div>
    );
  } 
}

export {UTxO};
