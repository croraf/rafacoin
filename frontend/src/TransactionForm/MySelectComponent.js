import React from 'react';


import { Grid, Row, Col } from 'react-flexbox-grid';

import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

import {change} from 'redux-form';

class MySelectComponent extends React.Component {

    render () {
        console.log('output index select items:', this.props.selectItems);

        return (
            <FormControl style={{width: '95%'}}>
                <InputLabel>{this.props.label}</InputLabel>
                <Select
                    {...this.props.input}
                    onChange={
                        (event) => {
                            console.log('select change:', event.target.value);
                            this.props.dispatch && this.props.dispatch(change('transaction', `inputs[${this.props.index}].outputIndex`, ''));
                            this.props.input.onChange(event.target.value);
                        }
                    }
                >
                    {this.props.selectItems.map((item) => (

                        <MenuItem value={item} key={item}>{item.toString()}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}


export {MySelectComponent};
