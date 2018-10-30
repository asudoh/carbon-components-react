import React from 'react';
import PropTypes from 'prop-types';

export default class CheckboxSkeleton extends React.Component {
  /**
   * Specify the optional list of CSS class names.
   */
  static propTypes = PropTypes.shape({
    wrapper: PropTypes.string,
    label: PropTypes.string,
  });

  static defaultProps = {
    wrapper: 'bx--form-item bx--checkbox-wrapper',
    label: 'bx--checkbox-label bx--skeleton',
  };

  render() {
    const { id, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        {
          // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
          <label className={classes.label} htmlFor={id} />
        }
      </div>
    );
  }
}
