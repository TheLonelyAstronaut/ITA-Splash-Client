import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

import { Input, ValidationInput } from '../../authentication/components/styled/authentication.styled';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { AvoidingContainer } from '../../ui/styled/container.styled';
import I18n from '../../utils/i18n';
import { CHANGE_PASSWORD } from '../actions';
import { BackButtonContainer, InputText, InputWrapper } from '../components/styled/password-change-screen.styled';
import { PasswordChangeProps } from '../routing.params';

export const PasswordChangeScreenComponent: React.FC<PasswordChangeProps> = (props: PasswordChangeProps) => {
    const theme = useTheme();
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [match, setMatch] = useState(true);
    const dispatch = useDispatch();

    const handleSaveChanges = useCallback(() => {
        dispatch(CHANGE_PASSWORD.TRIGGER({ currentPass: currentPass, newPass: newPass, repeatNewPass: repeatPass }));
    }, [dispatch, currentPass, newPass, repeatPass]);

    const handleBackPress = useCallback(() => {
        props.navigation.goBack();
    }, [props.navigation]);

    const handleCurrentPasswordChange = useCallback((val) => {
        setCurrentPass(val);
    }, []);

    const handleNewPasswordChange = useCallback((val) => {
        setNewPass(val);
    }, []);

    const handleRepeatNewPasswordChange = useCallback((val) => {
        setMatch(true);
        setRepeatPass(val);
    }, []);

    return (
        <AvoidingContainer>
            <BackButtonContainer onPress={handleBackPress}>
                <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
            </BackButtonContainer>
            <InputWrapper>
                <InputText>{I18n.t('settings.currentPassword')}</InputText>
                <Input onChangeText={handleCurrentPasswordChange} secureTextEntry={true} />
                <InputText>{I18n.t('settings.newPassword')}</InputText>
                <Input onChangeText={handleNewPasswordChange} secureTextEntry={true} />
                <InputText>{I18n.t('settings.repeatNewPassword')}</InputText>
                <ValidationInput valid={match} onChangeText={handleRepeatNewPasswordChange} secureTextEntry={true} />
                <LinearButton title={'settings.saveChanges'} onPress={handleSaveChanges} />
            </InputWrapper>
        </AvoidingContainer>
    );
};
