import React from 'react';
import PropTypes from 'prop-types';

export default class WithState extends React.PureComponent {
  static propTypes /*#__PURE_CLASS_PROPERTY__*/ = {
    initialState: PropTypes.object,
  };

  UNSAFE_componentWillMount() {
    this.setState(this.props.initialState);
  }

  boundSetState = (...args) => this.setState(...args);

  render() {
    return this.props.children({
      state: this.state,
      setState: this.boundSetState,
    });
  }
}
