import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { tracks } from '../../../mocks/tracks';
import { LOGOUT } from '../../authentication/actions';
import { MUSIC_ACTIONS } from '../../player/actions';
import { Container } from '../../ui/container.component';
import { CHANGE_THEME } from '../../ui/themes/actions';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/theme.types';
import { HomeNavigationProps } from '../routing.params';

export type HomeScreenProps = HomeNavigationProps<'HomeScreen'>;

export const HomeScreenComponent: React.FC<HomeScreenProps> = () => {
    const dispatch = useDispatch();
    const currentThemeEnum = useSelector(getTheme);

    const handleChangeTheme = React.useCallback(() => {
        if (currentThemeEnum === ThemesEnum.DARK) {
            dispatch(CHANGE_THEME({ theme: ThemesEnum.JAPANESE }));
        } else {
            dispatch(CHANGE_THEME({ theme: ThemesEnum.DARK }));
        }
    }, [dispatch, currentThemeEnum]);

    const handlePlay = React.useCallback(() => {
        dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: tracks[0], queue: tracks }));
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(LOGOUT.TRIGGER());
    };

    return (
        <Container>
            <Text>Home screen</Text>
            <Button title={'Change theme'} onPress={handleChangeTheme} />
            <Button title={'Play'} onPress={handlePlay} />
            <Button title={'Logout'} onPress={handleLogout} />
        </Container>
    );
};
