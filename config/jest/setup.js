'use strict';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

require('../polyfills');

// Starting with React 16, we'll have to polyfill this in test environments.
// Defining this earlier than loading Enzyme to avoid "React depends on requestAnimationFrame" warning.
global.requestAnimationFrame = function(callback) {
  callback();
};

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-16');

// Configure enzyme to work with React 15 for now
enzyme.configure({ adapter: new Adapter() });
