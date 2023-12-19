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
import PlusIcon from '../icons/PlusIcon';
import {InputDialog} from '../components/InputDialog';

function BookPlayerModal({route}) {
  const navigation = useNavigation();
  const {booksListStore} = useStore();
  const bookData = booksListStore.findBookById(route.params.bookItem.id);
  const {volumeInfo, id, quoteList} = bookData;
  const {title, description, pageCount, categories, imageLinks, language} =
    volumeInfo;
  let {authors, publishedDate} = volumeInfo;
  const [userId, setUserId] = useState<string>();
  const [isAdded, setIsAdded] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);

  const handleSearch = (query) => {
    booksListStore.postQuote(
      {title: query, page: 43},
      route.params.bookItem.id,
      userId,
    );
    setVisible(false);
  };

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
      const isInTheList = booksListStore.checkById(id);
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
    <ScrollView bounces={false} overScrollMode="never">
      <InputDialog
        visible={visible}
        handleSearch={handleSearch}
        handleCancel={() => setVisible(false)}
      />
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
          <View>
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
        {!!description && (
          <Text style={styles.descLabel} numberOfLines={10}>
            {description}
          </Text>
        )}
        <View style={styles.quotesSection}>
          <Text style={styles.quotesSectionLabel}>Saved quotes</Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <PlusIcon color={colorPallete.secondary} size={30} />
          </TouchableOpacity>
        </View>
        {quoteList && quoteList.map((item) => <Text>{item.title}</Text>)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  quotesSectionLabel: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    color: colorPallete.textSecondary,
  },
  quotesSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default BookPlayerModal;
