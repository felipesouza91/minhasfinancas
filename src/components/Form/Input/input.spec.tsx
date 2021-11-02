import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../../global/styles/theme';
import Input from '.';

const ThemeProviderMock: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('Input Form Component', () => {
  it('should have a border color when active', async () => {
    const { getByTestId, debug } = render(
      <Input
        active={true}
        testID="input-email"
        placeholder="Email"
        keyboardType="email-address"
        autoCorrect={false}
      />,
      {
        wrapper: ThemeProviderMock,
      }
    );

    const inputComponent = getByTestId('input-email');
    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention
    );
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
