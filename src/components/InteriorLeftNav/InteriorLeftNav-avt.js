import React from 'react';
import InteriorLeftNav from './index';
import InteriorLeftNavList from '../InteriorLeftNavList';
import InteriorLeftNavItem from '../InteriorLeftNavItem';
import a11yTestFragment from '../../../a11y/test-fragment';

describe('AVT for InteriorLeftNav', () => {
  it('passes AVT', () => {
    return a11yTestFragment(
      <InteriorLeftNav>
        <InteriorLeftNavList title="Example Item 1">
          <InteriorLeftNavItem>
            <a target="_blank" href="http://www.carbondesignsystem.com">
              Link Child
            </a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem>
            <a href="http://www.carbondesignsystem.com">Link Child</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem>
            <a href="http://www.carbondesignsystem.com">Link Child</a>
          </InteriorLeftNavItem>
        </InteriorLeftNavList>
        <InteriorLeftNavList title="Example Item 2">
          <InteriorLeftNavItem>
            <a href="http://www.carbondesignsystem.com">Link Child</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem>
            <a href="http://www.carbondesignsystem.com">Link Child</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem>
            <a href="http://www.carbondesignsystem.com">Link Child</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem>
            <a href="http://www.carbondesignsystem.com">Link Child</a>
          </InteriorLeftNavItem>
        </InteriorLeftNavList>
        <InteriorLeftNavItem>
          <a href="#example-1">Link label</a>
        </InteriorLeftNavItem>
        <InteriorLeftNavItem>
          <a href="http://www.carbondesignsystem.com" target="_blank">
            Link label 2
          </a>
        </InteriorLeftNavItem>
      </InteriorLeftNav>
    );
  });
});
