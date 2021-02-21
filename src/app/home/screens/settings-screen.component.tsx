import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { LOGOUT } from '../../authentication/actions';
import { getEmail } from '../../authentication/selectors';
import { AvoidingContainer } from '../../ui/container.component';
import { RegularText } from '../../ui/text.component';
import { getTheme } from '../../ui/themes/selectors';
import { DEVICE_SIZE, ThemesEnum } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { SettingsItemComponent } from '../components/settings-item.component';
import { HomeNavigationProps } from '../routing.params';

export const HeaderButtonsWrapper = styled.View`
    margin-top: ${(props) => props.theme.spacer * 2};
    flex-direction: row;
    justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
    margin-left: ${(props) => props.theme.spacer * 2};
`;

export const LogoutButton = styled.TouchableOpacity`
    margin-right: ${(props) => props.theme.spacer * 3};
`;

export const EditProfileButton = styled.TouchableOpacity`
    align-self: center;
    width: ${DEVICE_SIZE.width * 0.25};
    height: 25px;
    background-color: ${(props) => props.theme.colors.secondary};
    margin-top: ${(props) => props.theme.spacer * 2};
`;
export const EditText = styled(RegularText)`
    color: ${(props) => props.theme.colors.main};
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.extraSmall};
    margin-top: ${(props) => props.theme.spacer * 0.5};
`;

export const ProfileImage = styled.Image`
    width: ${DEVICE_SIZE.width * 0.32}px;
    height: ${DEVICE_SIZE.height * 0.15}px;
    border-radius: 100px;
    align-self: center;
`;
export const Username = styled(RegularText)`
    text-align: center;
    margin-top: ${(props) => props.theme.spacer * 2};
    font-size: ${(props) => props.theme.fontSize.large};
`;

export type SettingsScreenProps = HomeNavigationProps<'SettingsScreen'>;

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

    return (
        <AvoidingContainer>
            <HeaderButtonsWrapper>
                <BackButton
                    onPress={useCallback(() => {
                        props.navigation.goBack();
                    }, [props.navigation])}
                >
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
                onPress={useCallback(() => {
                    props.navigation.navigate('ThemeChangeScreen');
                }, [props.navigation])}
                theme={themeName}
            />
            <SettingsItemComponent
                title={I18n.t('settings.changePassword')}
                onPress={useCallback(() => {
                    props.navigation.navigate('PasswordChangeScreen');
                }, [props.navigation])}
            />
        </AvoidingContainer>
    );
};
