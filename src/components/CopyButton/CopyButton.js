import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { iconCopy } from 'carbon-icons';
import Icon from '../Icon';

export default class CopyButton extends Component {
  static propTypes = {
    /**
     * Specify an optional className to be applied to the underlying <button>
     */
    className: PropTypes.string,

    /**
     * Provide a description for the icon representing the copy action that can
     * be read by screen readers
     */
    iconDescription: PropTypes.string,

    /**
     * Specify the string that is displayed when the button is clicked and the
     * content is copied
     */
    feedback: PropTypes.string,

    /**
     * Specify the time it takes for the feedback message to timeout
     */
    feedbackTimeout: PropTypes.number,

    /**
     * The selector prefix
     */
    prefix: PropTypes.string,

    /**
     * Specify an optional `onClick` handler that is called when the underlying
     * <button> is clicked
     */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    iconDescription: 'Copy to clipboard',
    feedback: 'Copied!',
    feedbackTimeout: 2000,
    prefix: 'bx',
    onClick: () => {},
  };

  state = {
    showFeedback: false,
  };

  /* istanbul ignore next */
  componentWillUnmount() {
    if (typeof this.timeoutId !== 'undefined') {
      clearTimeout(this.timeoutId);
      delete this.timeoutId;
    }
  }

  handleClick = evt => {
    this.setState({ showFeedback: true });
    this.timeoutId = setTimeout(() => {
      this.setState({ showFeedback: false });
    }, this.props.feedbackTimeout);

    this.props.onClick(evt);
  }; // eslint-disable-line no-unused-vars

  render() {
    const {
      iconDescription,
      className,
      feedback,
      feedbackTimeout, // eslint-disable-line no-unused-vars
      prefix,
      onClick, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;
    const classNames = classnames(`${prefix}--snippet-button`, className);
    const feedbackClassNames = classnames(`${prefix}--btn--copy__feedback`, {
      [`${prefix}--btn--copy__feedback--displayed`]: this.state.showFeedback,
    });

    return (
      <button
        type="button"
        className={classNames}
        onClick={this.handleClick}
        {...other}>
        <Icon
          className={`${prefix}--snippet__icon`}
          icon={iconCopy}
          description={iconDescription}
        />
        <div className={feedbackClassNames} data-feedback={feedback} />
      </button>
    );
  }
}
