import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { AvoidingContainer, Container } from '../../ui/container.component';
import { CHANGE_THEME } from '../../ui/themes/actions';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/theme.types';
import I18n from '../../utils/i18n';
import { ThemeItemComponent } from '../components/theme-changer-item.component';
import { HomeNavigationProps } from '../routing.params';

import { BackButton } from './settings-screen.component';

export type SettingsScreenProps = HomeNavigationProps<'SettingsScreen'>;

export const ThemeChangeScreenComponent: React.FC<SettingsScreenProps> = (props: SettingsScreenProps) => {
    const themeKey = useSelector(getTheme);
    const dispatch = useDispatch();
    const theme = useTheme();

    const changeToLight = useCallback(() => {
        dispatch(CHANGE_THEME({ theme: ThemesEnum.LIGHT }));
    }, [dispatch]);

    const changeToDark = useCallback(() => {
        dispatch(CHANGE_THEME({ theme: ThemesEnum.DARK }));
    }, [dispatch]);

    const changeToJapanese = useCallback(() => {
        dispatch(CHANGE_THEME({ theme: ThemesEnum.JAPANESE }));
    }, [dispatch]);

    return (
        <AvoidingContainer>
            <BackButton
                onPress={useCallback(() => {
                    props.navigation.goBack();
                }, [props.navigation])}
            >
                <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
            </BackButton>
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
            <ThemeItemComponent
                title={I18n.t('settings.japanese')}
                onPress={changeToJapanese}
                selected={themeKey === ThemesEnum.JAPANESE}
            />
        </AvoidingContainer>
    );
};
