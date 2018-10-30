import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import SkeletonText from '../SkeletonText';
import { iconChevronRight } from 'carbon-icons';

export default class AccordionSkeleton extends React.Component {
  static propTypes = {
    /**
     * Specify the optional list of CSS class names.
     */
    classes: PropTypes.shape({
      skeleton: PropTypes.string,
      container: PropTypes.string,
      item: PropTypes.string,
      itemActive: PropTypes.string,
      heading: PropTypes.string,
      arrow: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    }),
  };

  static defaultProps = {
    classes: {
      skeleton: 'bx--skeleton',
      container: 'bx--accordion',
      item: 'bx--accordion__item',
      itemActive: 'bx--accordion__item--active',
      heading: 'bx--accordion__heading',
      arrow: 'bx--accordion__arrow',
      title: 'bx--accordion__title',
      content: 'bx--accordion__content',
    },
  };

  render() {
    const { classes } = this.props;
    const item = (
      <li className={classes.item}>
        <button type="button" className={classes.heading}>
          <Icon className={classes.arrow} icon={iconChevronRight} />
          <SkeletonText className={classes.title} />
        </button>
      </li>
    );
    return (
      <ul className={`${classes.container} ${classes.skeleton}`}>
        <li className={`${classes.item} ${classes.itemActive}`}>
          <button type="button" className={classes.heading}>
            <Icon className={classes.arrow} icon={iconChevronRight} />
            <SkeletonText className={classes.title} />
          </button>
          <div className={classes.content}>
            <SkeletonText width="90%" />
            <SkeletonText width="80%" />
            <SkeletonText width="95%" />
          </div>
        </li>
        {item}
        {item}
        {item}
      </ul>
    );
  }
}
