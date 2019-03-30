import React from 'react';

import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core/Input';
import { MenuItem } from '@material-ui/core/Menu';
import { FormControl } from '@material-ui/core/Form';

import {change} from 'redux-form';

class MySelectComponent extends React.Component {

    render () {
        console.log('Address list:', this.props.selectItems);

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
                    {this.props.selectItems.map((item, index) => (

                        <MenuItem value={index} key={index}>{item.address}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

import { connect } from 'react-redux';


const mapDispatchToProps = () => ({});


const mapStateToProps = (state, props) => {

    return {
        selectItems: state.addressInfo
    }
};

const MySelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MySelectComponent);

export {MySelectContainer};
