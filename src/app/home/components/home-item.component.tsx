import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';

import { Album, Artist, Playlist } from '../../../types/music';
import { Image } from '../../ui/image.component';
import { RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { HomeParamList } from '../routing.params';
import { PlaylistImageRender } from '../../library/components/playlist-item.component';
import { LibraryElementType } from '../../library/library.types';

export type PlaylistProps = {
    data: Playlist | Artist | Album;
    navigation: StackNavigationProp<HomeParamList, 'HomeScreen'>;
};

export const Wrapper = styled.TouchableOpacity`
    height: ${DEVICE_SIZE.height * 0.16};
    width: ${DEVICE_SIZE.width * 0.22};
    margin-left: ${(props) => props.theme.spacer * 3};
`;
export const PlaylistImage = styled(Image)`
    height: 100px;
    width: 100px;
    align-self: center;
`;
export const ArtistImage = styled(PlaylistImage)`
    border-radius: 100px;
`;
export const PlaylistName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.small};
    margin-top: ${(props) => props.theme.spacer};
`;

export const HomeItemComponent: React.FC<PlaylistProps> = ({ data, navigation }: PlaylistProps) => {
    const isArtist = (data as Artist).popularTracks;
    const isAlbum = (data as Album).year;
    const isPlaylist = !(data as Album).artistName;

    const handlePress = useCallback(() => {
        const transfer = (stack: string, screen: string, params: unknown) => {
            // Strange RN navigation behavior
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            navigation.navigate(stack, {
                screen,
                params,
            });
        };

        if (isArtist) {
            transfer('HomeMusicStack', 'ArtistScreen', {
                id: (data as Artist).id,
            });
        } else if (isAlbum) {
            transfer('HomeMusicStack', 'AlbumScreen', {
                id: (data as Album).id,
            });
        } else {
            transfer('Library', 'PlaylistScreen', {
                id: (data as Playlist).id,
            });
        }
    }, [data, isAlbum, isArtist, navigation]);

    return (
        <Wrapper onPress={handlePress}>
            {isArtist ? (
                <ArtistImage source={{ uri: data.image }} />
            ) : !isPlaylist ? (
                <PlaylistImage source={{ uri: data.image }} />
            ) : (
                <PlaylistImageRender type={LibraryElementType.PLAYLIST} data={data as Playlist} />
            )}
            <PlaylistName>{data.name}</PlaylistName>
        </Wrapper>
    );
};
