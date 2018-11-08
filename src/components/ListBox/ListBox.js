import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ListBoxField from './ListBoxField';
import ListBoxMenu from './ListBoxMenu';
import { ListBoxType } from './ListBoxPropTypes';
import childrenOf from '../../prop-types/childrenOf';

const handleOnKeyDown = event => {
  if (event.keyCode === 27) {
    event.stopPropagation();
  }
};

const handleClick = event => {
  event.preventDefault();
  event.stopPropagation();
};

/**
 * `ListBox` is a generic container component that handles creating the
 * container class name in response to certain props.
 */
const ListBox = ({
  ariaLabel,
  children,
  className: containerClassName,
  disabled,
  innerRef,
  type,
  invalid,
  invalidText,
  light,
  prefix,
  ...rest
}) => {
  const className = cx({
    [containerClassName]: !!containerClassName,
    [`${prefix}--list-box`]: true,
    [`${prefix}--list-box--inline`]: type === 'inline',
    [`${prefix}--list-box--disabled`]: disabled,
    [`${prefix}--list-box--light`]: light,
  });
  return (
    <>
      <div
        {...rest}
        role="listbox"
        aria-label={ariaLabel}
        tabIndex="0"
        className={className}
        ref={innerRef}
        onKeyDown={handleOnKeyDown}
        onClick={handleClick}
        data-invalid={invalid || undefined}
        aria-invalid={invalid || undefined}>
        {children}
      </div>
      {invalid ? (
        <div className={`${prefix}--form-requirement`}>{invalidText}</div>
      ) : null}
    </>
  );
};

ListBox.propTypes = {
  children: childrenOf([ListBoxField, ListBoxMenu]),

  /**
   * Specify a class name to be applied on the containing list box node
   */
  className: PropTypes.string,

  /**
   * `innerRef` hook used for libraries like Downshift that require a reference
   * on a container node when it is not a native element
   */
  innerRef: PropTypes.func.isRequired,

  /**
   * Specify whether the ListBox is currently disabled
   */
  disabled: PropTypes.bool.isRequired,

  /**
   * Specify the "type" of the ListBox. Currently supports either `default` or
   * `inline` as an option.
   */
  type: ListBoxType.isRequired,

  /**
   * Specify the "aria-label" of the ListBox.
   */
  ariaLabel: PropTypes.string,

  /**
   * The selector prefix.
   */
  prefix: PropTypes.string,
};

ListBox.defaultProps = {
  innerRef: () => {},
  disabled: false,
  type: 'default',
  ariaLabel: 'Choose an item',
  prefix: 'bx',
};

export default ListBox;
