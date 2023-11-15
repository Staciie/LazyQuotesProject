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

const screenWidth = Dimensions.get('screen').width / 2;

interface IBookCard extends IDataItem {
  color: string;
}

interface IBookCardProp {
  bookData: IBookCard;
}

function BookCard({bookData}: IBookCardProp) {
  const onCardPress = () => {};

  bookData.img = bookData.img.replace('http:', 'https:');

  return (
    <TouchableOpacity style={styles.bookCardContainer} onPress={onCardPress}>
      <View style={styles.coverWithBackContainer}>
        <View style={styles.bookCoverContainer}>
          <Image
            style={styles.bookCoverImg}
            source={{
              uri: bookData.img,
            }}
          />
        </View>
        <View
          style={[
            styles.backgroundContainer,
            {backgroundColor: bookData.color},
          ]}
        />
      </View>

      <Text style={styles.bookTitle}>{bookData.title}</Text>
      <Text style={styles.bookAuthor}>{bookData.author}</Text>
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
