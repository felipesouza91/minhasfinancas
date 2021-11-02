import React from 'react';
import { render } from '@testing-library/react-native';

import Profile from '../../screens/Profile';

describe('Profile Screens', () => {
  it('should be correctly placeholder input user name', async () => {
    const { getByPlaceholderText } = render(<Profile />);
    const inputText = getByPlaceholderText('Nome');
    expect(inputText).toBeTruthy();
  });

  it('should be user data has been loaded', async () => {
    const { getByTestId } = render(<Profile />);
    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');
    expect(inputName).toBeTruthy();
    expect(inputSurname).toBeTruthy();
  });
  it('should be title render corretly', async () => {
    const { getByTestId } = render(<Profile />);
    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Perfil');
  });
});
