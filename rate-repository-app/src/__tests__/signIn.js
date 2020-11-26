import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';

import SignIn from '../components/SignIn';

describe('SignIn', () => {
  it('signIn is called with right parameters when submit button pressed', async () => {
      const signIn = jest.fn();
      const form = render(<SignIn onSubmit={signIn}/>);

      fireEvent.changeText(form.getByTestId('usernameField'), 'name');
      fireEvent.changeText(form.getByTestId('passwordField'), 'pswrd');

      await act(async () => {
        await fireEvent.press(form.getByTestId('signInButton'));
      });

      expect(signIn).toBeCalledTimes(1);

      expect(signIn.mock.calls[0][0]).toEqual({
        username: 'name',
        password: 'pswrd'
      });
  });
});

