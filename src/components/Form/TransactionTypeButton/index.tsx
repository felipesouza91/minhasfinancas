import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title, Button } from './styles';

interface ITransactionTypeButton extends RectButtonProps {
  title: string;
  type: 'income' | 'outcome';
  isActive: boolean;
}

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
};

const TransactionTypeButton: React.FC<ITransactionTypeButton> = ({
  title,
  type,
  isActive,
  ...rest
}) => {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icon[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};

export default TransactionTypeButton;
