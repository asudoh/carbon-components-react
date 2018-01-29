import React from 'react';
import Accordion from './Accordion';
import AccordionItem from '../AccordionItem';
import Select from '../Select';
import SelectItem from '../SelectItem';
import a11yTestFragment from '../../../a11y/test-fragment';

const props = {
  onHeadingClick: () => {},
};

describe('AVT for Accordion', () => {
  it('does the right thing', () => {
    return a11yTestFragment(
      <Accordion>
        <AccordionItem title="Section 1 title" {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title" open {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title" {...props}>
          <Select
            onChange={() => {}}
            id="select-1"
            defaultValue="placeholder-item">
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Choose an option"
            />
            <SelectItem value="option-1" text="Option 1" />
            <SelectItem value="option-2" text="Option 2" />
            <SelectItem value="option-3" text="Option 3" />
          </Select>
        </AccordionItem>
        <AccordionItem title="Section 4 title" {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
      </Accordion>
    );
  });
});
