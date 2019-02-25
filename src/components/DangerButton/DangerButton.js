/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button from '../Button';
import '../../tools/checkReactVersion';

const DangerButton = props => <Button kind="danger" {...props} />;

export default DangerButton;
