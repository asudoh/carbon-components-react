import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import classNames from 'classnames';
import { ButtonTypes } from '../../prop-types/types';

const Button = ({
  children,
  className,
  classes,
  disabled,
  small,
  kind,
  href,
  tabIndex,
  type,
  icon,
  iconDescription,
  ...other
}) => {
  const buttonClasses = classNames(className, {
    [classes.container]: true,
    [classes.small]: small,
    [classes.primary]: kind === 'primary',
    [classes.danger]: kind === 'danger',
    [classes.secondary]: kind === 'secondary',
    [classes.ghost]: kind === 'ghost',
    [classes.dangerPrimary]: kind === 'danger--primary',
    [classes.tertiary]: kind === 'tertiary',
  });

  const commonProps = {
    tabIndex,
    className: buttonClasses,
  };

  const buttonImage = icon ? (
    <Icon
      icon={Object(icon) === icon ? icon : undefined}
      name={Object(icon) !== icon ? icon : undefined}
      description={iconDescription}
      className={classes.icon}
    />
  ) : null;

  const button = (
    <button
      {...other}
      {...commonProps}
      disabled={disabled}
      type={type}
      ref={other.inputref}>
      {children}
      {buttonImage}
    </button>
  );

  const anchor = (
    <a
      {...other}
      {...commonProps}
      href={href}
      role="button"
      ref={other.inputref}>
      {children}
      {buttonImage}
    </a>
  );

  return href ? anchor : button;
};

Button.propTypes = {
  /**
   * Specify the content of your Button
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Button
   */
  className: PropTypes.string,

  /**
   * Specify the optional list of CSS class names.
   */
  classes: PropTypes.shape({
    container: PropTypes.string,
    small: PropTypes.string,
    primary: PropTypes.string,
    danger: PropTypes.string,
    secondary: PropTypes.string,
    ghost: PropTypes.string,
    dangerPrimary: PropTypes.string,
    tertiary: PropTypes.string,
    icon: PropTypes.string,
  }),

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the Button should be a small variant
   */
  small: PropTypes.bool,

  /**
   * Specify the kind of Button you want to create
   */
  kind: ButtonTypes.buttonKind.isRequired,

  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  href: PropTypes.string,

  /**
   * Optional prop to specify the tabIndex of the Button
   */
  tabIndex: PropTypes.number,

  /**
   * Optional prop to specify the type of the Button
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),

  /**
   * Optional prop to specify the role of the Button
   */
  role: PropTypes.string,

  /**
   * Specify an icon to include in the Button through a string or object
   * representing the SVG data of the icon
   */
  icon: PropTypes.oneOfType([
    PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      viewBox: PropTypes.string.isRequired,
      svgData: PropTypes.object.isRequired,
    }),
    PropTypes.string,
  ]),

  /**
   * If specifying the `icon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription: props => {
    if (props.icon && !props.iconDescription) {
      return new Error(
        'icon property specified without also providing an iconDescription property.'
      );
    }
    return undefined;
  },
};

Button.defaultProps = {
  classes: {
    container: 'bx--btn',
    small: 'bx--btn--sm',
    primary: 'bx--btn--primary',
    danger: 'bx--btn--danger',
    secondary: 'bx--btn--secondary',
    ghost: 'bx--btn--ghost',
    dangerPrimary: 'bx--btn--danger--primary',
    tertiary: 'bx--btn--tertiary',
    icon: 'bx--btn__icon',
  },
  iconDescription: 'Provide icon description if icon is used',
  tabIndex: 0,
  type: 'button',
  disabled: false,
  small: false,
  kind: 'primary',
};

export default Button;
