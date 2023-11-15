import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BookCard from './BookCard';
import generatePastelColor from '../services/colorGenerator';

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
  //   const statuses = Object.values(BOOK_STATUS);
  //   console.log(statuses);
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{props.status}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.dataList?.map(
          (item) =>
            BOOK_STATUS[item.status] === props.status && (
              <BookCard bookData={{...item, color: generatePastelColor()}} />
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
    marginBottom: 20,
  },
});
