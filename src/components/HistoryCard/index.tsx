import React from 'react';

import { Container, Title, Amount } from './styles';

interface IHistoryCardProps {
  color: string;
  title: string;
  amount: string;
}

const HistoryCard: React.FC<IHistoryCardProps> = ({ color, title, amount }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};

export default HistoryCard;
