import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import Input from '../Input';

import { Container, Error } from './styles';

interface IInputFormProps extends TextInputProps {
  control: Control;
  name: string;
  errorMessage?: string;
  rules?: {};
}

const InputForm: React.FC<IInputFormProps> = ({
  control,
  name,
  rules,
  errorMessage,
  ...rest
}) => {
  return (
    <Container>
      <Controller
        rules={rules}
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            {...rest}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errorMessage && <Error>{errorMessage}</Error>}
    </Container>
  );
};

export default InputForm;
