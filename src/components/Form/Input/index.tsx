import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface IInputProps extends TextInputProps {
  active?: boolean;
}

const Input: React.FC<IInputProps> = ({ active = false, ...rest }) => {
  return <Container active={active} {...rest} />;
};

export default Input;
