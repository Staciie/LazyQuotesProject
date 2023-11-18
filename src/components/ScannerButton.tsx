import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import BarcodeIcon from '../icons/BarcodeIcon';
import {getUserData} from '../store/keychainService';
import {useNavigation} from '@react-navigation/native';

function ScannerButton() {
  const navigation = useNavigation();
  const [uid, setUid] = useState<string>();

  useEffect(() => {
    getUserData().then(({uid}) => setUid(uid));
  }, []);

  const onScannerPress = async () => {
    Alert.prompt(
      'Add New Item',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Add',
          onPress: (text) => {
            navigation.navigate('Search', {query: text});
          },
        },
      ],
      'plain-text',
    );
  };

  return (
    <TouchableOpacity onPress={onScannerPress}>
      <View style={styles.barcodeContainer}>
        <BarcodeIcon color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  barcodeContainer: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#4c87e6',
  },
});
export default ScannerButton;
