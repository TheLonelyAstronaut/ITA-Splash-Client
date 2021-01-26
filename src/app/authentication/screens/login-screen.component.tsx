import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components/native';

import { Container } from '../../ui/container.component';
import { CHANGE_THEME } from '../../ui/themes/actions';
import { getTheme } from '../../ui/themes/selectors';
import { themesCollection, ThemesEnum } from '../../ui/themes/themes';
import { LOGIN } from '../actions';
import { AuthNavigationProps } from '../routing.params';

export type LoginScreenProps = AuthNavigationProps<'Login'>;

export const Title = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large}px;
    margin-top: 5%;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
`;

export const Logo = styled.Image`
    width: 180px;
    height: 180px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer * 3}%;
`;

export const InputArea = styled.View`
    background-color: ${(props) => props.theme.colors.secondary};
    width: 350px;
    height: 350px;
    align-self: center;
    margin-top: 15%;
    border-radius: ${(props) => props.theme.borderRadius.medium}px;
`;

export const Input = styled.TextInput`
    height: 45px;
    width: 300px;
    border-width: 1px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer}px;
    border-radius: ${(props) => props.theme.borderRadius.small}px;
    padding-left: ${(props) => props.theme.spacer}px;
    background-color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.main};
    color: ${(props) => props.theme.colors.main};
`;

export const EmailText = styled.Text`
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    margin-left: ${(props) => props.theme.spacer * 3}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
    color: ${(props) => props.theme.colors.main};
`;

export const PasswordText = styled.Text`
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    margin-left: ${(props) => props.theme.spacer * 3}px;
    margin-top: ${(props) => props.theme.spacer}%;
    color: ${(props) => props.theme.colors.main};
`;

export const LoginButton = styled.TouchableOpacity`
    width: 300px;
    height: 45px;
    border-radius: ${(props) => props.theme.borderRadius.large}px;
    background-color: ${(props) => props.theme.colors.additive};
    align-self: center;
    margin-top: ${(props) => props.theme.spacer}%;
`;

export const LoginText = styled.Text`
    color: white;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    text-align: center;
    margin-top: ${(props) => props.theme.spacer}px;
`;

export const SignUpText = styled.Text`
    text-align: center;
    color: ${(props) => props.theme.colors.additive};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-top: ${(props) => props.theme.spacer}px;
`;

export const LoginScreen: React.FC<LoginScreenProps> = () => {
    const dispatch = useDispatch();
    const themeKey = useSelector(getTheme);
    const theme = useMemo(() => themesCollection[themeKey] as DefaultTheme, [themeKey]);

    const handleLogin = useCallback(() => {
        dispatch(
            LOGIN.TRIGGER({
                username: 'vlad',
                password: '123',
            })
        );
    }, [dispatch]);

    const handleTheme = useCallback(() => {
        dispatch(CHANGE_THEME({ theme: ThemesEnum.LIGHT }));
    }, [dispatch]);

    return (
        <Container>
            {theme.colors.main === 'black' ? (
                <Logo source={require('../../../assets/dark-logo.jpg')} />
            ) : (
                <Logo source={require('../../../assets/light-logo.jpg')} />
            )}
            <Title>Splash</Title>
            <InputArea>
                <EmailText>Email</EmailText>
                <Input />
                <PasswordText>Password</PasswordText>
                <Input secureTextEntry={true} />
                <LoginButton activeOpacity={0.5} onPress={handleLogin}>
                    <LoginText>Sign in</LoginText>
                </LoginButton>
                <TouchableOpacity activeOpacity={0.5} onPress={handleTheme}>
                    <SignUpText>Sign up</SignUpText>
                </TouchableOpacity>
            </InputArea>
        </Container>
    );
};

export default LoginScreen;
