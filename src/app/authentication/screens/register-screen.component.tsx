import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components/native';

import { en } from '../../../locales/locales';
import { Container } from '../../ui/container.component';
import { getTheme } from '../../ui/themes/selectors';
import { themesCollection } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';

import { Title, Input, PasswordText, LoginText, Logo } from './login-screen.component';

export const RegisterInputArea = styled.View`
    background-color: ${(props) => props.theme.colors.secondary};
    width: 350px;
    height: 450px;
    align-self: center;
    margin-top: 5%;
    border-radius: ${(props) => props.theme.borderRadius.medium}px;
`;
export const RegisterInputText = styled.Text`
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer}px;
`;
export const RegisterButton = styled.TouchableOpacity`
    width: 300px;
    height: 45px;
    border-radius: ${(props) => props.theme.borderRadius.large}px;
    background-color: ${(props) => props.theme.colors.additive};
    align-self: center;
    margin-top: ${(props) => props.theme.spacer}px;
`;

export const RegisterScreen: React.FC = () => {
    const themeKey = useSelector(getTheme);
    const theme = useMemo(() => themesCollection[themeKey] as DefaultTheme, [themeKey]);

    return (
        <Container>
            {theme.colors.main === 'black' ? (
                <Logo source={require('../../../assets/dark-logo.jpg')} />
            ) : (
                <Logo source={require('../../../assets/light-logo.jpg')} />
            )}
            <Title>Splash</Title>
            <RegisterInputArea>
                <RegisterInputText>{I18n.t(en.login)}</RegisterInputText>
                <Input />
                <PasswordText>{I18n.t(en.hello)}</PasswordText>
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
