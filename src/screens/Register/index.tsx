import React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import InputForm from '../../components/Form/InputForm';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategorySelect from '../CategorySelect';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import Button from '../../components/Form/Button';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypeButtonGroup,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface IFormData {
  name: string;
  amount: string;
  category: {
    name: string;
    key: string;
  };
  transactionType: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatorio'),
  amount: Yup.number().positive().integer().required('Valor é obrigatorio'),
  transactionType: Yup.string().required('Tipo de transação é obrigatorio'),
  category: Yup.object().required('Categoria é obrigatorio'),
});

const Register: React.FC = () => {
  const { user } = useAuth();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
    getValues,
  } = useForm({
    defaultValues: undefined,
    resolver: yupResolver(schema),
  });
  const router = useNavigation();

  const categoryDefaultValue = { key: 'cetegory', name: 'Categoria' };
  function handleCloseSelectCategory() {
    setIsVisibleModal(false);
  }
  function showAlert() {
    Alert.alert('Error', `${errors.transactionType.message}`);
  }

  async function onSubmit(form: IFormData) {
    try {
      const newTransaction = {
        id: String(uuid.v4()),
        ...form,
        category: form.category.key,
        date: new Date(),
      };
      const dataKey = `@gofinance:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const transactions = data ? JSON.parse(data) : [];
      const currentData = [...transactions, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(currentData));
      reset();
      router.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel salvar');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              control={control}
              name="name"
              autoCapitalize="sentences"
              autoCorrect={false}
              rules={{
                required: true,
              }}
              errorMessage={isSubmitted && errors?.name?.message}
            />
            <InputForm
              placeholder="Preço"
              control={control}
              name="amount"
              keyboardType="numeric"
              rules={{
                required: true,
              }}
              errorMessage={isSubmitted && errors?.amount?.message}
            />

            <TransactionTypeButtonGroup>
              <Controller
                name="transactionType"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <TransactionTypeButton
                      type="income"
                      title="Entrada"
                      isActive={value === 'income'}
                      onPress={() => onChange('income')}
                    />
                    <TransactionTypeButton
                      type="outcome"
                      title="Saida"
                      isActive={value === 'outcome'}
                      onPress={() => onChange('outcome')}
                    />
                  </>
                )}
              />
            </TransactionTypeButtonGroup>

            <CategorySelectButton
              testID="category-select-button"
              title={
                getValues('category')
                  ? getValues('category').name
                  : categoryDefaultValue.name
              }
              onPress={() => setIsVisibleModal(true)}
            />
          </Fields>

          <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
        </Form>
        <Modal visible={isVisibleModal} testID="modal-category">
          <Controller
            control={control}
            name="category"
            rules={{
              required: true,
            }}
            defaultValue={categoryDefaultValue}
            render={({ field: { value, onChange } }) => (
              <CategorySelect
                category={value}
                closeSelectCategory={handleCloseSelectCategory}
                setCategory={onChange}
              />
            )}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
