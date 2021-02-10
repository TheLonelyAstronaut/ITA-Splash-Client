import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { Input } from '../../authentication/screens/login-screen.component';
import { Container } from '../../ui/container.component';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { RegularText } from '../../ui/text.component';
import I18n from '../../utils/i18n';
import { HomeNavigationProps } from '../routing.params';

export const InputWrapper = styled.View`
    margin-top: ${(props) => props.theme.spacer * 15};
`;
export const InputText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    margin-left: ${(props) => props.theme.spacer * 7.5};
    margin-top: ${(props) => props.theme.spacer * 4};
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

    const handleSaveChanges = () => {
        return null;
    };

    return (
        <Container>
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
                <Input
                    onChangeText={useCallback((val) => {
                        setRepeatPass(val);
                    }, [])}
                    secureTextEntry={true}
                />
                <LinearButton title={I18n.t('settings.saveChanges')} onPress={handleSaveChanges} />
            </InputWrapper>
        </Container>
    );
};
