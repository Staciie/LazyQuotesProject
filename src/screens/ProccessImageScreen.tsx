import React, { useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {ResponseRenderer} from '../components/ResponseRenderer';
import colorPallete from '../styles/color';
import {useStore} from '../store';
import {useNavigation} from '@react-navigation/native';

const ProccessImageScreen = (props) => {
  const navigation = useNavigation();
  const {userId, bookId} = props.route.params;
  const {width: windowWidth} = useWindowDimensions();
  const {booksListStore} = useStore();
  const [quoteText, setQuoteText] = useState('');
  const [pageNumber, setPageNumber] = useState();
  const {uri, response, aspectRatio} = props.route.params;

  const onPress = () => {
    booksListStore.postQuote(
      {page: pageNumber, title: quoteText},
      bookId,
      userId,
    );
    navigation.navigate('BookModal', {id: bookId});
  };
  return (
    <View style={styles.container}>
      <Image
        source={{uri: uri}}
        resizeMode="cover"
        style={[
          styles.imageView,
          {width: windowWidth, height: windowWidth * aspectRatio},
        ]}
      />
      {!!response && (
        <ResponseRenderer
          response={response}
          scale={windowWidth / response.width}
        />
      )}
      <TextInput
        style={styles.textInput}
        value={quoteText}
        onChangeText={setQuoteText}
      />
      <TextInput
        style={styles.pageInput}
        inputMode="numeric"
        value={pageNumber}
        onChangeText={setPageNumber}
      />
      <TouchableOpacity
        disabled={!quoteText || !pageNumber}
        onPress={onPress}
        style={{flexGrow: 0.5}}>
        <Text style={{color: 'red'}}>Add quote to the list</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  imageView: {
    // flex: 1,
  },
  textInput: {
    flexGrow: 1,
    margin: 10,
    borderColor: colorPallete.secondary,
    borderWidth: 2,
    color: colorPallete.textPrimary,
  },
  pageInput: {
    flexGrow: 1,
    margin: 10,
    borderColor: colorPallete.secondary,
    borderWidth: 2,
    color: colorPallete.textPrimary,
  },
});

export default ProccessImageScreen;
