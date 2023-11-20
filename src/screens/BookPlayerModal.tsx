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
import {BOOK_STATUS} from './HomeScreen';
import RadioButtonIcon from '../icons/RadioButtonIcon';
import PlusIcon from '../icons/PlusIcon';
import {postBook} from '../services/dbService';
import {getUserData} from '../store/keychainService';

const CustomRadioButton = ({label, selected, onSelect}) => (
  <TouchableOpacity
    onPress={onSelect}
    style={[
      styles.radioButtonContainer,
      {
        backgroundColor: selected
          ? 'rgba(243, 243, 243, 1)'
          : 'rgba(243, 243, 243, 0.8)',
        borderColor: selected ? '#146C94' : '#9DB2BF',
      },
    ]}>
    {selected && <RadioButtonIcon color="#146C94" style={{marginRight: 10}} />}
    <Text
      style={[
        styles.radioButtonLabel,
        {color: selected ? '#146C94' : '#9DB2BF'},
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

function BookPlayerModal({route}) {
  const {volumeInfo, id} = route.params.bookItem;
  const {title, description, pageCount, categories, imageLinks, language} =
    volumeInfo;
  let {authors, publishedDate} = volumeInfo;
  const [currentStatus, setCurrentStatus] = useState<number>();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    getUserData().then(({uid}) => {
      setUserId(uid);
    });
  }, []);
  const displayMeta = pageCount || language || publishedDate;

  if (publishedDate) {
    publishedDate = moment(publishedDate, 'YYYY', true).isValid()
      ? publishedDate
      : moment(publishedDate).format('LL');
  }
  if (Array.isArray(authors)) authors = authors.join(', ');

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
            {title && <Text style={styles.textLabel}>{title}</Text>}
            {authors && <Text style={styles.authLabel}>({authors})</Text>}
          </View>
          <TouchableOpacity
            style={styles.saveButtonContainer}
            onPress={() =>
              postBook(userId, {
                ...route.params.bookItem,
                status: currentStatus,
              })
            }
            disabled={currentStatus ? false : true}>
            <PlusIcon
              color={
                currentStatus ? 'rgba(32, 94, 97, 1)' : 'rgba(32, 94, 97, 0.3)'
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.radioButtonsGroup}>
          {Object.keys(BOOK_STATUS).map((status) => (
            <CustomRadioButton
              label={BOOK_STATUS[status]}
              selected={currentStatus === status}
              onSelect={() => setCurrentStatus(status)}
            />
          ))}
        </View>

        {categories &&
          categories.map((category) => (
            <View style={styles.categoryPill}>
              <Text style={styles.categoryLabel}>{category}</Text>
            </View>
          ))}
        {displayMeta && (
          <View style={styles.metadataContainer}>
            {pageCount && (
              <View style={styles.metaColumnContainer}>
                <Text style={styles.metaTitleLabel}>Number of pages</Text>
                <Text style={styles.metaInfoLabel}>{pageCount} pages</Text>
              </View>
            )}
            {language && (
              <View style={styles.metaColumnContainer}>
                <Text style={styles.metaTitleLabel}>Language</Text>
                <Text style={styles.metaInfoLabel}>{language}</Text>
              </View>
            )}
            {publishedDate && (
              <View style={styles.metaColumnContainer}>
                <Text style={styles.metaTitleLabel}>Publish</Text>
                <Text style={styles.metaInfoLabel}>{publishedDate}</Text>
              </View>
            )}
          </View>
        )}
        {description && <Text style={styles.descLabel}>{description}</Text>}
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
    paddingBottom: 10,
  },
  textContainer: {
    backgroundColor: '#B0926A',
    flexGrow: 1,
    borderRadius: 20,
    padding: 20,
  },
  bookCover: {
    height: 250,
    width: 160,
    borderRadius: 20,
  },
  textLabel: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
  },
  authLabel: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
  },
  metadataContainer: {
    backgroundColor: '#fff',
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
  },
  metaInfoLabel: {fontFamily: 'Quicksand-Regular', fontSize: 10},
  metaColumnContainer: {
    alignItems: 'center',
    width: '30%',
    justifyContent: 'space-between',
  },
  categoryPill: {
    backgroundColor: '#B2C8BA',
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
  },
  descLabel: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
  },
  radioButtonsGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioButtonContainer: {
    borderRadius: 50,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioButtonLabel: {
    lineHeight: 26,
    fontFamily: 'Quicksand-Regular',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default BookPlayerModal;
