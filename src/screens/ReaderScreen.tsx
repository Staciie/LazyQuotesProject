import React, {useEffect, useRef, useState} from 'react';
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {Camera, useCameraFormat} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {recognizeImage} from '../mlkit_directory';
import colorPallete from '../styles/color';
import ImagePicker from 'react-native-image-crop-picker';

const CAMERA_PERMISSION = {
  GRANTED: 'granted',
  NOT_DETERMINED: 'not-determined',
  DENIED: 'denied',
  RESTRICTED: 'restricted',
};
const RESOLUTION = {width: 720, height: 1280};

const ReaderScreen = observer(({route}) => {
  const {device, bookId, userId} = route.params;
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState(true);
  const navigation = useNavigation();
  const camera = useRef<Camera>(null);
  const {width: windowWidth} = useWindowDimensions();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCameraActive(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    checkCameraPermission();
  }, []);
  const format = useCameraFormat(device, [{photoResolution: RESOLUTION}]);

  const proccessPhoto = async (url: string) => {
    try {
      ImagePicker.openCropper({
        ...RESOLUTION,
        path: url,
        freeStyleCropEnabled: true,
      }).then(async (image) => {
        const imagePath = `file://${image.path}`;
        const response = await recognizeImage(imagePath);
        navigation.navigate('ProccessImage', {
          response: response,
          bookId: bookId,
          userId: userId,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    cameraPermission && (
      <View style={{flex: 1}}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={cameraActive}
          ref={camera}
          photo={true}
          orientation="portrait"
          torch={'on'}
        />
        <TouchableOpacity
          style={styles.takePhotoButton}
          onPress={async () => {
            const file = await camera.current.takePhoto();
            const result = `file://${file.path}`;
            proccessPhoto(result);
          }}
        />
      </View>
    )
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  takePhotoButton: {
    position: 'absolute',
    bottom: 40,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colorPallete.secondary,
  },
});
export default ReaderScreen;
