import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BarcodeIcon from '../icons/BarcodeIcon';

function ScannerButton() {
  return (
    <TouchableOpacity>
      <View style={styles.barcodeContainer}>
        <BarcodeIcon color='white' />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  barcodeContainer: {
    padding: 15,
    borderRadius: 50,
    backgroundColor:  '#4c87e6'
  },
});
export default ScannerButton;
