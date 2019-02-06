/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { TableBatchAction } from '../';

describe('DataTable.TableBatchAction', () => {
  it('should render', () => {
    const wrapper = mount(<TableBatchAction className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
