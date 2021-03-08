import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components';

import { AvoidingContainer } from '../../ui/styled/container.styled';
import { CHANGE_THEME } from '../../ui/themes/actions';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/theme.types';
import { firebase } from '../../utils/firebase';
import I18n from '../../utils/i18n';
import { BackButton } from '../components/styled/settings-screen.styled';
import { ThemeItemComponent } from '../components/theme-changer-item.component';
import { ThemeChangeScreenProps } from '../routing.params';

export const Back = styled(BackButton)`
    margin-top: ${(props) => props.theme.spacer * 2}px;
`;

export const ThemeChangeScreenComponent: React.FC<ThemeChangeScreenProps> = (props: ThemeChangeScreenProps) => {
    const themeKey = useSelector(getTheme);
    const dispatch = useDispatch();
    const theme = useTheme();

    const changeToLight = useCallback(() => {
        dispatch(CHANGE_THEME({ theme: ThemesEnum.LIGHT }));
        firebase.themeChanges(ThemesEnum.LIGHT);
    }, [dispatch]);

    const changeToDark = useCallback(() => {
        dispatch(CHANGE_THEME({ theme: ThemesEnum.DARK }));
        firebase.themeChanges(ThemesEnum.DARK);
    }, [dispatch]);

    const handleBackPress = useCallback(() => {
        props.navigation.goBack();
    }, [props.navigation]);

    return (
        <AvoidingContainer>
            <Back onPress={handleBackPress}>
                <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
            </Back>
            <ThemeItemComponent
                title={I18n.t('settings.dark')}
                onPress={changeToDark}
                selected={themeKey === ThemesEnum.DARK}
            />
            <ThemeItemComponent
                title={I18n.t('settings.light')}
                onPress={changeToLight}
                selected={themeKey === ThemesEnum.LIGHT}
            />
        </AvoidingContainer>
    );
};
