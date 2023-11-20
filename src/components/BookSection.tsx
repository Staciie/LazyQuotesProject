import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BookCard from './BookCard';

const BOOK_STATUS = {
  0: 'Currently reading',
  1: 'Have read',
};

export enum BookStatuses {
  'Currently reading',
  'Have read',
}
export interface IDataItem {
  title: string;
  author: string;
  img: string;
  status: BookStatuses;
  id?: string;
}

function BookSection(props: {status: string; dataList: IDataItem[]}) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{props.status}</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.bookList}>
        {props.dataList?.map(
          (item) =>
            BOOK_STATUS[item.status] === props.status && (
              <BookCard bookData={item} key={item.id} />
            ),
        )}
      </ScrollView>
    </View>
  );
}

export default BookSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 24,
    margin: 20,
  },
  bookList: {
    padding: 10,
  },
});
