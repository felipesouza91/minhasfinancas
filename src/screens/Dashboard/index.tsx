import React, { useCallback, useMemo } from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';

import {
  formatToAmount,
  formattedDate,
  formattedDateNarrow,
} from '../../utils/format';
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  Photo,
  UserGreating,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadContainer,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import theme from '../../global/styles/theme';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

export interface TransactionStorage {
  id: string;
  name: string;
  amount: string;
  category: string;
  date: string;
  transactionType: 'income' | 'outcome';
}

export interface Transaction {
  id: string;
  name: string;
  amount: string;
  category: string;
  date: string;
  transactionType: 'income' | 'outcome';
}

interface IHighlightProps {
  amount: string;
  lastTransaction: string;
}

interface IHighlightData {
  income: IHighlightProps;
  outcome: IHighlightProps;
  total: IHighlightProps;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [highlightData, setHighlightData] = useState({} as IHighlightData);
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();

  async function loadData() {
    const dataKey = `@gofinance:transactions_user:${user.id}`;
    let totalIncome = 0;
    let totalOutcome = 0;
    let transactionIncome: number[] = [];
    let transactionOutcome: number[] = [];
    const flatTransatcions = await AsyncStorage.getItem(dataKey);
    const transactionsStorage: TransactionStorage[] = flatTransatcions
      ? JSON.parse(flatTransatcions)
      : [];
    const formatTransactions = transactionsStorage.map((transaction) => {
      const { id, amount, category, date, name, transactionType } = transaction;
      if (transaction.transactionType === 'income') {
        totalIncome += Number(transaction.amount);
        transactionIncome.push(new Date(transaction.date).getTime());
      } else {
        totalOutcome += Number(transaction.amount);
        transactionOutcome.push(new Date(transaction.date).getTime());
      }

      return {
        id,
        amount: formatToAmount(amount),
        category,
        date: formattedDate(date),
        name,
        transactionType,
      };
    });
    const lastTransactionIncome =
      transactionIncome.length > 0
        ? `Última entrada dia ${formattedDateNarrow(
            Math.max.apply(Math, transactionIncome)
          )}`
        : `Nenhuma entrada encontrada`;
    const lastTransactionOutcome =
      transactionIncome.length > 0
        ? `Última saida dia ${formattedDateNarrow(
            Math.max.apply(Math, transactionOutcome)
          )}`
        : `Nenhuma entrada encontrada`;
    setTransactions(formatTransactions);
    setHighlightData({
      income: {
        amount: formatToAmount(totalIncome),
        lastTransaction: lastTransactionIncome,
      },
      outcome: {
        amount: formatToAmount(totalOutcome),
        lastTransaction: lastTransactionOutcome,
      },
      total: {
        amount: formatToAmount(totalIncome - totalOutcome),
        lastTransaction: `01 ate ${formattedDateNarrow(new Date().getTime())}`,
      },
    });
    setIsLoading(false);
  }

  async function handleSignOut() {
    await signOut();
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={colors.primary} size={20} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreating>Ola,</UserGreating>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={handleSignOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entrada"
              amount={highlightData.income.amount}
              lastTransaction={highlightData.income.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saida"
              amount={highlightData.outcome.amount}
              lastTransaction={highlightData.outcome.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
