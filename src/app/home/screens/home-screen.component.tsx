import React from 'react';
import { Button, Text, SectionList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { tracks } from '../../../mocks/tracks';
import { LOGOUT } from '../../authentication/actions';
import { MUSIC_ACTIONS } from '../../player/actions';
import { Container } from '../../ui/container.component';
import { CHANGE_THEME } from '../../ui/themes/actions';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/theme.types';
import { HomeNavigationProps } from '../routing.params';
import styled from 'styled-components/native';
import { playlist } from '../../../mocks/playlists';
import { Image } from '../../ui/image.component';
import { Track } from '../../../types/music';

export type HomeScreenProps = HomeNavigationProps<'HomeScreen'>;

export const WelcomeText = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.welcome};
    font-weight: 600;
    margin-top: ${(props) => props.theme.spacer * 4};
    margin-top: ${(props) => props.theme.spacer * 6};
    margin-left: ${(props) => props.theme.spacer * 4};
`;
export const ResentlyPlayed = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    margin-left: ${(props) => props.theme.spacer * 4};
    margin-top: ${(props) => props.theme.spacer * 2};
    font-size: ${(props) => props.theme.fontSize.large};
    font-weight: 600;
`;

export const HomeScreenComponent: React.FC<HomeScreenProps> = () => {
    // const dispatch = useDispatch();
    // const currentThemeEnum = useSelector(getTheme);

    // const handleChangeTheme = React.useCallback(() => {
    //     if (currentThemeEnum === ThemesEnum.DARK) {
    //         dispatch(CHANGE_THEME({ theme: ThemesEnum.LIGHT }));
    //     } else {
    //         dispatch(CHANGE_THEME({ theme: ThemesEnum.DARK }));
    //     }
    // }, [dispatch, currentThemeEnum]);
    //
    // const handlePlay = React.useCallback(() => {
    //     dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: tracks[0], queue: tracks }));
    // }, [dispatch]);
    //
    // const handleLogout = () => {
    //     dispatch(LOGOUT.TRIGGER());
    // };
    type Props = {
        data: Track;
    };
    const RenderItem: React.FC<Props> = (item: Props) => {
        return (
            <View>
                <Image source={item.data.artwork} />
                <Text>{item.data.artist}</Text>
            </View>
        );
    };

    return (
        <Container>
            <WelcomeText>Welcome</WelcomeText>
            <ResentlyPlayed>Resently played</ResentlyPlayed>
            <SectionList
                sections={playlist}
                renderItem={({ item }) => <RenderItem data={item} />}
                renderSectionHeader={({ section: { name } }) => <Text style={{ color: 'white' }}>{name}</Text>}
            />
        </Container>
    );
};
