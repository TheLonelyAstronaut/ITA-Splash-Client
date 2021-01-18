import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CHANGE_THEME } from '../../styles/actions';
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
import { getTheme } from '../../styles/selectors';
import { lightTheme } from '../../styles/themes';
import { LOGIN } from '../actions';
import { AuthNavigationProps } from '../routing.params';

export type LoginScreenProps = AuthNavigationProps<'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = () => {
    const dispatch = useDispatch();

    const logo = useSelector(getTheme);

    const handleLogin = useCallback(() => {
        dispatch(
            LOGIN.TRIGGER({
                username: 'vlad',
                password: '123',
            })
        );
    }, [dispatch]);

    const handleTheme = useCallback(() => {
        dispatch(CHANGE_THEME({ theme: lightTheme }));
    }, [dispatch]);

    return (
        <Container>
            {logo.colors.main === 'black' ? (
                <Logo source={require('../../assets/dark-logo.jpg')} />
            ) : (
                <Logo source={require('../../assets/light-logo.jpg')} />
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
                    <RegisterText>Sign up</RegisterText>
                </TouchableOpacity>
            </InputArea>
        </Container>
    );
};

export default LoginScreen;
