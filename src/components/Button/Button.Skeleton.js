import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const ButtonSkeleton = ({ classes, small, href }) => {
  const buttonClasses = classNames({
    [classes.skeleton]: true,
    [classes.container]: true,
    [classes.small]: small,
  });

  const commonProps = {
    className: buttonClasses,
  };

  const button = <button {...commonProps} type="button" />;

  const anchor = <a {...commonProps} href={href} role="button" />; // eslint-disable-line

  return href ? anchor : button;
};

ButtonSkeleton.propTypes = {
  /**
   * Specify the optional list of CSS class names.
   */
  classes: PropTypes.shape({
    container: PropTypes.string,
    small: PropTypes.string,
    skeleton: PropTypes.string,
  }),
  small: PropTypes.bool,
  href: PropTypes.string,
};

ButtonSkeleton.defaultProps = {
  classes: {
    container: 'bx--btn',
    small: 'bx--btn--sm',
    skeleton: 'bx--skeleton',
  },
  small: false,
};

export default ButtonSkeleton;
