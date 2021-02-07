import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { AvoidingContainer } from '../../ui/container.component';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { getTheme } from '../../ui/themes/selectors';
import { DEVICE_SIZE, ThemesEnum } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { LOGIN } from '../actions';
import { AuthNavigationProps } from '../routing.params';

export type LoginScreenProps = AuthNavigationProps<'Login'>;

export const Title = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large}px;
    text-align: center;
    font-family: ${(props) => props.theme.logoFont};
    margin-top: 12px;
`;

export const LogoContainer = styled.View`
    width: ${DEVICE_SIZE.width * 0.3}px;
    height: 40px;
    background-color: ${(props) => props.theme.colors.main};
    margin-left: 34px;
    margin-top: 40%;
`;

export const InputArea = styled.View`
    background-color: ${(props) => props.theme.colors.main};
    width: ${DEVICE_SIZE.width * 0.83}px;
    height: 360px;
    align-self: center;
    margin-top: 35%;
`;

export const Input = styled.TextInput`
    height: 45px;
    width: ${DEVICE_SIZE.width * 0.71}px;
    border-width: 1px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer}px;
    padding-left: ${(props) => props.theme.spacer}px;
    background-color: ${(props) => props.theme.colors.inputBackground};
    border-color: ${(props) => props.theme.colors.additivePink};
    color: ${(props) => props.theme.colors.secondary};
    font-family: ${(props) => props.theme.fontFamily.regular};
    font-size: ${(props) => props.theme.fontSize.medium};
`;

export const EmailText = styled.Text`
    font-family: ${(props) => props.theme.fontFamily.extraBold};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    margin-left: ${(props) => props.theme.spacer * 3}px;
    margin-top: ${(props) => props.theme.spacer * 5}px;
    color: ${(props) => props.theme.colors.secondary};
`;

export const InputText = styled.Text`
    font-family: ${(props) => props.theme.fontFamily.extraBold};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    margin-left: ${(props) => props.theme.spacer * 3}px;
    margin-top: ${(props) => props.theme.spacer}%;
    color: ${(props) => props.theme.colors.secondary};
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
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    margin-top: ${(props) => props.theme.spacer * 2.5}px;
    font-family: ${(props) => props.theme.fontFamily.bold};
`;
export const BackgroundImage = styled.ImageBackground`
    width: ${DEVICE_SIZE.width};
    height: ${DEVICE_SIZE.height + 2};
    position: absolute;
`;
export const SignUpWrapper = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width * 0.3};
    margin-left: ${DEVICE_SIZE.width * 0.27};
`;

export const validateEmail: (string) => boolean = (email: string) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
};

export const LoginScreen: React.FC<LoginScreenProps> = (props: LoginScreenProps) => {
    const dispatch = useDispatch();
    const themeKey = useSelector(getTheme);
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState(true);

    const handleLogin = () => {
        dispatch(LOGIN.TRIGGER({ email: email, password: password }));
    };

    return (
        <AvoidingContainer>
            <KeyboardAvoidingView
                contentContainerStyle={{ flex: 1 }}
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {themeKey === ThemesEnum.DARK || ThemesEnum.JAPANESE ? (
                    <BackgroundImage source={require('../../../assets/background.jpg')} />
                ) : (
                    <BackgroundImage source={require('../../../assets/light-background.jpg')} />
                )}
                <LogoContainer>
                    <Title>Splash</Title>
                </LogoContainer>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <InputArea>
                        <EmailText>{I18n.t('Email')}</EmailText>
                        <Input
                            //eslint-disable-next-line react-native/no-color-literals
                            style={{ borderColor: validation ? theme.colors.additivePink : 'red' }}
                            onChangeText={(val) => {
                                setEmail(val);
                                setValidation(validateEmail(email));
                            }}
                        />
                        <InputText>{I18n.t('Password')}</InputText>
                        <Input secureTextEntry={true} onChangeText={(val) => setPassword(val)} />
                        <LinearButton title={'SignIn'} onPress={handleLogin} />
                        <SignUpWrapper onPress={() => props.navigation.navigate('Register')}>
                            <SignUpText>{I18n.t('SignUp')}</SignUpText>
                        </SignUpWrapper>
                    </InputArea>
                </ScrollView>
            </KeyboardAvoidingView>
        </AvoidingContainer>
    );
};

export default LoginScreen;
