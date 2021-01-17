import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';

import {
    Container,
    Title,
    InputArea,
    Input,
    EmailText,
    PasswordText,
    LoginButton,
    LoginText,
    Logo,
    RegisterText,
} from '../../styles/login';
import { AuthNavigationProps } from '../routing.params';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../actions';

export type LoginScreenProps = AuthNavigationProps<'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = (props: LoginScreenProps) => {
    const dispatch = useDispatch();

    const handleLogin = useCallback(() => {
        dispatch(
            LOGIN.TRIGGER({
                username: 'vlad',
                password: '123',
            })
        );
    }, [dispatch]);

    return (
        <Container>
            <Logo source={require('../../assets/logo.jpg')} />
            <Title>Splash</Title>
            <InputArea>
                <EmailText>Email</EmailText>
                <Input />
                <PasswordText>Password</PasswordText>
                <Input secureTextEntry={true} />
                <LoginButton activeOpacity={0.5} onPress={handleLogin}>
                    <LoginText>Sign in</LoginText>
                </LoginButton>
                <TouchableOpacity activeOpacity={0.5}>
                    <RegisterText>Sign up</RegisterText>
                </TouchableOpacity>
            </InputArea>
        </Container>
    );
};

export default LoginScreen;
