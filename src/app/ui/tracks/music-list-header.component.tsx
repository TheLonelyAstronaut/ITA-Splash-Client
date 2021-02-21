import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { Album, Playlist } from '../../../types/music';
import { Image } from '../image.component';
import { BoldText, RegularText } from '../text.component';

import { CombinedPlaylistImage } from './combined-image-component';

export const AlbumImage = styled(Image)`
    margin-top: ${(props) => props.theme.spacer * 3};
    width: 225px;
    height: 225px;
`;

export const PlayButton = styled.Image`
    width: 50px;
    height: 50px;
    margin-right: ${(props) => props.theme.spacer * 4};
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

export type MusicListHeaderProps = {
    data: Album | Playlist;
};

export const MusicListHeader: React.FC<MusicListHeaderProps> = (props: MusicListHeaderProps) => {
    const isAlbum = (props.data as Album).year;
    const [liked, setLiked] = useState(false);

    return (
        <HeaderWrapper>
            <ImageWrapper>
                {isAlbum ? (
                    <AlbumImage source={{ uri: props.data.image }} />
                ) : (
                    <CombinedPlaylistImage data={props.data} />
                )}
            </ImageWrapper>
            <InfoWrapper>
                <TouchableOpacity
                    onPress={useCallback(() => {
                        setLiked(!liked);
                    }, [liked])}
                >
                    {liked ? (
                        <LikeButton source={require('../../../assets/like-button-color.png')} />
                    ) : (
                        <LikeButton source={require('../../../assets/like-button-blank.png')} />
                    )}
                </TouchableOpacity>
                <TextWrapper>
                    {isAlbum ? (
                        <>
                            <AlbumName>{props.data.name}</AlbumName>
                            <ArtistWrapper>
                                <AlbumArtist>{(props.data as Album).artist}</AlbumArtist>
                            </ArtistWrapper>
                            <AlbumYear>{'Album ' + (props.data as Album).year}</AlbumYear>
                        </>
                    ) : (
                        <AlbumName>{props.data.name}</AlbumName>
                    )}
                </TextWrapper>
                <TouchableOpacity>
                    <PlayButton source={require('../../../assets/play-button-color.png')} />
                </TouchableOpacity>
            </InfoWrapper>
        </HeaderWrapper>
    );
};
