import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components/native';

import { users } from '../../../mocks/users';
import { AvoidingContainer } from '../../ui/container.component';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { getTheme } from '../../ui/themes/selectors';
import { DEVICE_SIZE, themesCollection, ThemesEnum } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { REGISTER } from '../actions';
import { AuthNavigationProps } from '../routing.params';

import { BackgroundImage, EmailText, Input, InputText, Title, validateEmail } from './login-screen.component';

export const RegisterInputArea = styled.View`
    background-color: ${(props) => props.theme.colors.main};
    width: ${DEVICE_SIZE.width * 0.83}px;
    height: 525px;
    align-self: center;
    margin-top: 25%;
`;
export const LogoContainer = styled.View`
    width: ${DEVICE_SIZE.width * 0.3}px;
    height: 40px;
    background-color: ${(props) => props.theme.colors.main};
    margin-left: ${DEVICE_SIZE.width * 0.45 + 5}px;
    margin-top: 20%;
`;

export const BackButtonContainer = styled.TouchableOpacity`
    margin-left: 25px;
    margin-top: 20%;
`;

export const LogoWrapper = styled.View`
    flex-direction: row;
`;

export type RegisterScreenProps = AuthNavigationProps<'Register'>;

export const RegisterScreen: React.FC<RegisterScreenProps> = (props: RegisterScreenProps) => {
    const dispatch = useDispatch();
    const themeKey = useSelector(getTheme);
    const theme = useMemo(() => themesCollection[themeKey] as DefaultTheme, [themeKey]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [name, setName] = useState('');
    const [validation, setValidation] = useState(true);

    const handleRegister = () => {
        if (password === repeatPassword) {
            dispatch(REGISTER.TRIGGER({ email: email, username: name, password: password }));
            console.log(users);
        }
    };

    return (
        <AvoidingContainer>
            <KeyboardAvoidingView
                contentContainerStyle={{ flex: 1 }}
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {themeKey === ThemesEnum.DARK && ThemesEnum.JAPANESE ? (
                    <BackgroundImage source={require('../../../assets/background.jpg')} />
                ) : (
                    <BackgroundImage source={require('../../../assets/light-background.jpg')} />
                )}
                <LogoWrapper>
                    <BackButtonContainer onPress={() => props.navigation.goBack()}>
                        <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
                    </BackButtonContainer>
                    <LogoContainer>
                        <Title>Splash</Title>
                    </LogoContainer>
                </LogoWrapper>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <RegisterInputArea>
                        <EmailText>{I18n.t('Name')}</EmailText>
                        <Input onChangeText={(val) => setName(val)} />
                        <InputText>{I18n.t('Email')}</InputText>
                        <Input
                            //eslint-disable-next-line react-native/no-color-literals
                            style={{ borderColor: validation ? theme.colors.additivePink : 'red' }}
                            onChangeText={(val) => {
                                setEmail(val);
                                setValidation(validateEmail(email));
                            }}
                        />
                        <InputText>{I18n.t('Password')}</InputText>
                        <Input onChangeText={(val) => setPassword(val)} secureTextEntry={true} />
                        <InputText>{I18n.t('RepeatPassword')}</InputText>
                        <Input onChangeText={(val) => setRepeatPassword(val)} secureTextEntry={true} />
                        <LinearButton title={'SignUp'} onPress={handleRegister} />
                    </RegisterInputArea>
                </ScrollView>
            </KeyboardAvoidingView>
        </AvoidingContainer>
    );
};

export default RegisterScreen;
