import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import FileUploadStatus from './FileUploadStatus';

const props = () => ({
  name: text('File name (name)', 'filename.ext'),
  status: select(
    'Upload status (status)',
    ['edit', 'complete', 'uploading'],
    'uploading'
  ),
  iconDescription: text('Icon description (iconDescription)', ''),
  onClick: action('onClick'),
  onKeyDown: action('onKeyDown'),
});

storiesOf('FileUploadStatus', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    withInfo({})(() => {
      return <FileUploadStatus {...props()} />;
    })
  );
