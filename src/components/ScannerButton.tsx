import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import BarcodeIcon from '../icons/BarcodeIcon';
import axios from 'axios';
import {processFetchedBookData} from '../services/dataProcessService';
import {postBook} from '../services/dbService';

function ScannerButton({userId}: {userId: string}) {
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
            axios
              .get(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
              .then((result) => {
                const dataToSend = processFetchedBookData(result);
                postBook(userId, dataToSend);
              })
              .catch((error) => console.log(error));
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
