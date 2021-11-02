import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
interface ITypeProps {
  type: 'income' | 'outcome';
}

interface IContainerProps extends ITypeProps {
  isActive: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 48%;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  ${({ isActive, type }) =>
    isActive &&
    css`
      border: none;
      background-color: ${({ theme }) =>
        type === 'income'
          ? theme.colors.success_light
          : theme.colors.attention_light};
    `}
  border-radius: 5px;
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 18px;
`;

export const Icon = styled(Feather)<ITypeProps>`
  color: ${({ type, theme }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
