import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BarcodeIcon from '../icons/BarcodeIcon';

function ScannerButton() {
  return (
    <TouchableOpacity>
      <View style={styles.barcodeContainer}>
        <BarcodeIcon />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  barcodeContainer: {
    padding: 10,
    borderRadius: 50,
    borderColor: '#037bfc',
    borderWidth: 4,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#001524',
    shadowOpacity: 0.8,
    shadowRadius: 7,
  },
});
export default ScannerButton;
