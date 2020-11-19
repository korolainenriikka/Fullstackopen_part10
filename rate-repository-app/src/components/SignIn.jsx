import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  singinform: {
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'center',
    color: 'white',
    padding: 5,
    borderRadius: 3,
    width: '100%'
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
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <TouchableWithoutFeedback style={styles.buttonBackground} onPress={onSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};


const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

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