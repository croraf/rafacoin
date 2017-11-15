

import { connect } from 'react-redux';

import {Blockchain} from './Blockchain';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => {
  return {
    blockchain: state.blockchain
}};

const BlockchainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blockchain)

export {BlockchainContainer};
