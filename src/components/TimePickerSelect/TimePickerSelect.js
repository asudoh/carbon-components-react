import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { iconCaretDown } from 'carbon-icons';

export default class TimePickerSelect extends Component {
  static propTypes = {
    /**
     * Provide the contents of your TimePickerSelect
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the node containing the label and the select box
     */
    className: PropTypes.string,

    /**
     * Specify a custom `id` for the `<select>`
     */
    id: PropTypes.string.isRequired,

    /**
     * Specify whether you want the inline version of this control
     */
    inline: PropTypes.bool,

    /**
     * Specify whether the control is disabled
     */
    disabled: PropTypes.bool,

    /**
     * Optionally provide the default value of the `<select>`
     */
    defaultValue: PropTypes.any,

    /**
     * Provide a description for the twistie icon that can be read by screen readers
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * Specify whether the label should be hidden, or not
     */
    hideLabel: PropTypes.bool,

    /**
     * Provide label text to be read by screen readers when interacting with the
     * control
     */
    labelText: PropTypes.node.isRequired,

    /**
     * The selector prefix
     */
    prefix: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    inline: true,
    iconDescription: 'open list of options',
    hideLabel: true,
    prefix: 'bx',
  };

  render() {
    const {
      id,
      disabled,
      children,
      iconDescription,
      className,
      hideLabel,
      labelText,
      inline, // eslint-disable-line
      prefix,
      ...other
    } = this.props;

    const selectClasses = classNames({
      [`${prefix}--select`]: true,
      [`${prefix}--time-picker__select`]: true,
      [`${prefix}--select--inline`]: true,
      [className]: className,
    });

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    return (
      <div className={selectClasses}>
        {label}
        <select
          {...other}
          id={id}
          className={`${prefix}--select-input`}
          disabled={disabled}>
          {children}
        </select>
        <Icon
          icon={iconCaretDown}
          className={`${prefix}--select__arrow`}
          description={iconDescription}
        />
      </div>
    );
  }
}
