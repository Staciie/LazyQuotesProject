import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function BookSearchCard({bookItem}) {
  const navigation = useNavigation();
  const {volumeInfo, id} = bookItem;
  let {title, authors, description, pageCount, categories, imageLinks} =
    volumeInfo;
  if (Array.isArray(authors)) authors = authors.join(', ');

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('BookModal', {bookItem})}>
      {imageLinks?.thumbnail ? (
        <Image
          style={styles.bookCover}
          resizeMode="cover"
          source={{
            uri: imageLinks.thumbnail.replace('http:', 'https:'),
          }}
        />
      ) : (
        <Image
          style={styles.bookCover}
          resizeMode="cover"
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
          }}
        />
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.titleLabel}>{title}</Text>
        {authors && <Text style={styles.authLabel}>{authors}</Text>}
        {categories &&
          categories.map((category) => (
            <View style={styles.categoryPill}>
              <Text style={styles.categoryLabel}>{category}</Text>
            </View>
          ))}
        {description && (
          <View>
            <Text
              style={styles.descLabel}
              numberOfLines={3}
              ellipsizeMode="tail">
              {description}
            </Text>
            <Text style={styles.readmoreLabel}>read mode</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 20,
    marginRight: 10,
    alignSelf: 'center',
  },
  titleLabel: {
    flexWrap: 'wrap',
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
  },
  authLabel: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryPill: {
    marginVertical: 10,
    backgroundColor: '#B2C8BA',
    paddingHorizontal: 10,
    borderRadius: 50,
    lineHeight: 20,
    position: 'relative',
    alignSelf: 'flex-start',
  },
  categoryLabel: {
    lineHeight: 20,
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
  },
  descLabel: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
  },
  readmoreLabel: {
    marginTop: 5,
    alignSelf: 'flex-end',
    color: '#435585',
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
  },
});
export default BookSearchCard;
