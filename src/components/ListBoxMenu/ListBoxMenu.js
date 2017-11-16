import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';

class ListBoxMenu extends Component {
  componentWillMount() {
    this._uniqueId = `_list-box-menu_${Math.random()
      .toString(36)
      .slice(2)}`;
  }

  render() {
    const {
      items,
      selectedItem,
      highlightedIndex,
      itemToString,
      getItemProps,
      onChangeCheckbox,
      onKeyDownMenu,
    } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="bx--list-box__menu" onKeyDown={onKeyDownMenu}>
        {items.map((item, i) => {
          const uniqueItemId = `${this._uniqueId}_${item.id}`;
          return (
            <div
              key={uniqueItemId}
              className={cx({
                'bx--list-box__menu-item': true,
                'bx--list-box__menu-item--highlighted': highlightedIndex === i,
                'bx--list-box__menu-item--active':
                  selectedItem.indexOf(item) !== -1,
              })}
              {...getItemProps({
                item,
                index: i,
              })}>
              <input
                id={uniqueItemId}
                value={item.id}
                name={itemToString(item)}
                className="bx--checkbox"
                type="checkbox"
                checked={selectedItem.indexOf(item) !== -1}
                readOnly={true}
                onChange={onChangeCheckbox}
              />
              <label htmlFor={uniqueItemId} className="bx--checkbox-label">
                <span className="bx--checkbox-appearance">
                  <Icon className="bx--checkbox-checkmark" name="checkmark" />
                </span>
                {itemToString(item)}
              </label>
            </div>
          );
        })}
      </div>
    );
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.array.isRequired,
    highlightedIndex: PropTypes.number,
    itemToString: PropTypes.func.isRequired,
    getItemProps: PropTypes.func.isRequired,
  };
}

export default ListBoxMenu;
