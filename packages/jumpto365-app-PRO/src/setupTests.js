import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon'
import { initializeIcons } from '@uifabric/icons';
import mocks from "./.v2/data/Mocks"
initializeIcons();
Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon
global.mocks = mocks 

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };
  global.localStorage = localStorageMock;
  global.sessionStorage = localStorageMock;
  global.File = class MockFile {
    filename
    constructor( data, filename, properties ) {
      this.filename = filename;
    }
  }