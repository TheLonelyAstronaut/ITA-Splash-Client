import React from 'react';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { tracks } from '../../../mocks/tracks';
import { MUSIC_ACTIONS } from '../../player/actions';
import { Container } from '../../ui/container.component';
import { CHANGE_THEME } from '../../ui/themes/actions';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/theme.types';
import { HomeNavigationProps } from '../routing.params';

export type HomeScreenProps = HomeNavigationProps<'HomeScreen'>;

export const SettingsIcon = styled.TouchableOpacity`
    align-self: flex-end;
    margin-right: ${(props) => props.theme.spacer * 2.5};
    margin-top: ${(props) => props.theme.spacer * 2.5};
`;

export const HomeScreenComponent: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
    const dispatch = useDispatch();
    const currentThemeEnum = useSelector(getTheme);
    const theme = useTheme();

    const handleChangeTheme = React.useCallback(() => {
        if (currentThemeEnum === ThemesEnum.DARK) {
            dispatch(CHANGE_THEME({ theme: ThemesEnum.LIGHT }));
        } else {
            dispatch(CHANGE_THEME({ theme: ThemesEnum.DARK }));
        }
    }, [dispatch, currentThemeEnum]);

    const handlePlay = React.useCallback(() => {
        dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: tracks[0], queue: tracks }));
    }, [dispatch]);

    return (
        <Container>
            <SettingsIcon onPress={() => props.navigation.navigate('SettingsScreen')}>
                <Icon name={'cog'} size={30} color={theme.colors.secondary} />
            </SettingsIcon>
            <Button title={'Change theme'} onPress={handleChangeTheme} />
            <Button title={'Play'} onPress={handlePlay} />
        </Container>
    );
};
