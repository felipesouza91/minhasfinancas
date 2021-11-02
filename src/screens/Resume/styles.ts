import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { ITotalCategory } from '.';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
`;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(90)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const HistoryCards = styled(
  FlatList as new () => FlatList<ITotalCategory>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 0, padding: 24 },
})``;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ChartContainer = styled.View`
  width: 100%;
  margin-top: -${RFValue(28)}px;
`;

export const MonthSelect = styled.View`
  margin-top: 10px;
  width: 100%;
  padding: 8px 24px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const MonthSelectButton = styled(BorderlessButton)`
  padding-top: 11px;
  padding-left: 2px;
  padding-right: 2px;
  padding-bottom: 11px;
`;

export const MonthSelectIcon = styled(Feather)`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const Month = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
