import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import RadioButtonIcon from '../icons/RadioButtonIcon';
import colorPallete from '../styles/color';

type TCustomRadioButton = {
  label: string;
  selected: boolean;
  onSelect: any;
  disabled: boolean;
};

const CustomRadioButton = ({
  label,
  selected,
  onSelect,
  disabled,
}: TCustomRadioButton) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onSelect}
    style={[
      styles.radioButtonContainer,
      disabled
        ? styles.radioButtonContainerDisabled
        : selected
        ? styles.radioButtonContainerActive
        : styles.radioButtonContainerDisabled,
    ]}>
    {selected && (
      <RadioButtonIcon color={colorPallete.primary} style={{marginRight: 10}} />
    )}
    <Text
      style={[
        styles.radioButtonLabel,
        {
          color: disabled
            ? colorPallete.disabled
            : selected
            ? colorPallete.textSecondary
            : colorPallete.disabled,
        },
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
  radioButtonContainerDisabled: {
    backgroundColor: colorPallete.disabled + 50,
    borderColor: colorPallete.disabled,
  },
  radioButtonContainerActive: {
    backgroundColor: colorPallete.primary + 80,
    borderColor: colorPallete.primary,
  },
});

export default CustomRadioButton;
