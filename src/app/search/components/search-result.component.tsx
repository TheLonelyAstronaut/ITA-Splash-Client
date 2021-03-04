import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Album, Artist, Track } from '../../../types/music';
import { MusicStackParamsList } from '../../music-stack/routing.params';
import { MUSIC_ACTIONS } from '../../player/actions';
import I18n from '../../utils/i18n';
import { SearchStackParamList } from '../routing.params';
import { SearchResultType } from '../search.types';

import {
    ArtistImage,
    ArtistText,
    Container,
    InfoWrapper,
    TrackImage,
    TrackName,
    Wrapper,
} from './styled/search-result.styled';

export type Props = {
    data: Album | Artist | Track;
    type: SearchResultType;
    navigation: StackNavigationProp<SearchStackParamList, 'SearchScreen'>;
};

export const SearchResultComponent: React.FC<Props> = (props: Props) => {
    const isArtist = props.type === SearchResultType.ARTIST;
    const isAlbum = props.type === SearchResultType.ALBUM;
    const isTrack = props.type === SearchResultType.TRACK;
    const dispatch = useDispatch();

    const title: string = useMemo(() => {
        if (isTrack) {
            return (props.data as Track).title;
        } else if (isArtist) {
            return (props.data as Artist).name;
        } else if (isAlbum) {
            return (props.data as Album).name;
        }

        return '';
    }, [props, isTrack, isAlbum, isArtist]);

    const description: string = useMemo(() => {
        if (isTrack) {
            return (props.data as Track).artist;
        } else if (isArtist) {
            return I18n.t('search.artist');
        } else if (isAlbum) {
            return (props.data as Album).artistName;
        }

        return '';
    }, [props, isTrack, isAlbum, isArtist]);

    const image: string = useMemo(() => {
        if (isTrack) {
            return (props.data as Track).artwork;
        } else {
            return (props.data as Album | Artist).image;
        }
    }, [props, isTrack]);

    const handlePress = useCallback(() => {
        const transfer = (screen: keyof MusicStackParamsList, params: unknown) => {
            // Strange RN navigation behavior
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            props.navigation.navigate('SearchMusicStack', {
                screen,
                params,
            });
        };

        if (isArtist) {
            transfer('ArtistScreen', {
                id: (props.data as Artist).id,
            });
        } else if (isAlbum) {
            transfer('AlbumScreen', {
                id: (props.data as Album).id,
            });
        } else if (isTrack) {
            dispatch(
                MUSIC_ACTIONS.PLAY.TRIGGER({
                    track: props.data as Track,
                    queue: [props.data as Track],
                })
            );
        }
    }, [isArtist, isAlbum, isTrack, props.navigation, props.data, dispatch]);

    return (
        <Container onPress={handlePress}>
            <Wrapper>
                {props.type === SearchResultType.TRACK || props.type === SearchResultType.ALBUM ? (
                    <TrackImage source={{ uri: image }} />
                ) : (
                    <ArtistImage source={{ uri: image }} style={{ borderRadius: 100 }} />
                )}
                <InfoWrapper>
                    <TrackName>{title}</TrackName>
                    <ArtistText>{description}</ArtistText>
                </InfoWrapper>
            </Wrapper>
        </Container>
    );
};
