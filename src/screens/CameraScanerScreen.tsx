import React, {useEffect, useState} from 'react';
import {
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import {
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';
import colorPallete from '../styles/color';
import {useNavigation} from '@react-navigation/native';

const CAMERA_PERMISSION = {
  GRANTED: 'granted',
  NOT_DETERMINED: 'not-determined',
  DENIED: 'denied',
  RESTRICTED: 'restricted',
};

function CameraScanerScreen({route}) {
  const {device} = route.params;
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const navigation = useNavigation();

  const checkCameraPermission = async () => {
    const cameraPermissionStatus = await Camera.getCameraPermissionStatus();
    switch (cameraPermissionStatus) {
      case CAMERA_PERMISSION.GRANTED: {
        setCameraPermission(true);
        break;
      }
      case CAMERA_PERMISSION.NOT_DETERMINED: {
        const newCameraPermission = await Camera.requestCameraPermission();
        if (newCameraPermission === CAMERA_PERMISSION.GRANTED) {
          setCameraPermission(true);
        }
        break;
      }
      case CAMERA_PERMISSION.DENIED: {
        Linking.openSettings();
        break;
      }
      case CAMERA_PERMISSION.RESTRICTED: {
        console.log('Camera is restricted');
        break;
      }
    }
  };
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: (codes) => {
      navigation.navigate('Search', {query: codes[0].value});
    },
  });

  return (
    cameraPermission && (
      <View style={styles.container}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
        {/* <TouchableOpacity style={styles.shotButton} /> */}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  shotButton: {
    position: 'absolute',
    bottom: 100,
    width: 70,
    height: 70,
    borderWidth: 5,
    borderColor: colorPallete.disabledText,
    alignSelf: 'center',
    borderRadius: 50,
    zIndex: 2,
  },
});
export default CameraScanerScreen;
