

import { connect } from 'react-redux';

import {Transactions} from './Transactions';

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions
}};

const TransactionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions)

export {TransactionsContainer};
