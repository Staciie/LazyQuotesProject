import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BarcodeIcon from '../icons/BarcodeIcon';
import {useNavigation} from '@react-navigation/native';
import colorPallete from '../styles/color';
import Dialog from 'react-native-dialog';

export function InputDialog({visible, handleCancel, handleSearch}) {
  const [query, setQuery] = useState<string>();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Search for</Dialog.Title>
        <Dialog.Input onChangeText={(text) => setQuery(text)} />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Search" onPress={() => handleSearch(query)} />
      </Dialog.Container>
    </View>
  );
}

function ScannerButton(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={props.onScannerPress}>
      <View style={styles.barcodeContainer}>
        <BarcodeIcon color={colorPallete.secondary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  barcodeContainer: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: colorPallete.secondary,
  },
});
export default ScannerButton;
