import { connect } from 'react-redux';

import {MySelectComponent} from './MySelectComponent';

const mapDispatchToProps = (dispatch) => ({dispatch});

const mapStateToProps = (state) => {
  return {
      selectItems: state.UTxO
}};

const MySelectUnspentOutputs = connect(
  mapStateToProps,
  mapDispatchToProps
)(MySelectComponent);

export {MySelectUnspentOutputs};
