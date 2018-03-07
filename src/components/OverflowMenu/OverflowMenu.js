import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import ClickListener from '../../internal/ClickListener';
import FloatingMenu from '../../internal/FloatingMenu';
import OptimizedResize from '../../internal/OptimizedResize';
import Icon from '../Icon';

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
const getMenuOffset = menuBody => {
  const menuWidth = menuBody.offsetWidth;
  const arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(
    menuBody,
    ':before'
  );
  const values = ['top', 'left', 'width', 'height', 'border-top-width'].reduce(
    (o, name) => ({
      ...o,
      [name]: Number(
        (/^([\d-]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1]
      ),
    }),
    {}
  );
  if (Object.keys(values).every(name => !isNaN(values[name]))) {
    const {
      top,
      left,
      width,
      height,
      'border-top-width': borderTopWidth,
    } = values;
    return {
      left:
        menuWidth / 2 -
        (left + Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2),
      top: Math.sqrt(Math.pow(borderTopWidth, 2) * 2) - top,
    };
  }
};

export default class OverflowMenu extends Component {
  static propTypes = {
    /**
     * `true` if the menu should be open.
     */
    open: PropTypes.bool,

    /**
     * `true` if the menu alignment should be flipped.
     */
    flipped: PropTypes.bool,

    /**
     * `true` if the menu should be floated.
     * Useful when the container of the triggering element cannot have `overflow:visible` style, etc.
     */
    floatingMenu: PropTypes.bool,

    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The `tabindex` attribute.
     */
    tabIndex: PropTypes.number,

    /**
     * The element ID.
     */
    id: PropTypes.string,

    /**
     * The ARIA label.
     */
    ariaLabel: PropTypes.string,

    /**
     * The event handler for the `click` event.
     */
    onClick: PropTypes.func,

    /**
     * The event handler for the `focus` event.
     */
    onFocus: PropTypes.func,

    /**
     * The event handler for the `keydown` event.
     */
    onKeyDown: PropTypes.func,

    /**
     * The icon description.
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * The icon name.
     */
    iconName: PropTypes.string,

    /**
     * The adjustment in position applied to the floating menu.
     */
    menuOffset: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The adjustment in position applied to the floating menu.
     */
    menuOffsetFlip: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The CSS class for the icon.
     */
    iconClass: PropTypes.string,
  };

  static defaultProps = {
    ariaLabel: 'list of options',
    iconDescription: 'open and close list of options',
    iconName: 'overflow-menu',
    open: false,
    flipped: false,
    floatingMenu: false,
    onClick: () => {},
    onKeyDown: () => {},
    tabIndex: 0,
    menuOffset: getMenuOffset,
    menuOffsetFlip: getMenuOffset,
  };

  state = {
    /**
     * The open/closed state.
     * @type {boolean}
     */
    open: this.props.open,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.open && !this.state.open) {
      requestAnimationFrame(() => {
        this.getMenuPosition();
      });
      return false; // Let `.getMenuPosition()` cause render
    }
    return true;
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.getMenuPosition();
    });
    this.hResize = OptimizedResize.add(() => {
      this.getMenuPosition();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
    }
  }

  componentWillUnmount() {
    this.hResize.release();
  }

  getMenuPosition = () => {
    if (this.menuEl) {
      const menuPosition = this.menuEl.getBoundingClientRect();
      this.setState({ menuPosition });
    }
  };

  handleClick = evt => {
    this.setState({ open: !this.state.open });
    this.props.onClick(evt);
  };

  handleKeyDown = evt => {
    const key = evt.key || evt.which;
    const isOverflowMenuIcon =
      evt.target && evt.target.classList.contains('bx--overflow-menu');
    if ((key === 'ArrowDown' || key === 40) && isOverflowMenuIcon) {
      if (evt.target.querySelector('button')) {
        evt.target.querySelector('button').focus();
      }
    }
    const direction = {
      38: -1,
      40: 1,
    }[evt.which];
    const menuBody = this.menuBody;
    const items = menuBody && [
      ...menuBody.querySelectorAll('.bx--overflow-menu-options__btn'),
    ];
    if (
      typeof direction !== 'undefined' &&
      menuBody &&
      menuBody.contains(evt.target)
    ) {
      const button =
        evt.target && evt.target.closest('.bx--overflow-menu-options__btn');
      // `items.indexOf(button)` may be -1 (Scenario of no previous focus)
      const nextItem = items[items.indexOf(button) + direction];
      if (nextItem) {
        nextItem.focus();
      } else {
        this.setState({ open: false }, () => {
          if (this.menuEl) {
            this.menuEl.focus();
          }
        });
      }
    }
    if ([13, 32].indexOf(evt.which) >= 0) {
      const shouldBeOpen = !this.state.open;
      this.setState({ open: shouldBeOpen }, () => {
        if (shouldBeOpen) {
          const firstItem =
            this.menuBody &&
            this.menuBody.querySelector('.bx--overflow-menu-options__btn');
          firstItem && firstItem.focus();
        } else {
          this.menuEl && this.menuEl.focus();
        }
      });
    }
  };

  handleClickOutside = () => {
    this.closeMenu();
  };

  closeMenu = () => {
    this.setState({ open: false });
  };

  bindMenuEl = menuEl => {
    this.menuEl = menuEl;
  };

  bindMenuBody = menuBody => {
    this.menuBody = menuBody;
  };

  render() {
    const {
      id,
      tabIndex,
      ariaLabel,
      children,
      iconDescription,
      iconName,
      flipped,
      floatingMenu,
      menuOffset,
      menuOffsetFlip,
      iconClass,
      onClick, // eslint-disable-line
      ...other
    } = this.props;

    const { open } = this.state;

    const overflowMenuClasses = classNames(
      this.props.className,
      'bx--overflow-menu',
      {
        'bx--overflow-menu--open': open,
      }
    );

    const overflowMenuOptionsClasses = classNames('bx--overflow-menu-options', {
      'bx--overflow-menu--flip': this.props.flipped,
      'bx--overflow-menu-options--open': open,
    });

    const overflowMenuIconClasses = classNames(
      'bx--overflow-menu__icon',
      iconClass
    );

    const childrenWithProps = React.Children.toArray(children).map(child =>
      React.cloneElement(child, {
        closeMenu: this.closeMenu,
      })
    );

    const menuBody = (
      <ul
        role="menu"
        aria-label="overflow menu options"
        className={overflowMenuOptionsClasses}>
        {childrenWithProps}
      </ul>
    );
    const wrappedMenuBody = !floatingMenu ? (
      menuBody
    ) : (
      <div role="presentation">
        <FloatingMenu
          menuPosition={this.state.menuPosition}
          menuOffset={flipped ? menuOffsetFlip : menuOffset}
          menuRef={this.bindMenuBody}>
          {menuBody}
        </FloatingMenu>
      </div>
    );

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div
          {...other}
          role="button"
          aria-haspopup
          aria-expanded={this.state.open}
          className={overflowMenuClasses}
          onKeyDown={this.handleKeyDown}
          aria-label={ariaLabel}
          id={id}
          tabIndex={tabIndex}
          ref={this.bindMenuEl}>
          <Icon
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            className={overflowMenuIconClasses}
            name={iconName}
            description={iconDescription}
            style={{ width: '100%' }}
          />
          {open && wrappedMenuBody}
        </div>
      </ClickListener>
    );
  }
}
