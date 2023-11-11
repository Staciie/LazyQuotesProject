import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colorPallete from '../styles/color';
import QuoteMarkIcon from '../icons/QuoteMarkIcon';

export const QuoteCard = (props) => {
  const [isSectionHidden, setIsSectionHidden] = useState(true);
  const {quoteText, pageNumber, labels, notes} = props;
  const showAdditionalInfo =
    !!pageNumber || labels.length > 0 || notes.length > 0;
  return (
    <TouchableOpacity onPress={() => setIsSectionHidden(!isSectionHidden)}>
      <View style={styles.previewContainer}>
        <View style={styles.headerSection}>
          <QuoteMarkIcon
            size={20}
            color={colorPallete.secondary}
            style={{alignSelf: 'center'}}
          />
          {quoteText && <Text style={styles.previewText}>{quoteText}</Text>}
        </View>
        {!!showAdditionalInfo && (
          <View
            style={[
              styles.additionalSection,
              isSectionHidden ? styles.hiddenSection : styles.shownSection,
            ]}>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              {pageNumber && (
                <Text style={styles.previewPage}>Page: {pageNumber}</Text>
              )}
              <View style={styles.labelsContainer}>
                {labels?.length > 0 &&
                  labels.map((label) => (
                    <Text style={styles.previewLabel}>#{label}</Text>
                  ))}
              </View>
            </View>
            {notes.length > 0 && (
              <View>
                <Text style={styles.separatorText}>Notes:</Text>
                {notes.map((note, index) => (
                  <Text style={styles.previewNote}>
                    {index + 1}) {note}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    borderRadius: 10,
    marginBottom: 20,
  },
  previewText: {
    color: colorPallete.textPrimary,
    fontFamily: 'Caveat-Regular',
    fontSize: 16,
    marginBottom: 5,
  },
  previewPage: {
    color: colorPallete.secondary,
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    marginRight: 10,
  },
  labelsContainer: {
    flexDirection: 'row',
  },
  previewLabel: {
    color: colorPallete.secondary,
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    marginRight: 5,
  },
  previewNote: {
    color: colorPallete.textSecondary,
    fontFamily: 'Quicksand-Bold',
    fontSize: 12,
    marginBottom: 5,
  },
  separatorText: {
    color: colorPallete.textSecondary,
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  hiddenSection: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    left: 0,
  },
  shownSection: {
    paddingTop: 20,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F2F1EB',
    borderRadius: 10,
  },
  additionalSection: {
    backgroundColor: '#DC8686',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: -10,
    zIndex: -1,
  },
});
