

import { connect } from 'react-redux';

import {UTxO} from './UTxO';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => {
  return {
    UTxO: state.UTxO
}};

const UTxOContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UTxO)

export {UTxOContainer};
