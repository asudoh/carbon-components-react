import React from 'react';
import PropTypes from 'prop-types';
import { iconCloseSolid, iconCheckmarkSolid } from 'carbon-icons';
import Icon from '../Icon';

export const FileUploadStatusIcon = ({ iconDescription, status, ...other }) => {
  switch (status) {
    case 'uploading':
      return (
        // The container of `<Loading small>` takes up 2em, which is too big here
        <div
          className="bx--loading"
          role="button"
          aria-live="assertive"
          {...other}>
          <svg
            className="bx--loading__svg"
            viewBox="-42 -42 84 84"
            aria-label={iconDescription}
            alt={iconDescription}>
            <title>{iconDescription}</title>
            <circle cx="0" cy="0" r="37.5" />
          </svg>
        </div>
      );
    case 'edit':
      return (
        <Icon
          description={iconDescription}
          className="bx--file-close"
          icon={iconCloseSolid}
          role="button"
          {...other}
        />
      );
    case 'complete':
      return (
        <Icon
          description={iconDescription}
          className="bx--file-complete"
          icon={iconCheckmarkSolid}
          role="button"
          {...other}
        />
      );
    default:
      return null;
  }
};

FileUploadStatusIcon.propTypes = {
  /**
   * Provide a description of the SVG icon to denote file upload status
   */
  iconDescription: PropTypes.string,

  /**
   * Provide an optional `onKeyDown` hook that is called if Space or Return is
   * pressed while the component is focused
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify the status of the File Upload
   */
  status: PropTypes.oneOf(['edit', 'complete', 'uploading']),

  /**
   * Provide a custom tabIndex value for the <FileUploadStatus>
   */
  tabIndex: PropTypes.number,
};

FileUploadStatusIcon.defaultProps = {
  iconDescription: 'Uploading file',
  onKeyDown: () => {},
  status: 'uploading',
  tabIndex: 0,
};

/**
 * The user interface to show file name and its uploading status.
 */
const FileUploadStatus = ({
  name,
  status,
  iconDescription,
  onClick,
  onKeyDown,
  ...other
}) => (
  <span className="bx--file__selected-file" {...other}>
    <p className="bx--file-filename">{name}</p>
    <span className="bx--file__state-container">
      <FileUploadStatusIcon
        iconDescription={iconDescription}
        status={status}
        onKeyDown={onKeyDown}
        onClick={onClick}
      />
    </span>
  </span>
);

FileUploadStatus.propTypes = {
  /**
   * Provide the file name.
   */
  name: PropTypes.string,

  /**
   * Specify the status of the File Upload
   */
  status: PropTypes.oneOf(['edit', 'complete', 'uploading']),

  /**
   * Provide a description of the SVG icon to denote file upload status
   */
  iconDescription: PropTypes.string,

  /**
   * Provide an optional `onClick` hook that is called if user clicks on the status icon
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional `onKeyDown` hook that is called if Space or Return is
   * pressed while the component is focused
   */
  onKeyDown: PropTypes.func,
};

export default FileUploadStatus;
