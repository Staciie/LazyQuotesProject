import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignOutIcon from '../icons/SignOutIcon';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

const RootNavigation = ({
  hasSignedIn,
  user,
}: {
  hasSignedIn: boolean;
  user: any;
}) => {
  const initialRoute = hasSignedIn ? 'Home' : 'SignIn';

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Home"
        initialParams={{user: user}}
        component={HomeScreen}
        options={({navigation}) => ({
          headerTintColor: '#037bfc',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                auth()
                  .signOut()
                  .then(() =>
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'SignIn'}],
                    }),
                  );
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
    </Stack.Navigator>
  );
};

export default RootNavigation;
