import React from 'react';


import { Grid, Row, Col } from 'react-flexbox-grid';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {change} from 'redux-form';

class MySelectComponent extends React.Component {

    render () {
        console.log('output index select items:', this.props.selectItems);

        return (
            <SelectField
                {...this.props.input}
                onChange={
                    (event, index, value) => {
                        console.log('select change:', event, index, value);
                        this.props.dispatch && this.props.dispatch(change('transaction', `inputs[${this.props.index}].outputIndex`, ''));
                        this.props.input.onChange(value);
                    }
                }
                maxHeight={200}
                
                floatingLabelFixed={true}
                floatingLabelText={this.props.label}
                style={{width: '95%'}}
            >
                {this.props.selectItems.map((item) => <MenuItem value={item} key={item} primaryText={item.toString()} />)}
            </SelectField>
        );
    }
}


export {MySelectComponent};
