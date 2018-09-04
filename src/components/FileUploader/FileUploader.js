/* eslint react/no-multi-comp: "off" */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uid from '../../tools/uniqueId';
import { ButtonTypes } from '../../prop-types/types';
import FileUploaderItem from '../FileUploaderItem/FileUploaderItem';

export class FileUploaderButton extends Component {
  state = {};

  static propTypes = {
    /**
     * Provide a custom className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether you want to disable any updates to the FileUploaderButton
     * label
     */
    disableLabelChanges: PropTypes.bool,

    /**
     * Provide a unique id for the underlying <input> node
     */
    id: PropTypes.string,

    /**
     * Provide the label text to be read by screen readers when interacting with
     * this control
     */
    labelText: PropTypes.string,

    /**
     * Specify if the component should accept multiple files to upload
     */
    multiple: PropTypes.bool,

    /**
     * Provide a name for the underlying <input> node
     */
    name: PropTypes.string,

    /**
     * Provide an optional `onChange` hook that is called each time the <input>
     * value changes
     */
    onChange: PropTypes.func,

    /**
     * Provide an optional `onClick` hook that is called each time the button is
     * clicked
     */
    onClick: PropTypes.func,

    /**
     * Provide an accessibility role for the <FileUploaderButton>
     */
    role: PropTypes.string,

    /**
     * Provide a custom tabIndex value for the <FileUploaderButton>
     */
    tabIndex: PropTypes.number,

    /**
     * Specify the type of underlying button
     */
    buttonKind: ButtonTypes.buttonKind,

    /**
     * Specify the types of files that this input should be able to receive
     */
    accept: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    tabIndex: 0,
    disableLabelChanges: false,
    labelText: 'Add file',
    buttonKind: 'primary',
    multiple: false,
    onChange: () => {},
    onClick: () => {},
    accept: [],
  };

  state = {};

  static getDerivedStateFromProps({ labelText }, state) {
    const { prevLabelText } = state || {};
    return state && prevLabelText === labelText
      ? null
      : {
          labelText,
          prevLabelText: labelText,
        };
  }

  handleChange = evt => {
    const files = evt.target.files;
    const length = evt.target.files.length;
    if (files && !this.props.disableLabelChanges) {
      if (length > 1) {
        this.setState({ labelText: `${length} files` });
      } else if (length === 1) {
        this.setState({ labelText: files[0].name });
      }
    }
    this.props.onChange(evt);
  };

  render() {
    const {
      className,
      disableLabelChanges, // eslint-disable-line
      labelText, // eslint-disable-line
      multiple,
      role,
      tabIndex,
      buttonKind,
      accept,
      name,
      ...other
    } = this.props;
    const classes = classNames({
      'bx--file': true,
      [className]: className,
    });

    this.uid = this.props.id || uid();

    return (
      <div
        role="button"
        tabIndex="0"
        className={classes}
        onKeyDown={evt => {
          if (evt.which === 13 || evt.which === 32) {
            this.input.click();
          }
        }}>
        <label
          className={`bx--btn bx--btn--${buttonKind}`}
          tabIndex={tabIndex}
          htmlFor={this.uid}
          role={role}
          {...other}>
          {this.state.labelText}
        </label>
        <input
          className="bx--visually-hidden"
          ref={input => (this.input = input)}
          id={this.uid}
          type="file"
          tabIndex="-1"
          multiple={multiple}
          accept={accept}
          name={name}
          onChange={this.handleChange}
          onClick={evt => {
            evt.target.value = null;
          }}
        />
      </div>
    );
  }
}

export default class FileUploader extends Component {
  static propTypes = {
    iconDescription: PropTypes.string,
    buttonLabel: PropTypes.string,
    buttonKind: ButtonTypes.buttonKind,
    filenameStatus: PropTypes.oneOf(['edit', 'complete', 'uploading'])
      .isRequired,
    labelDescription: PropTypes.string,
    labelTitle: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
    accept: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    iconDescription: 'Provide icon description',
    filenameStatus: 'uploading',
    buttonLabel: '',
    buttonKind: 'primary',
    multiple: false,
    onClick: () => {},
    onChange: () => {},
    accept: [],
  };

  state = {
    filenames: [],
  };

  nodes = [];

  static getDerivedStateFromProps({ filenameStatus }, state) {
    const { prevFilenameStatus } = state;
    return prevFilenameStatus === filenameStatus
      ? null
      : {
          filenameStatus,
          prevFilenameStatus: filenameStatus,
        };
  }

  handleChange = evt => {
    evt.stopPropagation();
    this.setState({
      filenames: this.state.filenames.concat(
        Array.prototype.map.call(evt.target.files, file => file.name)
      ),
    });
    this.props.onChange(evt);
  };

  handleClick = (evt, index) => {
    const filteredArray = this.state.filenames.filter(
      filename => filename !== this.nodes[index].innerText.trim()
    );
    this.setState({ filenames: filteredArray });
    this.props.onClick(evt);
  };

  clearFiles = () => {
    // A clearFiles function that resets filenames and can be referenced using a ref by the parent.
    this.setState({ filenames: [] });
  };

  render() {
    const {
      iconDescription,
      buttonLabel,
      buttonKind,
      filenameStatus,
      labelDescription,
      labelTitle,
      className,
      multiple,
      accept,
      name,
      ...other
    } = this.props;

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
          onChange={this.handleChange}
          disableLabelChanges
          accept={accept}
          name={name}
        />
        <div className="bx--file-container">
          {this.state.filenames.length === 0
            ? null
            : this.state.filenames.map((name, index) => (
                <span
                  key={index}
                  className="bx--file__selected-file"
                  ref={node => (this.nodes[index] = node)} // eslint-disable-line
                  {...other}>
                  <p className="bx--file-filename">{name}</p>
                  <span className="bx--file__state-container">
                    <FileUploaderItem
                      iconDescription={iconDescription}
                      status={filenameStatus}
                      onKeyDown={evt => {
                        if (evt.which === 13 || evt.which === 32) {
                          this.handleClick(evt, index);
                        }
                      }}
                      onClick={evt => {
                        if (filenameStatus === 'edit') {
                          this.handleClick(evt, index);
                        }
                      }}
                    />
                  </span>
                </span>
              ))}
        </div>
      </div>
    );
  }
}
