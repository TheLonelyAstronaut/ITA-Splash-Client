import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { client } from '../../../graphql/api';
import { users } from '../../../mocks/users';
import { REGISTER } from '../../authentication/actions';
import { MUSIC_ACTIONS } from '../../player/actions';
import { SEARCH } from '../../search/actions';
import { Container } from '../../ui/container.component';
import { CHANGE_THEME } from '../../ui/themes/actions';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/theme.state';

export const HomeScreenComponent: React.FC = () => {
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
        dispatch(MUSIC_ACTIONS.PLAY.TRIGGER());
    }, [dispatch]);

    const handleRegister = () => {
        dispatch(REGISTER.TRIGGER({ username: 'vlad', login: 'sfvb', password: '234342' }));
    };

    const handleSearch = async () => {
        const result = await dispatch(SEARCH('Sunflower'));
        console.log(result);
    };

    return (
        <Container>
            <Text>Home screen</Text>
            <Button title={'Change theme'} onPress={handleChangeTheme} />
            <Button title={'Play'} onPress={handlePlay} />
            <Button title={'Register'} onPress={handleRegister} />
            <Button title={'Search'} onPress={handleSearch} />
        </Container>
    );
};
