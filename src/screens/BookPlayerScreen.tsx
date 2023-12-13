import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {deleteBook, postBook} from '../services/dbService';
import {getUserData} from '../services/keychainService';
import colorPallete from '../styles/color';
import {useNavigation} from '@react-navigation/native';
import FilledHeartIcon from '../icons/FilledHeartIcon';
import EmptyHeartIcon from '../icons/EmptyHeartIcon';
import {useStore} from '../store';

function BookPlayerModal({route}) {
  const navigation = useNavigation();
  const {booksListStore} = useStore();
  const {volumeInfo, id} = route.params.bookItem;
  const {title, description, pageCount, categories, imageLinks, language} =
    volumeInfo;
  let {authors, publishedDate} = volumeInfo;
  const [userId, setUserId] = useState<string>();
  const [isAdded, setIsAdded] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onPress = () => {
    !isAdded
      ? postBook(userId, {
          ...route.params.bookItem,
        })
          .then(() => {
            setIsAdded(!isAdded);
          })
          .catch((e) => console.log(e))
      : deleteBook(userId, route.params.bookItem.id)
          .then(() => setIsAdded(!isAdded))
          .catch(() => console.log('something went wrong'));
  };

  useEffect(() => {
    if (!userId) {
      getUserData().then(({uid}) => {
        setUserId(uid);
      });
    } else {
      const isInTheList = booksListStore.findById(id);
      setIsAdded(isInTheList);
      setIsLoading(false);
    }
  }, [userId]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.saveButtonContainer} onPress={onPress}>
          {isAdded ? (
            <FilledHeartIcon color={colorPallete.secondary} />
          ) : (
            <EmptyHeartIcon color={colorPallete.secondary} />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, isAdded]);

  const displayMeta = pageCount || language || publishedDate;

  if (publishedDate) {
    publishedDate = moment(publishedDate, 'YYYY', true).isValid()
      ? publishedDate
      : moment(publishedDate).format('LL');
  }

  if (Array.isArray(authors)) authors = authors.join(', ');
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      bounces={false}
      overScrollMode="never">
      <View style={styles.imageContainer}>
        {imageLinks?.thumbnail ? (
          <Image
            style={styles.bookCover}
            resizeMode="cover"
            source={{uri: imageLinks.thumbnail.replace('http', 'https')}}
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
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleTextGroup}>
            {title && <Text style={styles.titleLabel}>{title}</Text>}
            {authors && <Text style={styles.authLabel}>({authors})</Text>}
          </View>
        </View>
        {/* <View style={styles.radioButtonsGroup}>
          {Object.keys(BOOK_STATUS).map((status) => (
            <CustomRadioButton
              disabled={isAdded}
              label={BOOK_STATUS[status]}
              selected={currentStatus === status}
              onSelect={() => setCurrentStatus(status)}
            />
          ))}
        </View>  */}
        {!!categories &&
          categories.map((category) => (
            <View style={styles.categoryPill}>
              <Text style={styles.categoryLabel}>{category}</Text>
            </View>
          ))}
        {displayMeta && (
          <View style={styles.metadataContainer}>
            {!!pageCount && (
              <View style={styles.metaColumnContainer}>
                <Text style={styles.metaTitleLabel}>Number of pages</Text>
                <Text style={styles.metaInfoLabel}>{pageCount} pages</Text>
              </View>
            )}
            {!!language && (
              <View style={styles.metaColumnContainer}>
                <Text style={styles.metaTitleLabel}>Language</Text>
                <Text style={styles.metaInfoLabel}>{language}</Text>
              </View>
            )}
            {!!publishedDate && (
              <View style={styles.metaColumnContainer}>
                <Text style={styles.metaTitleLabel}>Publish</Text>
                <Text style={styles.metaInfoLabel}>{publishedDate}</Text>
              </View>
            )}
          </View>
        )}
        {!!description && <Text style={styles.descLabel}>{description}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingBottom: 40,
    backgroundColor: colorPallete.primary,
  },
  textContainer: {
    backgroundColor: colorPallete.background,
    position: 'relative',
    top: -20,
    borderRadius: 20,
    padding: 20,
  },
  bookCover: {
    height: 250,
    width: 160,
    borderRadius: 20,
  },
  titleLabel: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    color: colorPallete.textPrimary,
  },
  authLabel: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    color: colorPallete.textPrimary,
  },
  metadataContainer: {
    backgroundColor: colorPallete.primary + 50,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  metaTitleLabel: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 10,
    textAlign: 'center',
    color: colorPallete.textPrimary,
  },
  metaInfoLabel: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 10,
    color: colorPallete.textPrimary,
  },
  metaColumnContainer: {
    alignItems: 'center',
    width: '30%',
    justifyContent: 'space-between',
  },
  categoryPill: {
    backgroundColor: colorPallete.primary + 50,
    paddingHorizontal: 10,
    borderRadius: 50,
    lineHeight: 20,
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryLabel: {
    lineHeight: 20,
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    color: colorPallete.textSecondary,
  },
  descLabel: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    color: colorPallete.textSecondary,
    textAlign: 'justify',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleTextGroup: {
    flexGrow: 3,
    flex: 1,
  },
  saveButtonContainer: {
    alignItems: 'flex-end',
  },
  saveButton: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
  },
  saveButtonLabel: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
  },
  radioButtonsGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default BookPlayerModal;
