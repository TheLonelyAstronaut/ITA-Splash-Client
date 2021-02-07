import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { tracks } from '../../../mocks/tracks';
import { LOGIN, LOGOUT, REGISTER } from '../../authentication/actions';
import { MUSIC_ACTIONS } from '../../player/actions';
import { SEARCH_ALL } from '../../search/actions';
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

    const handleRegister = () => {
        dispatch(REGISTER.TRIGGER({ username: 'vlad', email: 'sfvb', password: '234342' }));
    };

    const handleSearch = () => {
        dispatch(SEARCH_ALL.TRIGGER('Sunflower'));
    };
    const handleLogout = () => {
        dispatch(LOGOUT.TRIGGER());
        dispatch(LOGIN.TRIGGER({ email: '', password: '' }));
    };

    return (
        <Container>
            <Text>Home screen</Text>
            <Button title={'Change theme'} onPress={handleChangeTheme} />
            <Button title={'Play'} onPress={handlePlay} />
            <Button title={'Register'} onPress={handleRegister} />
            <Button title={'Search'} onPress={handleSearch} />
            <Button title={'Logout'} onPress={handleLogout} />
        </Container>
    );
};
