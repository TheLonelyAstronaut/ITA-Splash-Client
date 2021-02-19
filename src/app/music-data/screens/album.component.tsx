import React, { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { Track } from '../../../types/music';
import { HomeNavigationProps } from '../../home/routing.params';
import { MUSIC_ACTIONS } from '../../player/actions';
import { BackButton } from '../../ui/back-button.component';
import { Container } from '../../ui/container.component';
import { Image } from '../../ui/image.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { TrackComponent } from '../../ui/tracks/track.component';

export const AlbumImage = styled(Image)`
    margin-top: ${(props) => props.theme.spacer * 3};
    margin-left: ${(props) => props.theme.spacer * 6 - 4};
    width: 225px;
    height: 225px;
`;
export const HeaderWrapper = styled.View`
    flex-direction: row;
`;
export const TextWrapper = styled.View``;

export const InfoWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
`;

export const AlbumName = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    margin-top: ${(props) => props.theme.spacer * 3};
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
export const PlayButton = styled.Image`
    width: 50px;
    height: 50px;
    margin-top: ${(props) => props.theme.spacer * 4};
    margin-right: ${(props) => props.theme.spacer * 4};
`;
export const LikeButton = styled.Image`
    width: 25px;
    height: 25px;
    margin-top: ${(props) => props.theme.spacer * 5.5};
    margin-left: ${(props) => props.theme.spacer * 1.6};
    margin-right: ${(props) => props.theme.spacer * 2.5};
`;
export const TracksWrapper = styled.View`
    margin-top: ${(props) => props.theme.spacer}px;
`;

export type AlbumComponentProps = HomeNavigationProps<'HomeAlbumScreen'>;

export const AlbumScreenComponent: React.FC<AlbumComponentProps> = (props: AlbumComponentProps) => {
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();

    const handleTrackPlay = (item: Track) => {
        dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: item, queue: props.route.params.album.data }));
    };

    return (
        <Container>
            <HeaderWrapper>
                <BackButton
                    onPress={useCallback(() => {
                        props.navigation.goBack();
                    }, [props.navigation])}
                />
                <AlbumImage source={props.route.params.album.artwork} />
            </HeaderWrapper>
            <InfoWrapper>
                <TouchableOpacity
                    onPress={useCallback(() => {
                        setLiked(!liked);
                        // if(liked){
                        //     dispatch(ADD_TO_LIKED);
                        // }else{
                        //     dispatch(DELETE_FROM_LIKED);
                        // }
                    }, [liked])}
                >
                    {liked ? (
                        <LikeButton source={require('../../../assets/like-button-color.png')} />
                    ) : (
                        <LikeButton source={require('../../../assets/like-button-blank.png')} />
                    )}
                </TouchableOpacity>
                <TextWrapper>
                    <AlbumName>{props.route.params.album.name}</AlbumName>
                    <ArtistWrapper>
                        <AlbumArtist>{props.route.params.album.artist}</AlbumArtist>
                    </ArtistWrapper>
                    <AlbumYear>{'Album ' + props.route.params.album.year}</AlbumYear>
                </TextWrapper>
                <TouchableOpacity>
                    <PlayButton source={require('../../../assets/play-button-color.png')} />
                </TouchableOpacity>
            </InfoWrapper>
            <TracksWrapper>
                <FlatList
                    data={props.route.params.album.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(item) => <TrackComponent track={item.item} onPress={handleTrackPlay} />}
                />
            </TracksWrapper>
        </Container>
    );
};
