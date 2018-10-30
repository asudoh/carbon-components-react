import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const Accordion = ({ children, className, classes, ...other }) => {
  const classNames = classnames(classes.container, className);
  return (
    <ul
      className={classNames}
      role="tablist"
      aria-multiselectable="true"
      {...other}>
      {children}
    </ul>
  );
};

Accordion.propTypes = {
  /**
   * Pass in the children that will be rendered within the Accordion
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the optional list of CSS class names.
   */
  classes: PropTypes.shape({
    container: PropTypes.string,
  }),
};

Accordion.defaultProps = {
  classes: {
    container: 'bx--accordion',
  },
};

export default Accordion;
