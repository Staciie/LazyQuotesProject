import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import BookSection from '../components/BookSection';
import ScannerButton from '../components/ScannerButton';
import {onSnapshot} from 'firebase/firestore';
import {getListByUserId} from '../services/dbService';
import {getUserData} from '../store/keychainService';

export const BOOK_STATUS = {
  0: 'Currently reading',
  1: 'Have read',
};

function HomeScreen() {
  const statuses = Object.values(BOOK_STATUS);
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>();

  const subscriber = () => {
    if (!userId) {
      getUserData().then(({uid}) => {
        setUserId(uid);
      });
    } else {
      const listRef = getListByUserId(userId);
      onSnapshot(listRef, {
        next: (snapshot) => {
          const bookList: any[] = [];
          snapshot.docs.forEach((doc) => {
            bookList.push({id: doc.id, ...doc.data()});
          });
          setBooks(bookList);
          setLoading(false);
        },
      });
    }
  };

  useEffect(() => {
    subscriber();
    return () => subscriber();
  }, [userId]);

  if (loading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {statuses.map((status, index) => (
          <BookSection
            status={status}
            dataList={books}
            key={index}
            style={styles.scrollContainer}
          />
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <ScannerButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default HomeScreen;
