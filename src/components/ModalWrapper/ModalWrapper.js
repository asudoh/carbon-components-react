import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { ButtonTypes } from '../../prop-types/types';

export default class ModalWrapper extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    handleOpen: PropTypes.func,
    children: PropTypes.node,
    id: PropTypes.string,
    buttonTriggerText: PropTypes.node,
    buttonTriggerClassName: PropTypes.string,
    modalLabel: PropTypes.string,
    modalHeading: PropTypes.string,
    modalText: PropTypes.string,
    passiveModal: PropTypes.bool,
    withHeader: PropTypes.bool,
    modalBeforeContent: PropTypes.bool,
    primaryButtonText: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    triggerButtonKind: ButtonTypes.buttonKind,
    shouldCloseAfterSubmit: PropTypes.bool,

    /**
     * Specify an optional handler for closing modal.
     * Returning `false` here prevents closing modal.
     */
    onClose: PropTypes.func,
  };

  static defaultProps = {
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
    triggerButtonKind: 'primary',
    disabled: false,
    onKeyDown: () => {},
  };

  triggerButton = React.createRef();
  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = evt => {
    const { onClose } = this.props;
    if (!onClose || onClose(evt) !== false) {
      this.setState({ isOpen: false }, () =>
        this.triggerButton.current.focus()
      );
    }
  };

  handleOnRequestSubmit = evt => {
    const { handleSubmit, shouldCloseAfterSubmit } = this.props;

    if (handleSubmit()) {
      if (shouldCloseAfterSubmit) {
        this.handleClose(evt);
      }
    }
  };

  render() {
    const {
      children,
      onKeyDown,
      buttonTriggerText,
      buttonTriggerClassName,
      triggerButtonKind,
      disabled,
      handleSubmit, // eslint-disable-line no-unused-vars
      shouldCloseAfterSubmit, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const props = {
      ...other,
      open: this.state.isOpen,
      onRequestClose: this.handleClose,
      onRequestSubmit: this.handleOnRequestSubmit,
    };

    return (
      <div
        role="presentation"
        onKeyDown={evt => {
          if (evt.which === 27) {
            this.handleClose(evt);
            onKeyDown(evt);
          }
        }}>
        <Button
          className={buttonTriggerClassName}
          disabled={disabled}
          kind={triggerButtonKind}
          onClick={this.handleOpen}
          inputref={this.triggerButton}>
          {buttonTriggerText}
        </Button>
        <Modal {...props}>{children}</Modal>
      </div>
    );
  }
}
