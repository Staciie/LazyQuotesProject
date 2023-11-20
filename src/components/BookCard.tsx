import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IDataItem} from './BookSection';
import {useNavigation} from '@react-navigation/native';
import colorPallete from '../styles/color';

const screenWidth = Dimensions.get('screen').width / 2;

interface IBookCard extends IDataItem {
  color: string;
}

interface IBookCardProp {
  bookData: IBookCard;
}

function BookCard({bookData}: IBookCardProp) {
  const navigation = useNavigation();
  const onCardPress = () => {
    navigation.navigate('BookModal', {bookItem: bookData});
  };
  const {volumeInfo, id} = bookData;
  let {title, authors, description, pageCount, categories, imageLinks} =
    volumeInfo;

  if (Array.isArray(authors)) authors = authors.join(', ');

  return (
    <TouchableOpacity style={styles.bookCardContainer} onPress={onCardPress}>
      <View style={styles.coverWithBackContainer}>
        <View style={styles.bookCoverContainer}>
          {imageLinks?.thumbnail ? (
            <Image
              style={styles.bookCoverImg}
              resizeMode="cover"
              source={{
                uri: imageLinks.thumbnail.replace('http:', 'https:'),
              }}
            />
          ) : (
            <Image
              style={styles.bookCoverImg}
              resizeMode="cover"
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
              }}
            />
          )}
        </View>
        <View
          style={[
            styles.backgroundContainer,
            {backgroundColor: colorPallete.primary},
          ]}
        />
      </View>

      <Text style={styles.bookTitle}>{title}</Text>
      <Text style={styles.bookAuthor}>{authors}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookCardContainer: {
    width: screenWidth,
    alignItems: 'center',
  },
  coverWithBackContainer: {
    alignItems: 'center',
  },
  backgroundContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '90%',
    height: 150,
    zIndex: -1,
    borderRadius: 20,
  },
  bookCoverContainer: {
    shadowOffset: {width: 0, height: 5},
    shadowColor: '#001524',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 999,
    overflow: 'visible',
  },
  bookCoverImg: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  bookTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
  },
  bookAuthor: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
  },
});

export default BookCard;
