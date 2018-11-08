import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

let didWarnAboutDeprecation = false;

const DropdownItem = ({
  className,
  value,
  isDropdownOpen,
  itemText,
  onClick,
  onKeyPress,
  href,
  selected,
  prefix,
  ...other
}) => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'The `DropdownItem` component has been deprecated and will be ' +
        'removed in the next major release of `carbon-components-react`. ' +
        'Please use `DropdownV2` instead.'
    );
    didWarnAboutDeprecation = true;
  }

  const dropdownItemClasses = classNames({
    [`${prefix}--dropdown-item`]: true,
    [className]: className,
  });

  const handleClick = () => {
    const info = {
      value,
      itemText,
    };
    onClick(info);
  };

  const handleKeypress = () => {
    const info = {
      value,
      itemText,
    };
    onKeyPress(info);
  };

  return (
    <li
      {...other}
      value={value}
      className={dropdownItemClasses}
      onClick={handleClick}
      onKeyPress={handleKeypress}
      tabIndex={-1}
      aria-selected={selected}
      role="option">
      <a
        tabIndex={isDropdownOpen ? 0 : -1}
        href={href}
        onClick={/* istanbul ignore next */ evt => evt.preventDefault()}
        className={`${prefix}--dropdown-link`}>
        {itemText}
      </a>
    </li>
  );
};

DropdownItem.propTypes = {
  /**
   * Specify the value of the <DropdownItem>
   */
  value: PropTypes.string.isRequired,

  /**
   * Specify the content of the <DropdownItem>
   */
  itemText: PropTypes.string.isRequired,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Provide an optional function to be called when the container node is
   * clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional function to be called when a key is pressed on the <DropdownItem>
   */
  onKeyPress: PropTypes.func,

  /**
   * Optional string representing the link location for the <DropdownItem>
   */
  href: PropTypes.string,

  /**
   * Specify whether the <DropdownItem> is selected
   */
  selected: PropTypes.bool,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

DropdownItem.defaultProps = {
  onClick: /* istanbul ignore next */ () => {},
  onKeyPress: /* istanbul ignore next */ () => {},
  href: '',
  selected: false,
  prefix: 'bx',
};

export default DropdownItem;
