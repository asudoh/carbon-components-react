import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class SearchSkeleton extends Component {
  static propTypes /*#__PURE_CLASS_PROPERTY__*/ = {
    /**
     * Specify whether the Search should be a small variant
     */
    small: PropTypes.bool,
  };

  static defaultProps /*#__PURE_CLASS_PROPERTY__*/ = {
    small: false,
  };

  render() {
    const { small, id } = this.props;

    const searchClasses = classNames({
      [`${prefix}--skeleton`]: true,
      [`${prefix}--search--lg`]: !small,
      [`${prefix}--search--sm`]: small,
    });

    return (
      <div className={searchClasses} role="search">
        {
          /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
          <label htmlFor={id} className={`${prefix}--label`} />
        }
        <div className={`${prefix}--search-input`} />
      </div>
    );
  }
}
