import React from 'react';
import styled from 'styled-components/native';
import { Title, Input, PasswordText, LoginText, Logo } from './login-screen.component';
import { Container } from '../../ui/container.component';
import { useSelector } from 'react-redux';
import { getTheme } from '../../ui/selectors';

export const RegisterInputArea = styled.View`
    background-color: ${(props) => props.theme.colors.secondary};
    width: ${(props) => props.theme.inputArea.width}px;
    height: ${(props) => props.theme.inputArea.heightRegister}px;
    align-self: center;
    margin-top: ${(props) => props.theme.inputArea.marginTop}%;
    border-radius: ${(props) => props.theme.inputArea.borderRadius}px;
`;
export const RegisterInputText = styled.Text`
    font-weight: ${(props) => props.theme.registerInputText.fontWeight};
    font-size: ${(props) => props.theme.registerInputText.fontSize}px;
    margin-left: ${(props) => props.theme.registerInputText.marginLeft}px;
    margin-top: ${(props) => props.theme.registerInputText.marginTop}%;
`;
export const RegisterButton = styled.TouchableOpacity`
    width: ${(props) => props.theme.loginButton.width}px;
    height: ${(props) => props.theme.loginButton.height}px;
    border-radius: ${(props) => props.theme.loginButton.borderRadius}px;
    background-color: ${(props) => props.theme.colors.additive};
    align-self: center;
    margin-top: ${(props) => props.theme.loginButton.marginTopRegister}px;
`;

export const RegisterScreen: React.FC = () => {
    const logo = useSelector(getTheme);

    return (
        <Container>
            {logo.colors.main === 'black' ? (
                <Logo source={require('../../assets/dark-logo.jpg')} />
            ) : (
                <Logo source={require('../../assets/light-logo.jpg')} />
            )}
            <Title>Splash</Title>
            <RegisterInputArea>
                <RegisterInputText>Email</RegisterInputText>
                <Input />
                <PasswordText>Name</PasswordText>
                <Input />
                <PasswordText>Password</PasswordText>
                <Input secureTextEntry={true} />
                <PasswordText>Password</PasswordText>
                <Input secureTextEntry={true} />
                <RegisterButton activeOpacity={0.5}>
                    <LoginText>Sign in</LoginText>
                </RegisterButton>
            </RegisterInputArea>
        </Container>
    );
};
