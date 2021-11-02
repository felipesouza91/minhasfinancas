import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { Button, ImageContainer, Title } from './styles';

interface ISignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

const SignInSocialButton: React.FC<ISignInSocialButtonProps> = ({
  title,
  svg: Svg,
  ...rest
}) => {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Button>
  );
};

export default SignInSocialButton;
