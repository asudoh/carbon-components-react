import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Checkbox = ({
  classes,
  className,
  id,
  labelText,
  onChange,
  indeterminate,
  hideLabel,
  wrapperClassName,
  title = '',
  ...other
}) => {
  let input;
  const labelClasses = classNames(classes.label, className);
  const innerLabelClasses = classNames({
    [classes.innerLabelHidden]: hideLabel,
  });
  const wrapperClasses = classNames(classes.wrapper, wrapperClassName);

  return (
    <div className={wrapperClasses}>
      <input
        {...other}
        type="checkbox"
        onChange={evt => {
          onChange(input.checked, id, evt);
        }}
        className={classes.checkbox}
        id={id}
        ref={el => {
          input = el;
          if (input) {
            input.indeterminate = indeterminate;
          }
        }}
      />
      <label htmlFor={id} className={labelClasses} title={title || null}>
        <span className={innerLabelClasses}>{labelText}</span>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  /**
   * Specify whether the underlying input should be checked
   */
  checked: PropTypes.bool,

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate: PropTypes.bool,

  /**
   * Specify an optional className to be applied to the <label> node
   */
  className: PropTypes.string,

  /**
   * Specify the optional list of CSS class names.
   */
  classes: {
    checkbox: 'bx--checkbox',
    label: 'bx--checkbox-label',
    wrapper: 'bx--checkbox-wrapper bx--form-item',
    innerLabelHidden: 'bx--visually-hidden',
  },

  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Receives three arguments: true/false, the checkbox's id, and the dom event.
   * `(value, id, event) => console.log({value, id, event})`
   */
  onChange: PropTypes.func,

  /**
   * Specify a title for the <label> node for the Checkbox
   */
  title: PropTypes.string,

  /**
   * The CSS class name to be placed on the wrapping element
   */
  wrapperClassName: PropTypes.string,
};

Checkbox.defaultProps = {
  classes: {
    checkbox: 'bx--checkbox',
    label: 'bx--checkbox-label',
    wrapper: 'bx--checkbox-wrapper bx--form-item',
    innerLabelHidden: 'bx--visually-hidden',
  },
  onChange: () => {},
  indeterminate: false,
};

export default Checkbox;
