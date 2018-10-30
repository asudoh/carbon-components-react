import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Link from '../Link';

const newChild = (children, href, className) => {
  if (typeof children === 'string' && !(href === undefined)) {
    return <Link href={href}>{children}</Link>;
  } else {
    return React.cloneElement(React.Children.only(children), {
      className,
    });
  }
};

const BreadcrumbItem = ({ children, className, classes, href, ...other }) => {
  const classNames = classnames(classes.container, className);
  return (
    <div className={classNames} {...other}>
      {newChild(children, href, classes.link)}
    </div>
  );
};

BreadcrumbItem.propTypes = {
  /**
   * Pass in content that will be inside of the BreadcrumbItem
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
    link: PropTypes.string,
  }),

  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href: PropTypes.string,
};

BreadcrumbItem.defaultProps = {
  classes: {
    container: 'bx--breadcrumb-item',
    link: 'bx--link',
  },
};

export default BreadcrumbItem;
