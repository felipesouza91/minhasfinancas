import React from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  TitleCategory,
  Date,
} from './styles';
import { categories } from '../../utils/categories';
import { useMemo } from 'react';
interface ITransactionCard {
  data: {
    name: string;
    amount: string;
    category: string;
    date: string;
    transactionType: 'income' | 'outcome';
  };
}

const TransactionCard: React.FC<ITransactionCard> = ({ data }) => {
  const { amount, category, date, name, transactionType } = data;
  const categoryItem = useMemo(() => {
    return categories.find((item) => item.key === category);
  }, [category]);
  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={transactionType}>
        {transactionType === 'outcome' ? `- ${amount}` : amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={categoryItem?.icon} />
          <TitleCategory>{categoryItem?.name}</TitleCategory>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
