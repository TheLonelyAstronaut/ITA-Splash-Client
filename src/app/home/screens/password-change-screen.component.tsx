import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { Input, ValidationInput } from '../../authentication/components/styled.component';
import { AvoidingContainer } from '../../ui/container.component';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { RegularText } from '../../ui/text.component';
import I18n from '../../utils/i18n';
import { CHANGE_PASSWORD } from '../actions';
import { HomeNavigationProps } from '../routing.params';

export const InputWrapper = styled.View`
    margin-top: ${(props) => props.theme.spacer};
`;
export const InputText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    margin-left: ${(props) => props.theme.spacer * 7.5};
    margin-top: ${(props) => props.theme.spacer * 4};
    margin-bottom: -10px;
`;

export const BackButtonContainer = styled.TouchableOpacity`
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 2};
`;

export type SettingsScreenProps = HomeNavigationProps<'PasswordChangeScreen'>;

export const PasswordChangeScreenComponent: React.FC<SettingsScreenProps> = (props: SettingsScreenProps) => {
    const theme = useTheme();
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [match, setMatch] = useState(true);
    const dispatch = useDispatch();

    const handleSaveChanges = useCallback(() => {
        dispatch(CHANGE_PASSWORD.TRIGGER({ currentPass: currentPass, newPass: newPass, repeatNewPass: repeatPass }));
    }, [dispatch, currentPass, newPass, repeatPass]);

    return (
        <AvoidingContainer>
            <BackButtonContainer
                onPress={useCallback(() => {
                    props.navigation.goBack();
                }, [props.navigation])}
            >
                <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
            </BackButtonContainer>
            <InputWrapper>
                <InputText>{I18n.t('settings.currentPassword')}</InputText>
                <Input
                    onChangeText={useCallback((val) => {
                        setCurrentPass(val);
                    }, [])}
                    secureTextEntry={true}
                />
                <InputText>{I18n.t('settings.newPassword')}</InputText>
                <Input
                    onChangeText={useCallback((val) => {
                        setNewPass(val);
                    }, [])}
                    secureTextEntry={true}
                />
                <InputText>{I18n.t('settings.repeatNewPassword')}</InputText>
                <ValidationInput
                    valid={match}
                    onChangeText={useCallback((val) => {
                        setMatch(true);
                        setRepeatPass(val);
                    }, [])}
                    secureTextEntry={true}
                />
                <LinearButton title={'settings.saveChanges'} onPress={handleSaveChanges} />
            </InputWrapper>
        </AvoidingContainer>
    );
};
