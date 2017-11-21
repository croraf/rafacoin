import { connect } from 'react-redux';

import {MySelectComponent} from './MySelectComponent';

const mapDispatchToProps = (dispatch) => ({dispatch});

const mapStateToProps = (state) => {
  return {
      selectItems: state.UTxO.map(item => item[0])
}};

const MySelectInputTx = connect(
  mapStateToProps,
  mapDispatchToProps
)(MySelectComponent);

export {MySelectInputTx};
