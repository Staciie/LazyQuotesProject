import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BookCard from './BookCard';

function BookSection(props) {
  return (
    <View>
      <Text style={styles.sectionTitle}>My library</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.dataList?.map((item) => (
          <BookCard bookData={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
}

export default BookSection;

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 24,
    margin: 20,
  },
});
