import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

// import { Container } from './styles';

const Profile: React.FC = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>
      <TextInput testID="input-name" placeholder="Nome" autoCorrect={false} />
      <TextInput testID="input-surname" placeholder="Sobrenome" />
      <Button title="Salver" onPress={() => {}} />
    </View>
  );
};

export default Profile;
