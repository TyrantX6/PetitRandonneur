import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import NotLoggedInWriteScreen from '../app/screens/NotLoggedInWriteScreen';
import LoginScreen from '../app/screens/LoginScreen';
import StoryScreen from '../app/screens/StoryScreen';


describe('Screens Tests', () =>  {
  test('<-- = NotLoggedInWriteScreen render', () => {
    const tree = renderer.create(<NotLoggedInWriteScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });



  test('<-- = LoginScreen render', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('<-- = StoryScreen render', () => {
    const tree = renderer.create(<StoryScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

})



