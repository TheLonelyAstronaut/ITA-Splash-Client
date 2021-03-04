import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';

import { Album, Artist, Playlist } from '../../../types/music';
import { PlaylistImageRender } from '../../library/components/playlist-item.component';
import { LibraryElementType } from '../../library/library.types';
import { HomeParamList } from '../routing.params';

import { ArtistImage, PlaylistImage, PlaylistName, Wrapper } from './styled/home-item.styled';

export type PlaylistProps = {
    data: Playlist | Artist | Album;
    navigation: StackNavigationProp<HomeParamList, 'HomeScreen'>;
};

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
