import React, {useEffect, useRef, useState} from 'react';
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Camera, useCameraFormat} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {recognizeImage} from '../mlkit_directory';
import colorPallete from '../styles/color';
import ImagePicker from 'react-native-image-crop-picker';
import {TorchOffIcon, TorchOnIcon} from '../icons/TorchIcons';

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
  const [torchEnabled, setTorchEnabled] = useState(false);
  const navigation = useNavigation();
  const camera = useRef<Camera>(null);

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
          torch={torchEnabled ? 'on' : 'off'}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={async () => {
                const file = await camera.current.takePhoto();
                const result = `file://${file.path}`;
                proccessPhoto(result);
              }}
            />
          </View>
          <TouchableOpacity onPress={() => setTorchEnabled(!torchEnabled)}>
            {torchEnabled ? (
              <TorchOnIcon size={50} style={styles.torchIcon} />
            ) : (
              <TorchOffIcon size={50} style={styles.torchIcon} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    )
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  takePhotoButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: colorPallete.white,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 60,
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: colorPallete.black + 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: colorPallete.white + 90,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: 120,
    backgroundColor: colorPallete.black + 70,
    position: 'absolute',
    bottom: 0,
  },
  torchIcon: {
    position: 'absolute',
    right: 30,
    top: 10,
    padding: 30,
  },
});
export default ReaderScreen;
