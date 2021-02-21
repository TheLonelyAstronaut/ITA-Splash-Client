import React, { useCallback, useMemo, useState } from 'react';
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
import { validateEmail } from '../../utils/validators';
import { REGISTER } from '../actions';
import {
    BackgroundImage,
    Input,
    Title,
    ValidationInput,
    LogoContainer as BaseLogoContainer,
} from '../components/styled.component';
import { AuthNavigationProps } from '../routing.params';

export const RegisterInputArea = styled.View`
    width: ${DEVICE_SIZE.width * 0.83}px;
    align-self: center;
    margin-top: 40%;
    padding-horizontal: ${(props) => props.theme.spacer * 3}px;
`;

export const LogoContainer = styled(BaseLogoContainer)`
    background-color: ${(props) => props.theme.colors.main};
    margin-top: 0%;
    margin-left: 0%;
`;

export const BackButtonContainer = styled.TouchableOpacity``;

export const LogoWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: ${DEVICE_SIZE.width * 0.14}px;
    margin-top: 20%;
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

    const handleRegister = useCallback(() => {
        if (password === repeatPassword) {
            dispatch(REGISTER.TRIGGER({ email: email, username: name, password: password }));
            console.log(users);
        }
    }, [dispatch, email, password, repeatPassword, name]);

    return (
        <AvoidingContainer>
            <KeyboardAvoidingView
                contentContainerStyle={{ flex: 1 }}
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <BackgroundImage
                    source={
                        themeKey === ThemesEnum.DARK && ThemesEnum.JAPANESE
                            ? require('../../../assets/register-background.png')
                            : require('../../../assets/light-background.jpg')
                    }
                />
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    <LogoWrapper>
                        <BackButtonContainer
                            onPress={useCallback(() => {
                                props.navigation.goBack();
                            }, [props.navigation])}
                        >
                            <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
                        </BackButtonContainer>
                        <LogoContainer>
                            <Title>Splash</Title>
                        </LogoContainer>
                    </LogoWrapper>
                    <RegisterInputArea>
                        <Input
                            placeholder={I18n.t('auth.name')}
                            onChangeText={useCallback((val) => {
                                setName(val);
                            }, [])}
                        />
                        <ValidationInput
                            placeholder={I18n.t('auth.email')}
                            valid={validation}
                            onChangeText={useCallback((val) => {
                                setEmail(val);
                                setValidation(validateEmail(val));
                            }, [])}
                        />
                        <Input
                            placeholder={I18n.t('auth.password')}
                            onChangeText={useCallback((val) => {
                                setPassword(val);
                            }, [])}
                            secureTextEntry={true}
                        />
                        <Input
                            placeholder={I18n.t('auth.repeatPassword')}
                            onChangeText={useCallback((val) => {
                                setRepeatPassword(val);
                            }, [])}
                            secureTextEntry={true}
                        />
                        <LinearButton title={I18n.t('auth.signUp')} onPress={handleRegister} />
                    </RegisterInputArea>
                </ScrollView>
            </KeyboardAvoidingView>
        </AvoidingContainer>
    );
};

export default RegisterScreen;
