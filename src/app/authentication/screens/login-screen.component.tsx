import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { AvoidingContainer } from '../../ui/container.component';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { validateEmail } from '../../utils/validators';
import { LOGIN } from '../actions';
import {
    BackgroundImage,
    Input,
    InputArea,
    LogoContainer,
    Title,
    ValidationInput,
} from '../components/styled.component';
import { AuthNavigationProps } from '../routing.params';

export type LoginScreenProps = AuthNavigationProps<'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = (props: LoginScreenProps) => {
    const dispatch = useDispatch();
    const themeKey = useSelector(getTheme);
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState(true);

    const handleLogin = useCallback(() => {
        dispatch(LOGIN.TRIGGER({ email: email, password: password }));
    }, [dispatch, email, password]);

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
                            ? require('../../../assets/background.jpg')
                            : require('../../../assets/light-background.jpg')
                    }
                />
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    <LogoContainer>
                        <Title>Splash</Title>
                    </LogoContainer>
                    <InputArea>
                        <ValidationInput
                            valid={validation}
                            placeholder={I18n.t('auth.email')}
                            placeholderTextColor={theme.colors.inputBackground}
                            onChangeText={useCallback((val) => {
                                setEmail(val);
                                setValidation(validateEmail(val));
                            }, [])}
                        />
                        <Input
                            secureTextEntry={true}
                            placeholder={I18n.t('auth.password')}
                            placeholderTextColor={theme.colors.inputBackground}
                            onChangeText={useCallback((val) => {
                                setPassword(val);
                            }, [])}
                        />
                        <LinearButton title={'auth.signIn'} onPress={handleLogin} />
                        <LinearButton
                            title={'auth.signUp'}
                            onPress={useCallback(() => props.navigation.navigate('Register'), [props])}
                            colors={[theme.colors.additivePink, theme.colors.contrast]}
                        />
                    </InputArea>
                </ScrollView>
            </KeyboardAvoidingView>
        </AvoidingContainer>
    );
};

export default LoginScreen;
