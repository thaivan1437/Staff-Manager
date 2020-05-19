import { configure, addDecorator } from '@storybook/react';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../redux/reducers_registration';

const store = createStore(rootReducer);

addDecorator((S) => (
  <Provider store={store}>
    <S />
  </Provider>
));

configure([
    require.context('../components', true, /\.stories\.tsx?$/),
    require.context('../pages', true, /\.stories\.tsx?$/),
    require.context('../static', true, /\.stories\.tsx?$/),
  ], 
  module
);
