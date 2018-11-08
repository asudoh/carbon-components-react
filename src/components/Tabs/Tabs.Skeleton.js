import React from 'react';
import PropTypes from 'prop-types';

export default class TabsSkeleton extends React.Component {
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
    const { prefix } = this.props;
    const tab = (
      <li className={`${prefix}--tabs__nav-item`}>
        <div className={`${prefix}--tabs__nav-link`}>&nbsp;</div>
      </li>
    );
    return (
      <nav className={`${prefix}--tabs ${prefix}--skeleton`}>
        <div className={`${prefix}--tabs-trigger`}>
          <div className={`${prefix}--tabs-trigger-text`}>&nbsp;</div>
          <svg width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
            <path d="M10 0L5 5 0 0z" />
          </svg>
        </div>
        <ul className={`${prefix}--tabs__nav ${prefix}--tabs__nav--hidden`}>
          <li
            className={`${prefix}--tabs__nav-item ${prefix}--tabs__nav-item--selected`}>
            <div className={`${prefix}--tabs__nav-link`}> &nbsp;</div>
          </li>
          {tab}
          {tab}
          {tab}
        </ul>
      </nav>
    );
  }
}
