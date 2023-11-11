import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Camera, useCodeScanner} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../store';
import {InputDialog} from '../components/InputDialog';
import {observer} from 'mobx-react';

const CAMERA_PERMISSION = {
  GRANTED: 'granted',
  NOT_DETERMINED: 'not-determined',
  DENIED: 'denied',
  RESTRICTED: 'restricted',
};

const CameraScanerScreen = observer(({route}) => {
  const {device} = route.params;
  const {searchStore} = useStore();
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState(true);
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCameraActive(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const handleCancel = () => {
    setCameraActive(true);
    searchStore.setPromptVisible(false);
  };
  
  const handleSearch = (query: string) => {
    searchStore.performSearch(query, navigation);
    searchStore.setPromptVisible(false);
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

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        setCameraActive(false);
        searchStore.performSearch(codes[0].value, navigation);
      }
    },
  });

  return (
    cameraPermission && (
      <View style={styles.container}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={cameraActive}
          codeScanner={codeScanner}
          // implement torch button
          torch={'off'}
        />
        <InputDialog
          visible={searchStore.promptVisible}
          handleCancel={handleCancel}
          handleSearch={handleSearch}
        />
      </View>
    )
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default CameraScanerScreen;
