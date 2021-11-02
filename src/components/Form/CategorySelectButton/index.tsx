import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Category, Icon } from './styles';

interface ICategorySelectButtonProps extends RectButtonProps {
  title: string;
}

const CategorySelectButton: React.FC<ICategorySelectButtonProps> = ({
  title,
  activeOpacity,
  ...rest
}) => {
  return (
    <Container {...rest} activeOpacity={0.7}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelectButton;
