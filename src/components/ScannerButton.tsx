import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BarcodeIcon from '../icons/BarcodeIcon';
import colorPallete from '../styles/color';


export function ScannerButton(props) {
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
