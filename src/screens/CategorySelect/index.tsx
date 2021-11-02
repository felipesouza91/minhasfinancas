import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Button from '../../components/Form/Button';

import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  CategoryName,
  Separator,
  Footer,
} from './styles';

interface ICategory {
  key: string;
  name: string;
}

interface ICategorySelectProps {
  category: ICategory;
  setCategory: (item: ICategory) => void;
  closeSelectCategory: () => void;
}

const CategorySelect: React.FC<ICategorySelectProps> = ({
  category,
  closeSelectCategory,
  setCategory,
}) => {
  function handleSelectCategory(item: ICategory) {
    setCategory(item);
  }

  return (
    <Container>
      <Header>
        <Title>{category.name}</Title>
      </Header>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        style={{ flex: 1, width: '100%' }}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleSelectCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <CategoryName>{item.name}</CategoryName>
          </Category>
        )}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
};

export default CategorySelect;
