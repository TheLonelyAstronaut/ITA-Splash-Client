import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { LOGOUT } from '../../authentication/actions';
import { getEmail } from '../../authentication/selectors';
import { BackButton } from '../../ui/back-button.component';
import { AvoidingContainer } from '../../ui/styled/container.styled';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { SettingsItemComponent } from '../components/settings-item.component';
import {
    HeaderButtonsWrapper,
    LogoutButton,
    ProfileImage,
    Username,
} from '../components/styled/settings-screen.styled';
import { SettingsScreenProps } from '../routing.params';

export const SettingsScreenComponent: React.FC<SettingsScreenProps> = (props: SettingsScreenProps) => {
    const email = useSelector(getEmail);
    const theme = useTheme();
    const dispatch = useDispatch();
    const themeKey = useSelector(getTheme);

    const themeName = useMemo(() => {
        if (themeKey === ThemesEnum.DARK) {
            return I18n.t('settings.dark');
        } else if (themeKey === ThemesEnum.LIGHT) {
            return I18n.t('settings.light');
        } else {
            return I18n.t('settings.japanese');
        }
    }, [themeKey]);

    const handleLogout = useCallback(() => {
        dispatch(LOGOUT.TRIGGER());
    }, [dispatch]);

    const handleBackPress = useCallback(() => {
        props.navigation.goBack();
    }, [props.navigation]);

    const handleThemeChangePress = useCallback(() => {
        props.navigation.navigate('ThemeChangeScreen');
    }, [props.navigation]);

    const handlePasswordChangePress = useCallback(() => {
        props.navigation.navigate('PasswordChangeScreen');
    }, [props.navigation]);

    return (
        <AvoidingContainer>
            <HeaderButtonsWrapper>
                <BackButton onPress={handleBackPress}>
                    <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
                </BackButton>
                <LogoutButton onPress={handleLogout}>
                    <Icon name={'exit-outline'} color={'red'} size={30} />
                </LogoutButton>
            </HeaderButtonsWrapper>
            <ProfileImage source={require('../../../assets/profile-image.jpg')} />
            <Username>{email}</Username>
            <SettingsItemComponent
                title={I18n.t('settings.theme')}
                onPress={handleThemeChangePress}
                theme={themeName}
            />
            <SettingsItemComponent title={I18n.t('settings.changePassword')} onPress={handlePasswordChangePress} />
        </AvoidingContainer>
    );
};
