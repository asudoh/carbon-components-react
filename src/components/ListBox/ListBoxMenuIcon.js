import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { iconCaretDown } from 'carbon-icons';
import Icon from '../Icon';

export const translationIds = {
  'close.menu': 'close.menu',
  'open.menu': 'open.menu',
};

const defaultTranslations = {
  [translationIds['close.menu']]: 'Close menu',
  [translationIds['open.menu']]: 'Open menu',
};

/**
 * `ListBoxMenuIcon` is used to orient the icon up or down depending on the
 * state of the menu for a given `ListBox`
 */
const ListBoxMenuIcon = ({ isOpen, prefix, translateWithId: t }) => {
  const className = cx({
    [`${prefix}--list-box__menu-icon`]: true,
    [`${prefix}--list-box__menu-icon--open`]: isOpen,
  });
  const description = isOpen ? t('close.menu') : t('open.menu');
  return (
    <div className={className}>
      <Icon icon={iconCaretDown} description={description} alt={description} />
    </div>
  );
};

ListBoxMenuIcon.propTypes = {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,

  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId: PropTypes.func.isRequired,
};

ListBoxMenuIcon.defaultProps = {
  prefix: 'bx',
  translateWithId: id => defaultTranslations[id],
};

export default ListBoxMenuIcon;
