import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';

import { Playlist } from '../../../types/music';
import { PlaylistImageRender } from '../../library/components/playlist-item.component';
import { AlbumPreview, ArtistPreview, PlaylistPreview } from '../home.types';
import { HomeParamList } from '../routing.params';

import { ArtistImage, PlaylistImage, PlaylistName, Wrapper } from './styled/home-item.styled';

export type PlaylistProps = {
    data: PlaylistPreview | ArtistPreview | AlbumPreview | null;
    navigation: StackNavigationProp<HomeParamList, 'HomeScreen'>;
};

export const HomeItemComponent: React.FC<PlaylistProps> = ({ data, navigation }: PlaylistProps) => {
    // eslint-disable-next-line no-prototype-builtins
    const isArtist = data?.hasOwnProperty('image');
    // eslint-disable-next-line no-prototype-builtins
    const isAlbum = data?.hasOwnProperty('artwork');
    // eslint-disable-next-line no-prototype-builtins
    const isPlaylist = data?.hasOwnProperty('liked');

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
                id: (data as ArtistPreview).id,
            });
        } else if (isAlbum) {
            transfer('HomeMusicStack', 'AlbumScreen', {
                id: (data as AlbumPreview).id,
            });
        } else {
            transfer('Library', 'PlaylistScreen', {
                id: (data as PlaylistPreview).id,
            });
        }
    }, [data, isAlbum, isArtist, navigation]);

    return (
        <Wrapper onPress={handlePress}>
            {isArtist ? (
                <ArtistImage source={{ uri: (data as ArtistPreview).image }} />
            ) : !isPlaylist ? (
                <PlaylistImage source={{ uri: (data as AlbumPreview).artwork }} />
            ) : (
                <PlaylistImageRender data={data as Playlist} />
            )}
            <PlaylistName>{data?.name}</PlaylistName>
        </Wrapper>
    );
};
