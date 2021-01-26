import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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

    return (
        <Container>
            <Text>Home screen</Text>
            <Button title={'Change theme'} onPress={handleChangeTheme} />
        </Container>
    );
};
