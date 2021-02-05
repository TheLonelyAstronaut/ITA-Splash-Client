import React, { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useSelector } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components/native';

import { Container } from '../../ui/container.component';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { getTheme } from '../../ui/themes/selectors';
import { DEVICE_SIZE, themesCollection, ThemesEnum } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { AuthNavigationProps } from '../routing.params';

import { BackgroundImage, EmailText, Input, InputText, Title } from './login-screen.component';

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
    //const dispatch = useDispatch();
    const themeKey = useSelector(getTheme);
    const theme = useMemo(() => themesCollection[themeKey] as DefaultTheme, [themeKey]);

    // const handleLogin = useCallback(() => {
    //     dispatch(
    //         LOGIN.TRIGGER({
    //             username: 'vlad',
    //             password: '123',
    //         })
    //     );
    // }, [dispatch]);
    //
    // const handleTheme = useCallback(() => {
    //     dispatch(CHANGE_THEME({ theme: ThemesEnum.DARK }));
    // }, [dispatch]);

    return (
        <Container>
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
                <ScrollView>
                    <RegisterInputArea>
                        <EmailText>{I18n.t('Name')}</EmailText>
                        <Input />
                        <InputText>{I18n.t('Email')}</InputText>
                        <Input />
                        <InputText>{I18n.t('Password')}</InputText>
                        <Input />
                        <InputText>{I18n.t('RepeatPassword')}</InputText>
                        <Input />
                        <LinearButton title={'SignUp'} />
                    </RegisterInputArea>
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default RegisterScreen;
