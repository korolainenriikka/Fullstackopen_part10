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
  password: '',
  passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1)
    .max(30),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null],
      'Password and password confirmation must match')
     .required('Password confirm is required')
});

const SignUpForm = ({ onSubmit }) => {
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
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="passwordConfirmation"
          placeholder="Repeat password"
          secureTextEntry
        />
      </View>
      <Button testID='signInButton' onPress={onSubmit}>Sign up</Button>
    </View>
  );
};


const SignUp = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default SignUp;