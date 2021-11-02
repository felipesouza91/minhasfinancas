import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import appTheme from '../../global/styles/theme';

interface ITypeProps {
  type: 'up' | 'down' | 'total';
}

const iconColors = {
  up: appTheme.colors.success,
  down: appTheme.colors.attention,
  total: appTheme.colors.shape,
};

export const Container = styled.View<ITypeProps>`
  background-color: ${({ type, theme }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 18px 23px;
  padding-bottom: ${RFValue(42)}px;

  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<ITypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ type, theme }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<ITypeProps>`
  font-size: ${RFValue(40)}px;
  color: ${({ type }) => iconColors[type]};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<ITypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ type, theme }) =>
    type === 'up'
      ? theme.colors.success
      : type === 'total'
      ? theme.colors.shape
      : theme.colors.attention};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<ITypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ type, theme }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};
`;
