import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React from 'react';

import RootNavigation from './src/navigation/RootNavigation';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
function App(): JSX.Element {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootNavigation />
    </NavigationContainer>
  );
}

export default App;
