import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BookSection from '../components/BookSection';
import ScannerButton, {InputDialog} from '../components/ScannerButton';
import {changeName, getUserData} from '../services/keychainService';
import colorPallete from '../styles/color';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../store';
import {observer} from 'mobx-react';
import {
  useCameraDevice,
} from 'react-native-vision-camera';

export const BOOK_STATUS = {
  0: 'Currently reading',
  1: 'Have read',
};

const HomeScreen = observer(() => {
  const navigation = useNavigation();
  const {booksList} = useStore();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [promptVisible, setPromptVisible] = useState<boolean>(false);
  const device = useCameraDevice('back');

  const subscriber = () => {
    if (!userId) {
      getUserData().then(({uid, username}) => {
        setUserId(uid);
        setUsername(username);
      });
    } else {
      booksList.updateBookList(userId, setLoading);
    }
  };

  useEffect(() => {
    subscriber();
    return () => subscriber();
  }, [userId]);

  const onScannerPress = () => {
    navigation.navigate('CameraScaner', {device: device});
  };

  const handleCancel = () => {
    setPromptVisible(false);
  };
  const handleSearch = (query) => {
    navigation.navigate('Search', {query: query});
    setPromptVisible(false);
  };

  if (loading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <InputDialog
          visible={promptVisible}
          handleCancel={handleCancel}
          handleSearch={handleSearch}
        />
        <View style={styles.greetingsContainer}>
          <Text style={styles.greetingsLabel}>
            Hello, {'\n'}
            <Text
              style={styles.nameLabel}
              onPress={() => {
                Alert.prompt(
                  'Change your name',
                  '',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Change',
                      onPress: (text) => {
                        changeName(text).then(() => setUsername(text));
                      },
                    },
                  ],
                  'plain-text',
                );
              }}>
              {username}
            </Text>
          </Text>
        </View>
        {booksList.bookList.length ? (
          <BookSection dataList={booksList.bookList} />
        ) : (
          <Text style={styles.emptyListLabel}>
            Start adding books to create your reading collection!
          </Text>
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <ScannerButton onScannerPress={onScannerPress} />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  greetingsLabel: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 30,
    alignSelf: 'flex-start',
    lineHeight: 50,
    color: colorPallete.secondary,
  },
  greetingsContainer: {
    borderBottomWidth: 3,
    borderBottomColor: colorPallete.primary,
    alignSelf: 'flex-start',
    margin: 10,
  },
  nameLabel: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 34,
  },
  emptyListLabel: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    margin: 10,
  },
});

export default HomeScreen;
