import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Dialog from 'react-native-dialog';

export function InputDialog({visible, handleCancel, handleSearch}) {
  const [query, setQuery] = useState<string>();
  return (
    <View style={styles.inputDialogContainer}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Nothing matched this code :(</Dialog.Title>
        <Dialog.Description>
          Try to search for this book by title or author name
        </Dialog.Description>
        <Dialog.Input onChangeText={(query) => setQuery(query)} />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Search" onPress={() => handleSearch(query)} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  inputDialogContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
