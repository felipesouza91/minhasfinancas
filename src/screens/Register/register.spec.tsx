import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Register from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});
const ProviderMock: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('Register Screen test', () => {
  it('should be open when user click on the category button', async () => {
    const { getByTestId } = render(<Register />, { wrapper: ProviderMock });
    const modalCategory = getByTestId('modal-category');
    const selectCategoryButton = getByTestId('category-select-button');
    fireEvent.press(selectCategoryButton);
    await waitFor(() => {
      expect(modalCategory.props.visible).toBeTruthy();
    });
  });

  it('should be open when user click on the category button', async () => {
    const { getByTestId } = render(<Register />, { wrapper: ProviderMock });
    const modalCategory = getByTestId('modal-category');
    const selectCategoryButton = getByTestId('category-select-button');
    fireEvent.press(selectCategoryButton);
    expect(modalCategory.props.visible).toBeTruthy();
  });
});
