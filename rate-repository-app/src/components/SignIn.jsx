import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';
import Button from './Button';

import * as yup from 'yup';

const styles = StyleSheet.create({
  singinform: {
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
  },
  fieldContainer: {
    marginBottom: 15,
  }
});

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.singinform}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" testID='usernameField'/>
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
          testID='passwordField'
        />
      </View>
      <Button testID='signInButton' onPress={onSubmit}>Sign in</Button>
    </View>
  );
};


const SignIn = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default SignIn;