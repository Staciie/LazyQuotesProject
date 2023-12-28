import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colorPallete from '../styles/color';
import {useStore} from '../store';
import {useNavigation} from '@react-navigation/native';
import PlusIcon from '../icons/PlusIcon';
import {QuoteCard} from '../components/QuoteCard';

const ProccessImageScreen = (props) => {
  const navigation = useNavigation();
  const {userId, bookId} = props.route.params;
  const {booksListStore} = useStore();
  const [quoteText, setQuoteText] = useState('');
  const [pageNumber, setPageNumber] = useState();
  const [label, setLabel] = useState('');
  const [note, setNote] = useState('');
  const [labels] = useState([]);
  const [notes] = useState([]);
  const [inputWdith, setInputWidth] = useState(0);
  const {response} = props.route.params;

  useEffect(() => {
    const textArray = [];
    response.blocks.map((block) => textArray.push(block.text));
    setQuoteText(textArray.join(' ').replace(/\s+/, ' '));
  }, []);

  const onPress = () => {
    booksListStore.postQuote(
      {
        quoteText: quoteText,
        pageNumber: pageNumber,
        labels: labels,
        notes: notes,
      },
      bookId,
      userId,
    );
    navigation.navigate('BookModal', {id: bookId});
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.textInput}
        value={quoteText}
        onChangeText={setQuoteText}
        placeholder="The line that impressed you"
        placeholderTextColor={colorPallete.disabled}
        multiline
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={[styles.textInput, {width: '20%'}]}
          placeholder="Page"
          placeholderTextColor={colorPallete.disabled}
          inputMode="numeric"
          value={pageNumber}
          onChangeText={setPageNumber}
        />

        <View style={styles.labelsContainer}>
          <TextInput
            style={[styles.textInput, {width: '88%', marginRight: 10}]}
            value={label}
            onChangeText={setLabel}
            multiline
            placeholder="#label"
            placeholderTextColor={colorPallete.disabled}
          />
          <TouchableOpacity
            onPress={() => {
              if (!labels.includes(label)) {
                labels.push(label.toLowerCase());
                setLabel('');
              }
            }}>
            <PlusIcon color={colorPallete.secondary} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View
          onLayout={(event) => {
            setInputWidth(event.nativeEvent.layout.width);
          }}
          style={styles.notesInput}>
          <TextInput
            style={[
              styles.textInput,
              {width: inputWdith - 30, marginRight: 10},
            ]}
            value={note}
            onChangeText={setNote}
            multiline
            placeholder="Thoughts that came to mind"
            placeholderTextColor={colorPallete.disabled}
          />
          <TouchableOpacity
            onPress={() => {
              notes.push(note);
              setNote('');
            }}>
            <PlusIcon color={colorPallete.secondary} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.previewHeader}>Preview</Text>
      <QuoteCard
        quoteText={quoteText}
        pageNumber={pageNumber}
        labels={labels}
        notes={notes}
      />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          disabled={!quoteText}
          onPress={onPress}
          style={[
            styles.writeQuoteButton,
            !quoteText && styles.disabledButtonContainer,
          ]}>
          <Text
            style={[
              styles.buttonText,
              !quoteText && styles.disabledButtonText,
            ]}>
            Add quote to the list
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  inputHeader: {
    fontFamily: 'Quicksand-Bold',
    color: colorPallete.secondary,
  },
  textInput: {
    borderColor: colorPallete.primary,
    borderRadius: 5,
    borderWidth: 1,
    color: colorPallete.textPrimary,
    fontFamily: 'Quicksand-Regular',
    padding: 3,
    marginVertical: 10,
  },
  previewHeader: {
    color: colorPallete.textPrimary,
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10,
  },
  labelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '80%',
  },
  writeQuoteButton: {
    alignSelf: 'center',
    backgroundColor: colorPallete.primary + 50,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colorPallete.primary,
    marginVertical: 20,
  },
  disabledButtonContainer: {
    backgroundColor: colorPallete.disabled + 50,
    borderColor: colorPallete.disabled,
  },
  disabledButtonText: {
    color: colorPallete.disabled,
  },
  buttonText: {
    color: colorPallete.primary,
    fontFamily: 'Quicksand-Bold',
  },
  buttonWrapper: {flexGrow: 1, justifyContent: 'flex-end'},
  notesInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ProccessImageScreen;
