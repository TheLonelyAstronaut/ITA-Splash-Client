import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import styled from 'styled-components/native';

import { Album, Playlist } from '../../../types/music';
import { Image } from '../image.component';
import { BoldText, RegularText } from '../text.component';

import { CombinedPlaylistImage } from './combined-image-component';
import { useDispatch } from 'react-redux';
import { MUSIC_ACTIONS } from '../../player/actions';
import { ADD_TO_LIKED, LOAD_LIBRARY, REMOVE_FROM_LIKED } from '../../library/actions';
import { LibraryElementType } from '../../library/library.types';

export const AlbumImage = styled(Image)`
    margin-top: ${(props) => props.theme.spacer * 3};
    width: 225px;
    height: 225px;
`;

export const PlayButton = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-right: ${(props) => props.theme.spacer * 4};
    background-color: white;
`;

export const LikeButton = styled.Image`
    width: 25px;
    height: 25px;
    margin-left: ${(props) => props.theme.spacer * 1.6};
    margin-right: ${(props) => props.theme.spacer * 2.5};
`;

export const ImageWrapper = styled.View`
    align-self: center;
`;

export const HeaderWrapper = styled.View``;

export const TextWrapper = styled.View``;

export const InfoWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
    align-items: center;
    margin-top: ${(props) => props.theme.spacer * 4};
`;

export const AlbumName = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large};
    align-self: center;
`;

export const ArtistWrapper = styled.TouchableOpacity`
    opacity: 3;
`;

export const AlbumArtist = styled(BoldText)`
    align-self: center;
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
    margin-top: ${(props) => props.theme.spacer * 0.5};
`;

export const AlbumYear = styled(RegularText)`
    align-self: center;
    color: ${(props) => props.theme.colors.inputBackground};
    font-size: ${(props) => props.theme.fontSize.extraSmall};
    margin-top: ${(props) => props.theme.spacer * 0.5};
`;

export const EmptyPlaylistWrapper = styled.View`
    width: 225px;
    height: 225px;
    background-color: #1e1e1e;
`;

export const IconWrapper = styled.View`
    align-self: center;
    margin-top: 50px;
`;

export type MusicListHeaderProps = {
    data: Album | Playlist;
    type: LibraryElementType;
};

export const MusicListHeader: React.FC<MusicListHeaderProps> = (props: MusicListHeaderProps) => {
    const isAlbum = (props.data as Album).year;
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const handlePress = useCallback(() => {
        navigation.navigate({
            name: 'ArtistScreen',
            key: 'ArtistScreen_' + (props.data as Album).artistId + '_' + Math.random().toString(),
            params: {
                id: (props.data as Album).artistId,
            },
        });
    }, [props, navigation]);

    const handlePlay = useCallback(() => {
        dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: props.data.tracks[0], queue: props.data.tracks }));
    }, []);

    const handleLike = useCallback(() => {
        if (props.data.liked) {
            dispatch(REMOVE_FROM_LIKED.TRIGGER({ data: props.data }));
            dispatch(LOAD_LIBRARY.TRIGGER(1));
        } else {
            dispatch(ADD_TO_LIKED.TRIGGER({ data: props.data }));
            dispatch(LOAD_LIBRARY.TRIGGER(1));
        }
    }, [dispatch, props.data.liked, props.data]);

    return (
        <HeaderWrapper>
            <ImageWrapper>
                {isAlbum ? (
                    <AlbumImage source={{ uri: props.data.image }} />
                ) : props.data.tracks.length > 0 ? (
                    <CombinedPlaylistImage data={props.data} />
                ) : (
                    <EmptyPlaylistWrapper>
                        <IconWrapper>
                            <Icon name={'music-note'} size={120} color={'white'} />
                        </IconWrapper>
                    </EmptyPlaylistWrapper>
                )}
            </ImageWrapper>
            <InfoWrapper>
                <TouchableOpacity onPress={handleLike}>
                    {props.data.liked ? (
                        <LikeButton source={require('../../../assets/like-button-color.png')} />
                    ) : (
                        <LikeButton source={require('../../../assets/like-button-blank.png')} />
                    )}
                </TouchableOpacity>
                <TextWrapper>
                    {isAlbum ? (
                        <>
                            <AlbumName>{props.data.name}</AlbumName>
                            <ArtistWrapper onPress={handlePress}>
                                <AlbumArtist>{(props.data as Album).artistName}</AlbumArtist>
                            </ArtistWrapper>
                            <AlbumYear>{'Album ' + (props.data as Album).year}</AlbumYear>
                        </>
                    ) : (
                        <AlbumName>{props.data.name}</AlbumName>
                    )}
                </TextWrapper>
                <TouchableOpacity onPress={handlePlay}>
                    <PlayButton source={require('../../../assets/play-button-color.png')} />
                </TouchableOpacity>
            </InfoWrapper>
        </HeaderWrapper>
    );
};
