import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignOutIcon from '../icons/SignOutIcon';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native';
import {resetGenericPassword} from 'react-native-keychain';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import SearchScreen from '../screens/SearchScreen';
import BookPlayerModal from '../screens/BookPlayerModal';
import CrossIcon from '../icons/CrossIcon';

const Stack = createNativeStackNavigator();

const RootNavigation = ({hasSignedIn}: {hasSignedIn: boolean}) => {
  const initialRoute = hasSignedIn ? 'Home' : 'SignIn';

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: '#EBF3E8',
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      })}
      initialRouteName={initialRoute}>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            headerTintColor: '#037bfc',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  auth()
                    .signOut()
                    .then(() => {
                      GoogleSignin.revokeAccess();
                      resetGenericPassword();
                      navigation.reset({
                        index: 0,
                        routes: [{name: 'SignIn'}],
                      });
                    });
                }}>
                <SignOutIcon />
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
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="BookModal"
          component={BookPlayerModal}
          options={({navigation}) => ({
            headerTitle: '',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <CrossIcon />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigation;
