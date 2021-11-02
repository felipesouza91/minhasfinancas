import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import { VictoryPie } from 'victory-native';
import { addMonths, subMonths } from 'date-fns';
import { categories } from '../../utils/categories';
import { formatDateToMountAndYear, formatToAmount } from '../../utils/format';

import HistoryCard from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  HistoryCards,
  LoadContainer,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface TransactionStorage {
  name: string;
  amount: string;
  category: string;
  date: string;
  transactionType: 'income' | 'outcome';
}

export interface ITotalCategory {
  key: string;
  name: string;
  amount: number;
  amountFormatted: string;
  color: string;
  percents: number;
  percentsFormatted: string;
}

const Resume: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [totalByCategory, setTotalByCategory] = useState<ITotalCategory[]>([]);
  const [selectedDate, setSelectDate] = useState(new Date());
  const dataKey = `@gofinance:transactions_user:${user.id}`;
  const loadData = async () => {
    setIsLoading(true);
    let totalCategoriesSum: ITotalCategory[] = [];
    const flatTransatcions = await AsyncStorage.getItem(dataKey);
    const transactionsStorage: TransactionStorage[] = flatTransatcions
      ? JSON.parse(flatTransatcions)
      : [];
    const expensives = transactionsStorage.filter(
      (item) =>
        item.transactionType === 'outcome' &&
        new Date(item.date).getMonth() === selectedDate.getMonth() &&
        new Date(item.date).getFullYear() === selectedDate.getFullYear()
    );
    const total =
      expensives.length > 0
        ? expensives.reduce((total, item) => (total += Number(item.amount)), 0)
        : 0;
    categories.forEach((category) => {
      let categorySum = 0;
      expensives.forEach((item) => {
        item.category === category.key && (categorySum += Number(item.amount));
      });
      if (categorySum > 0) {
        totalCategoriesSum.push({
          key: category.key,
          amountFormatted: formatToAmount(categorySum),
          amount: categorySum,
          color: category.color,
          name: category.name,
          percents: (categorySum / total) * 100,
          percentsFormatted: `${((categorySum / total) * 100).toFixed(1)}%`,
        });
      }
    });
    setTotalByCategory(totalCategoriesSum);
    setIsLoading(false);
  };

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectDate(addMonths(selectedDate, 1));
    } else {
      setSelectDate(subMonths(selectedDate, 1));
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={colors.primary} size={20} />
        </LoadContainer>
      ) : (
        <>
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>
            <Month>{formatDateToMountAndYear(selectedDate)}</Month>
            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategory}
              x="percentsFormatted"
              y="amount"
              colorScale={totalByCategory.map((item) => item.color)}
              labelRadius={({ datum, height }) => {
                return datum.percents < 1 ? 100 : 70;
              }}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: colors.shape,
                },
              }}
            />
          </ChartContainer>

          <HistoryCards
            data={totalByCategory}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <HistoryCard
                title={item.name}
                color={item.color}
                amount={item.amountFormatted}
              />
            )}
          />
        </>
      )}
    </Container>
  );
};

export default Resume;
