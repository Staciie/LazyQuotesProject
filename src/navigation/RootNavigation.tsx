import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignOutIcon from '../icons/SignOutIcon';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import SearchScreen from '../screens/SearchScreen';
import BookPlayerModal from '../screens/BookPlayerScreen';
import colorPallete from '../styles/color';
import {resetUserData} from '../services/keychainService';
import CameraScanerScreen from '../screens/CameraScanerScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = ({hasSignedIn}: {hasSignedIn: boolean}) => {
  const initialRoute = hasSignedIn ? 'Home' : 'SignIn';

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: colorPallete.background,
        },
        headerTitle: '',
        headerTintColor: colorPallete.textPrimary,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      })}
      initialRouteName={initialRoute}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                auth()
                  .signOut()
                  .then(() => {
                    GoogleSignin.revokeAccess();
                    resetUserData();
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'SignIn'}],
                    });
                  });
              }}>
              <SignOutIcon color={colorPallete.secondary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="BookModal"
        component={BookPlayerModal}
        options={() => ({
          headerStyle: {
            backgroundColor: colorPallete.primary,
          },
        })}
      />
      <Stack.Screen
        name="CameraScaner"
        component={CameraScanerScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
