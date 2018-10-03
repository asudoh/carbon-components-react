import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ButtonTypes } from '../../prop-types/types';
import { FileUploaderButton } from '../FileUploader';

export default function FileUploaderV2({
  children,
  buttonLabel,
  buttonKind,
  labelDescription,
  labelTitle,
  className,
  multiple,
  accept,
  name,
  onChange,
  tabIndex,
  role,
  id,
  ...other
}) {
  const classes = classNames({
    'bx--form-item': true,
    [className]: className,
  });

  return (
    <div className={classes} {...other}>
      <strong className="bx--label">{labelTitle}</strong>
      <p className="bx--label-description">{labelDescription}</p>
      <FileUploaderButton
        labelText={buttonLabel}
        multiple={multiple}
        buttonKind={buttonKind}
        onChange={onChange}
        accept={accept}
        name={name}
        tabIndex={tabIndex}
        role={role}
        id={id}
        disableLabelChanges={true}
      />
      <div className="bx--file-container">{children}</div>
    </div>
  );
}

FileUploaderV2.propTypes = {
  /**
   * Provide a label for the <FileUploaderButton>
   */
  buttonLabel: PropTypes.string,
  /**
   * Specify the type of underlying button
   */
  buttonKind: ButtonTypes.buttonKind,
  /**
   * Provide description text for the <FileUploaderV2> label
   */
  labelDescription: PropTypes.string,
  /**
   * Provide a label title for the input form
   */
  labelTitle: PropTypes.string,
  /**
   * Provide a unique id for the underlying <input> node
   */
  id: PropTypes.string,
  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,
  /**
   * Provide a name for the underlying <input> node
   */
  name: PropTypes.string,
  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick: PropTypes.func,
  /**
   * Provide an optional `onChange` hook that is called each time the <input>
   * value changes
   */
  onChange: PropTypes.func,
  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),
  /**
   * Array of files in <FileUploaderV2>
   */
  files: PropTypes.arrayOf(PropTypes.object),
  /**
   * Provide a custom tabIndex value for the <FileUploaderButton>
   */
  tabIndex: PropTypes.number,
  /**
   * Provide an accessibility role for the <FileUploaderButton>
   */
  role: PropTypes.string,
};

FileUploaderV2.defaultProps = {
  buttonLabel: 'Upload',
  buttonKind: 'primary',
  multiple: false,
  onClick: () => {},
  onChange: () => {},
  accept: [],
  files: [],
  tabIndex: 0,
};
