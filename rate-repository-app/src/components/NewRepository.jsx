import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import Button from './Button';

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
  },
  fieldContainer: {
    marginBottom: 15,
  }
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(1)
    .max(100)
    .required('Rating is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="ownerName" placeholder="Owner name"/>
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100"  />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="text" placeholder="Review" multiline={true}  />
      </View>
      <Button onPress={onSubmit}>Create a review</Button>
    </View>
  );
};


const NewRepository = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default NewRepository;