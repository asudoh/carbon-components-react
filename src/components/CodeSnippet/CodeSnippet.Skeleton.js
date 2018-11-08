import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class CodeSnippetSkeleton extends Component {
  static propTypes = {
    /**
     * The type of code snippet
     * can be single or multi
     */
    type: PropTypes.oneOf(['single', 'multi']),

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * The selector prefix
     */
    prefix: PropTypes.string,
  };

  static defaultProps = {
    type: 'single',
    prefix: 'bx',
  };

  render() {
    const { className, type, prefix, ...other } = this.props;

    const codeSnippetClasses = classNames(className, {
      [`${prefix}--snippet`]: true,
      [`${prefix}--skeleton`]: true,
      [`${prefix}--snippet--single`]: type === 'single',
      [`${prefix}--snippet--multi`]: type === 'multi',
    });

    if (type === 'single') {
      return (
        <div className={codeSnippetClasses} {...other}>
          <div className={`${prefix}--snippet-container`}>
            <span />
          </div>
        </div>
      );
    }

    if (type === 'multi') {
      return (
        <div className={codeSnippetClasses} {...other}>
          <div className={`${prefix}--snippet-container`}>
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    }
  }
}
