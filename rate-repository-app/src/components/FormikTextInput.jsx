import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.errorMessageColor,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    padding: 5,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  inputContainer: {
    marginBottom: 10
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            onChangeText={value => helpers.setValue(value)}
            onBlur={() => helpers.setTouched(true)}
            value={field.value}
            error={showError}
            {...props}
          />
        </View>
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}
      </View>
  );
};

export default FormikTextInput;
