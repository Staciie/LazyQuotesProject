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
import {ScannerButton} from '../components/ScannerButton';
import {changeName, getUserData} from '../services/keychainService';
import colorPallete from '../styles/color';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../store';
import {observer} from 'mobx-react';
import {useCameraDevice} from 'react-native-vision-camera';
import {InputDialog} from '../components/InputDialog';

export const BOOK_STATUS = {
  0: 'Currently reading',
  1: 'Have read',
};

const HomeScreen = observer(() => {
  const navigation = useNavigation();
  const {booksListStore} = useStore();
  const [userId, setUserId] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const device = useCameraDevice('back');

  const subscriber = () => {
    if (!userId) {
      getUserData().then(({uid, username}) => {
        setUserId(uid);
        setUsername(username);
      });
    } else {
      booksListStore.updateBookList(userId);
    }
  };

  useEffect(() => {
    subscriber();
    return () => subscriber();
  }, [userId]);

  const onScannerPress = () => {
    navigation.navigate('CameraScaner', {device: device});
  };

  if (booksListStore.loading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.greetingsContainer}>
          <Text style={styles.greetingsLabel}>
            Hello, {'\n'}
            <Text style={styles.nameLabel} onPress={() => setVisible(true)}>
              {username}
            </Text>
          </Text>
        </View>
        {!booksListStore.isBookEmpty() ? (
          <BookSection dataList={booksListStore.bookList} />
        ) : (
          <Text style={styles.emptyListLabel}>
            Start adding books to create your reading collection!
          </Text>
        )}
        <InputDialog
          visible={visible}
          handleSearch={(text) => {
            console.log(text);
            changeName(text).then(() => setUsername(text));
            setVisible(false);
          }}
        />
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
