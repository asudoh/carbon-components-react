import React from 'react';
import PropTypes from 'prop-types';

export default class ToggleSmallSkeleton extends React.Component {
  static propTypes = {
    /**
     * The selector prefix.
     */
    prefix: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'bx',
  };

  render() {
    const { id, prefix } = this.props;
    return (
      <div className={`${prefix}--form-item`}>
        <input
          type="checkbox"
          id={id}
          className={`${prefix}--toggle ${prefix}--toggle--small ${prefix}--skeleton`}
        />

        <label
          className={`${prefix}--toggle__label ${prefix}--skeleton`}
          htmlFor={id}>
          <span className={`${prefix}--toggle__appearance`}>
            <svg
              className={`${prefix}--toggle__check`}
              width="6px"
              height="5px"
              viewBox="0 0 6 5">
              <path d="M2.2403 2.7299L4.9245 0 6 1.1117 2.2384 5 0 2.6863 1.0612 1.511z" />
            </svg>
          </span>
        </label>
      </div>
    );
  }
}
