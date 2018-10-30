import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const Breadcrumb = ({
  children,
  className,
  classes,
  noTrailingSlash,
  ...other
}) => {
  const classNames = classnames(className, {
    [classes.container]: true,
    [classes.noTrailingSlash]: noTrailingSlash,
  });
  return (
    <div className={classNames} {...other}>
      {children}
    </div>
  );
};

Breadcrumb.propTypes = {
  /**
   * Pass in the BreadcrumbItem's for your Breadcrumb
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
    containerNoTrailingSlash: PropTypes.string,
  }),

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash: PropTypes.bool,
};

Breadcrumb.defaultProps = {
  classes: {
    container: 'bx--breadcrumb',
    containerNoTrailingSlash: 'bx--breadcrumb--no-trailing-slash',
  },
};

export default Breadcrumb;
