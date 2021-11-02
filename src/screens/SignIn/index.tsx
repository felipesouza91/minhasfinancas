import React, { useState } from 'react';
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  SocialButtonContaioner,
} from './styles';

import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import SignInSocialButton from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert, Platform } from 'react-native';

import { useTheme } from 'styled-components';

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const { colors } = useTheme();
  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      Alert.alert('Erro ao efetuar o login');
      setIsLoading(false);
    }
  }
  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      Alert.alert('Erro ao efetuar o login');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas{'\n'}finanças de forma{'\n'}muito simples
          </Title>
        </TitleWrapper>
        <SigninTitle>
          Faça o seu login com{'\n'}uma das contas abaixo
        </SigninTitle>
      </Header>
      <Footer>
        <SocialButtonContaioner>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            svg={GoogleSvg}
            title="Entrar com Google"
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              svg={AppleSvg}
              title="Entrar com Apple"
            />
          )}
        </SocialButtonContaioner>
      </Footer>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 18 }}
        />
      )}
    </Container>
  );
};

export default SignIn;
