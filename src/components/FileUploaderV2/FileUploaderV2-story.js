/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  array,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import FileUploaderV2 from '../FileUploaderV2';
import FileUploadStatus from '../FileUploadStatus';
import FileUploaderSkeleton from '../FileUploaderSkeleton/FileUploader.Skeleton';
import Button from '../Button';
import uid from '../../tools/uniqueId';

const coinToss = () => Math.round(Math.random());
fetchMock.mock({
  method: 'POST',
  matcher: 'https://jsonplaceholder.typicode.com/posts/',
  response: () =>
    new Promise((resolve, reject) =>
      setTimeout(() => (coinToss() ? resolve('200') : reject(500)), 500)
    ),
});

const buttonKinds = {
  primary: 'Primary (primary)',
  secondary: 'Secondary (secondary)',
  danger: 'Danger (danger)',
  ghost: 'Ghost (ghost)',
  'danger--primary': 'Danger Primary (danger--primary)',
  tertiary: 'Tertiary (tertiary)',
};
const props = {
  FileUploaderButtonV2: () => {
    const buttonKind = select('Button kind (buttonKind)', buttonKinds, '');
    return {
      labelText: text('Label text (labelText)', 'Add files'),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', true),
      buttonKind: buttonKind || 'primary',
      role: text('ARIA role of the button (role)', ''),
      tabIndex: number('Tab index (tabIndex)', -1),
    };
  },
  FileUploaderV2: () => {
    const buttonKind = select('Button kind (buttonKind)', buttonKinds, '');
    return {
      labelTitle: text('The label title (labelTitle)', 'Upload'),
      labelDescription: text(
        'The label description (labelDescription)',
        'only .jpg or .png files at 500mb or less'
      ),
      buttonLabel: text('The button label (buttonLabel)', 'Add files'),
      buttonKind: buttonKind || 'primary',
      accept: array('Accepted file extensions (accept)', ['.jpg', '.png'], ','),
      multiple: boolean('Supports multiple files (multiple)', true),
    };
  },
};

class App extends React.Component {
  state = { files: [] };

  upload = ({ file }) =>
    fetch('https://jsonplaceholder.typicode.com/posts/', {
      method: 'POST',
      body: file,
    }).then(res => res.json());

  handleChange = evt => {
    evt.stopPropagation();
    const files = this.props.multiple ? [...this.state.files] : [];
    [...evt.target.files].forEach(file => {
      const uuid = uid();
      files.push({
        uuid,
        name: file.name,
        size: file.size,
        status: 'uploading',
        iconDescription: 'Uploading',
      });
      const index = files.findIndex(file => file.uuid === uuid);
      this.upload({ file })
        .then(() => {
          fetchMock.restore();
          files[index].status = 'complete';
          files[index].iconDescription = 'Upload complete';
          this.setState({ files });
        })
        .catch(error => {
          files[index].status = 'edit';
          files[index].iconDescription = 'Upload failed';
          this.setState({ files });
          return new Error(error);
        });
    });
    this.setState({ files });
  };

  handleEventOnUploadStatus = ({ evt, file }) => {
    if (
      file.status === 'edit' &&
      (evt.type !== 'keydown' || [13, 32].indexOf(evt.which) >= 0)
    ) {
      if (evt) {
        evt.stopPropagation();
      }
      const filteredArray = this.state.files.filter(item => item !== file);
      this.setState({ files: filteredArray });
    }
  };

  clearFiles = () => {
    this.setState({ files: [] });
  };

  render() {
    return (
      <div className="bx--file__container">
        <FileUploaderV2
          labelTitle="Upload"
          buttonLabel="Add files"
          name="file"
          files={this.state.files}
          onChange={this.handleChange}
          {...this.props}>
          {this.state.files.map(file => {
            const { name, status, iconDescription } = file;
            return (
              <FileUploadStatus
                key={name}
                name={name}
                status={status}
                iconDescription={iconDescription}
                onKeyDown={evt => {
                  this.handleEventOnUploadStatus({ evt, file });
                }}
                onClick={evt => {
                  this.handleEventOnUploadStatus({ evt, file });
                }}
              />
            );
          })}
        </FileUploaderV2>
        <Button
          kind="secondary"
          small
          style={{ marginTop: '1rem' }}
          onClick={this.clearFiles}>
          Clear Files
        </Button>
      </div>
    );
  }
}

storiesOf('FileUploaderV2', module)
  .addDecorator(withKnobs)
  .add(
    'FileUploader example application',
    withInfo({ text: 'example application' })(() => (
      <App {...props.FileUploaderV2()} />
    ))
  )
  .add(
    'skeleton',
    withInfo({
      text: 'Placeholder skeleton state to use when content is loading.',
    })(() => (
      <div style={{ width: '500px' }}>
        <FileUploaderSkeleton />
      </div>
    ))
  );
