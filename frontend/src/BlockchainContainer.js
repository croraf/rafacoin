

import { connect } from 'react-redux';

import {Blockchain} from './Blockchain';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    blockchain: state
}};

const BlockchainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blockchain)

export {BlockchainContainer};
