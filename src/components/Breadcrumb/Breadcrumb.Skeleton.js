import React from 'react';
import PropTypes from 'prop-types';

export default class BreadcrumbSkeleton extends React.Component {
  static propTypes = {
    /**
     * Specify the optional list of CSS class names.
     */
    classes: PropTypes.shape({
      container: PropTypes.string,
      link: PropTypes.string,
      breadcrumb: PropTypes.string,
      skeleton: PropTypes.string,
    }),
  };

  static defaultProps = {
    classes: {
      container: 'bx--breadcrumb-item',
      link: 'bx--link',
      breadcrumb: 'bx--breadcrumb',
      skeleton: 'bx--skeleton',
    },
  };

  render() {
    const { classes } = this.props;
    const item = (
      <div className={classes.container}>
        <a href="/#" className={classes.link}>
          &nbsp;
        </a>
      </div>
    );
    return (
      <div className={`${classes.breadcrumb} ${classes.skeleton}`}>
        {item}
        {item}
        {item}
      </div>
    );
  }
}
