import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import RootNavigation from './src/navigation/RootNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};

GoogleSignin.configure({
  webClientId:
    '438128417949-feqnbvc8dn4oje3t2pemtvcuhvd1h7ke.apps.googleusercontent.com',
});

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <RootNavigation user={user} />
    </NavigationContainer>
  );
}

export default App;
