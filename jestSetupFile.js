import MockAsyncStorage from 'mock-async-storage';
import { NativeModules } from 'react-native';

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn()
};
const mockImpl = new MockAsyncStorage()
jest.mock('@react-native-community/async-storage', () => mockImpl);


/*
jest.mock('Geolocation', () => {
  return {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  }
});
*/
