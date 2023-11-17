import {WEB_CLIENT_ID} from '@env';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
import { getUserData, setUserData } from './src/store/keychainService';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [signedIn, setUserSignedIn] = useState(false);

  function onAuthStateChanged(user: any) {
    getUserData().then(({uid}) =>  uid !== user.uid ?  setUserData({user}) : null);
    setUserSignedIn(user ? true : false);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    // add loader
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <RootNavigation hasSignedIn={signedIn}/>
    </NavigationContainer>
  );
}

export default App;
