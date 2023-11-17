import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import GoogleIcon from '../icons/GoogleIcon';
import {setUserData} from '../store/keychainService';

function SignInScreen({navigation}: any) {
  // should save somewhere
  async function onGoogleButtonPress() {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      const user = await auth().signInWithCredential(googleCredential);
      setUserData(user);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home', params: {user: user.user}}],
      });
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.welcomeLabel}>Welcome!</Text>
      <Image
        source={require('../icons/LogoSloth.png')}
        resizeMode="contain"
        style={styles.signInLogo}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onGoogleButtonPress}>
        <GoogleIcon />
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#C7DCA7',
  },
  buttonContainer: {
    backgroundColor: '#C1ECE4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#3AA6B9',
    borderWidth: 2,
    borderRadius: 50,
  },

  buttonText: {
    fontFamily: 'Quicksand-Medium',
    paddingLeft: 10,
    fontSize: 16,
  },
  welcomeLabel: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    color: '#3AA6B9',
  },
  signInLogo: {
    height: '30%',
    marginVertical: 20,
  },
});
export default SignInScreen;
