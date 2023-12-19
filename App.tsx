import {WEB_CLIENT_ID} from '@env';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
import { getUserData, setUserData } from './src/services/keychainService';
import colorPallete from './src/styles/color';
import { StoreProvider, rootStore } from './src/store';
import SplashScreen from 'react-native-splash-screen';


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...colorPallete,
  },
};

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [signedIn, setUserSignedIn] = useState(false);

  function onAuthStateChanged(user: any) {
    if (user !== null) {
      getUserData().then(({uid}) =>  uid !== user.uid ?  setUserData({user}) : null);
    }
    setUserSignedIn(!!user ? true : false);
  
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    SplashScreen.hide();
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
    <StoreProvider value={rootStore}>
      <NavigationContainer theme={MyTheme}>
        <RootNavigation hasSignedIn={signedIn}/>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
