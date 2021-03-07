import React, { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultTheme } from 'styled-components/native';

import { users } from '../../../mocks/users';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { Container } from '../../ui/styled/container.styled';
import { getTheme } from '../../ui/themes/selectors';
import { themesCollection, ThemesEnum } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { validateEmail } from '../../utils/validators';
import { REGISTER } from '../actions';
import { BackgroundImage, Input, Title, ValidationInput } from '../components/styled/authentication.styled';
import {
    BackButtonContainer,
    LogoContainer,
    LogoWrapper,
    RegisterInputArea,
} from '../components/styled/register.styled';
import { AuthNavigationProps } from '../routing.params';

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
            //console.log(users);
        }
    }, [dispatch, email, password, repeatPassword, name]);

    const handleBackPress = useCallback(() => {
        props.navigation.goBack();
    }, [props.navigation]);

    const handleNameChange = useCallback((val) => {
        setName(val);
    }, []);

    const handleEmailChange = useCallback((val) => {
        setEmail(val);
        setValidation(validateEmail(val));
    }, []);

    const handlePasswordChange = useCallback((val) => {
        setPassword(val);
    }, []);

    const handleRepeatPasswordChange = useCallback((val) => {
        setRepeatPassword(val);
    }, []);

    return (
        <Container>
            <KeyboardAvoidingView
                contentContainerStyle={{ flex: 1 }}
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <BackgroundImage
                    source={
                        themeKey === ThemesEnum.DARK
                            ? require('../../../assets/register-background.png')
                            : require('../../../assets/light-background.jpg')
                    }
                />
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    <LogoWrapper>
                        <BackButtonContainer onPress={handleBackPress}>
                            <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
                        </BackButtonContainer>
                        <LogoContainer>
                            <Title>Splash</Title>
                        </LogoContainer>
                    </LogoWrapper>
                    <RegisterInputArea>
                        <Input
                            placeholder={I18n.t('auth.name')}
                            placeholderTextColor={theme.colors.inputBackground}
                            onChangeText={handleNameChange}
                        />
                        <ValidationInput
                            placeholder={I18n.t('auth.email')}
                            placeholderTextColor={theme.colors.inputBackground}
                            valid={validation}
                            onChangeText={handleEmailChange}
                        />
                        <Input
                            placeholder={I18n.t('auth.password')}
                            placeholderTextColor={theme.colors.inputBackground}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={true}
                        />
                        <Input
                            placeholder={I18n.t('auth.repeatPassword')}
                            placeholderTextColor={theme.colors.inputBackground}
                            onChangeText={handleRepeatPasswordChange}
                            secureTextEntry={true}
                        />
                        <LinearButton title={'auth.signUp'} onPress={handleRegister} />
                    </RegisterInputArea>
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
