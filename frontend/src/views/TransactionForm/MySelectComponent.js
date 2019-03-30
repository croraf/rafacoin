import React from 'react';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';

import {change} from 'redux-form';

class MySelectComponent extends React.Component {

    render () {
        console.log('Select items:', this.props.selectItems);

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

                        <MenuItem value={item._id} key={item._id}>{item.txID + ' - ' + item.index}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}


export {MySelectComponent};
