import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const TableRow = props => {
  const { even, header, className, children, prefix, ...other } = props;

  const tableRowClasses = classNames(className, `${prefix}--table-row`, {
    [`${prefix}--parent-row`]: !header,
    [`${prefix}--parent-row--even`]: even,
  });

  return (
    <tr {...other} className={tableRowClasses}>
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  /**
   * Specify whether your TableRow should be used as a header row
   */
  header: PropTypes.bool,

  /**
   * Specify an optional className to be applied to your TableRow
   */
  className: PropTypes.string,

  /**
   * Provide the contents of your TableRow
   */
  children: PropTypes.node,

  /**
   * Specify whether the TableRow is at an even position
   */
  even: PropTypes.bool,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

TableRow.defaultProps = {
  header: false,
  prefix: 'bx',
};

export default TableRow;
