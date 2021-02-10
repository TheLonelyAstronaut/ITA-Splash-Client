import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { LOGOUT } from '../../authentication/actions';
import { getUsername } from '../../authentication/selectors';
import { Container } from '../../ui/container.component';
import { RegularText } from '../../ui/text.component';
import { getTheme } from '../../ui/themes/selectors';
import { DEVICE_SIZE, ThemesEnum } from '../../ui/themes/themes';
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
    font-size: ${(props) => props.theme.fontSize.small};
    margin-top: 2px;
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
    font-size: ${(props) => props.theme.fontSize.extraLarge};
`;

export type SettingsScreenProps = HomeNavigationProps<'SettingsScreen'>;

export const SettingsScreenComponent: React.FC<SettingsScreenProps> = (props: SettingsScreenProps) => {
    const username = useSelector(getUsername);
    const theme = useTheme();
    const dispatch = useDispatch();
    const themeKey = useSelector(getTheme);
    let themeName: string;

    if (themeKey === ThemesEnum.DARK) {
        themeName = 'Dark';
    } else if (themeKey === ThemesEnum.LIGHT) {
        themeName = 'Light';
    } else {
        themeName = 'Japanese';
    }

    const handleLogout = () => {
        dispatch(LOGOUT.TRIGGER());
    };

    return (
        <Container>
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
            <Username>{username}</Username>
            <EditProfileButton>
                <EditText>Edit profile</EditText>
            </EditProfileButton>
            <SettingsItemComponent
                title={'Theme'}
                onPress={useCallback(() => {
                    props.navigation.navigate('ThemeChangeScreen');
                }, [props.navigation])}
                theme={themeName}
            />
            <SettingsItemComponent
                title={'Change password'}
                onPress={useCallback(() => {
                    props.navigation.navigate('PasswordChangeScreen');
                }, [props.navigation])}
            />
        </Container>
    );
};
