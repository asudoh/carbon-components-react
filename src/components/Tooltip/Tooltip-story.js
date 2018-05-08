import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip, { getMenuOffset, getFloatingPosition } from '../Tooltip';

storiesOf('Tooltip', module)
  .addWithInfo(
    'default (bottom)',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render above the element. The example below shows the default scenario.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip triggerText="Tooltip label">
          <p className="bx--tooltip__label">Tooltip subtitle</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaeca cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Tooltip>
      </div>
    )
  )
  .addWithInfo(
    'position - top',
    `
        Tooltips are used to supply additional information to an element when hovering over it. By default,
        the tooltip will render above the element. The example below shows specifying the position (supports 'bottom' and 'top')
      `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip triggerText="Tooltip - top" direction="top">
          <p className="bx--tooltip__label">Tooltip subtitle</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaeca cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Tooltip>
      </div>
    )
  )
  .addWithInfo(
    'position - right',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render above the element. The example below shows specifying the position (supports 'bottom' and 'top')
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip triggerText="Tooltip - right" direction="right">
          <p className="bx--tooltip__label">Tooltip subtitle</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaeca cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Tooltip>
      </div>
    )
  )
  .addWithInfo(
    'position - left',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render above the element. The example below shows specifying the position (supports 'bottom' and 'top')
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip triggerText="Tooltip - left" direction="left">
          <p className="bx--tooltip__label">Tooltip subtitle</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaeca cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Tooltip>
      </div>
    )
  )
  .addWithInfo(
    'no icon - bottom (default)',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip
          triggerText="Tooltip - no icon - bottom (default)"
          showIcon={false}>
          <p className="bx--tooltip__label">Tooltip subtitle</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaeca cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Tooltip>
      </div>
    )
  )
  .addWithInfo(
    'no icon - right',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip
          triggerText="Tooltip - no icon - right"
          direction="right"
          showIcon={false}>
          <p className="bx--tooltip__label">Tooltip subtitle</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaeca cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Tooltip>
      </div>
    )
  )
  .addWithInfo(
    'no icon - left',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip
          triggerText="Tooltip - no icon - left"
          direction="left"
          showIcon={false}>
          >
          <p className="bx--tooltip__label">Tooltip subtitle</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaeca cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Tooltip>
      </div>
    )
  )
  .addWithInfo(
    'click to open',
    `
      Tooltips are used to supply additional information to an element when hovering over it. The example
      below shows the option to open on click instead of hover, which is useful when including interactive
      elements such as links inside the tooltip.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip clickToOpen triggerText="Tooltip label">
          <p className="bx--tooltip__label">Tooltip with link</p>
          <a href="http://react.carbondesignsystem.com/" target="_blank">
            Visit Carbon React
          </a>
        </Tooltip>
      </div>
    )
  )
  .addWithInfo(
    'invert direction when tooltip is out of viewport',
    `
    Tooltips are used to supply additional information to an element when hovering over it. By default,
    the tooltip will render above the element. The example below shows the default scenario.
  `,
    () => {
      class TooltipWrapper extends Component {
        _triggerEl = null;

        state = { direction: this.props.direction };

        _setTriggerEl = el => {
          this._triggerEl = el;
        };

        _getMenuOffset = (menuBody, menuDirection) => {
          const { direction } = this.state;
          const menuSize = menuBody.getBoundingClientRect();
          const offset = getMenuOffset(menuBody, menuDirection);
          const position = getFloatingPosition({
            menuSize,
            refPosition: this._triggerEl.getBoundingClientRect(),
            offset,
            direction,
            scrollY: doc.defaultView.scrollY,
          });
          const doc = menuBody.ownerDocument;
          const viewportHeight = Math.max(
            doc.documentElement.clientHeight,
            doc.defaultView.innerHeight || 0
          );
          const { top } = position;
          if (
            menuDirection === 'bottom' &&
            (top + menuSize.height > viewportHeight + scrollY || top < 0)
          ) {
            this.setState({ direction: 'top' });
          }
          return { top: 0, left: 0 };
        };

        componentWillReceiveProps(props) {
          const { direction } = props;
          if (this.props.direction !== direction) {
            this.setState({ direction });
          }
        }

        render() {
          const { direction } = this.state;
          return (
            <Tooltip
              triggerRef={this._setTriggerEl}
              menuRef={this.menuRef}
              menuOffset={this._getMenuOffset}
              {...this.props}
              direction={direction}
            />
          );
        }
      }

      return (
        <div>
          Tooltip direction: top
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <div style={{ marginTop: '2rem' }}>
              <TooltipWrapper
                triggerText={`isDynamicDirection: ${num % 2 === 1}`}
                direction="bottom"
                isDynamicDirection={num % 2 === 1}>
                <p className="bx--tooltip__label">Tooltip direction is top</p>
                <p>
                  Component will calculate whether the defined direction will
                  cause the tooltip to go beyond the viewport. If so, it will
                  use the opposite direction.
                </p>
              </TooltipWrapper>
            </div>
          ))}
        </div>
      );
    }
  );
