import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import BookSection from '../components/BookSection';
import ScannerButton from '../components/ScannerButton';
import {onSnapshot} from 'firebase/firestore';
import {getListByUserId} from '../services/dbService';

const BOOK_STATUS = {
  0: 'Currently reading',
  1: 'Have read',
};

function HomeScreen(props) {
  const statuses = Object.values(BOOK_STATUS);
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  const userId: string = props.route.params.user.uid;

  useEffect(() => {
    const listRef = getListByUserId(userId);
    // const listRef = collection(db, `AoT5RkyiSSdvmCtKqtLiD5VZrk02`);

    const subscriber = onSnapshot(listRef, {
      next: (snapshot) => {
        const bookList: any[] = [];
        snapshot.docs.forEach((doc) => {
          bookList.push({id: doc.id, ...doc.data()});
        });
        setBooks(bookList);
        setLoading(false);
      },
    });

    return () => subscriber();
  }, []);

  if (loading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {statuses.map((status) => (
          <BookSection status={status} dataList={books} />
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <ScannerButton userId={userId} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default HomeScreen;
