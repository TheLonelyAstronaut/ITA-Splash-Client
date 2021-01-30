import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { tracks } from '../../../mocks/tracks';
import { MUSIC_ACTIONS } from '../../player/actions';
import { Container } from '../../ui/container.component';
import { CHANGE_THEME } from '../../ui/themes/actions';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/theme.state';

export const HomeScreenComponent: React.FC = () => {
    const dispatch = useDispatch();
    const currentThemeEnum = useSelector(getTheme);

    const handleChangeTheme = React.useCallback(() => {
        if (currentThemeEnum === ThemesEnum.LIGHT) {
            dispatch(CHANGE_THEME({ theme: ThemesEnum.DARK }));
        } else {
            dispatch(CHANGE_THEME({ theme: ThemesEnum.LIGHT }));
        }
    }, [dispatch, currentThemeEnum]);

    const handlePlay = React.useCallback(() => {
        dispatch(
            MUSIC_ACTIONS.PLAY.TRIGGER({
                track: tracks[0],
                queue: tracks,
            })
        );
    }, [dispatch]);

    return (
        <Container>
            <Text>Home screen</Text>
            <Button title={'Change theme'} onPress={handleChangeTheme} />
            <Button title={'Play'} onPress={handlePlay} />
        </Container>
    );
};
