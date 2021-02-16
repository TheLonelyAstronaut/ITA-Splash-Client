import React, { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { albums } from '../../../mocks/albums';
import { Track } from '../../../types/music';
import { HomeNavigationProps } from '../../home/routing.params';
import { MUSIC_ACTIONS } from '../../player/actions';
import { Container } from '../../ui/container.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { TrackComponent } from '../../ui/tracks/track.component';

export const AlbumImage = styled.Image`
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
export const BackButtonContainer = styled.TouchableOpacity`
    margin-top: ${(props) => props.theme.spacer * 2 + 2};
    margin-left: ${(props) => props.theme.spacer * 2};
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
    const theme = useTheme();
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();

    const handleTrackPlay = (item: Track) => {
        dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: item, queue: albums[0].data }));
    };

    return (
        <Container>
            <HeaderWrapper>
                <BackButtonContainer
                    onPress={useCallback(() => {
                        props.navigation.goBack();
                    }, [props.navigation])}
                >
                    <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
                </BackButtonContainer>
                <AlbumImage source={albums[0].img} />
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
                    <AlbumName>{albums[0].name}</AlbumName>
                    <ArtistWrapper>
                        <AlbumArtist>{albums[0].artist}</AlbumArtist>
                    </ArtistWrapper>
                    <AlbumYear>{'Album ' + albums[0].year}</AlbumYear>
                </TextWrapper>
                <TouchableOpacity>
                    <PlayButton source={require('../../../assets/play-button-color.png')} />
                </TouchableOpacity>
            </InfoWrapper>
            <TracksWrapper>
                <FlatList
                    data={albums[0].data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(item) => <TrackComponent track={item.item} onPress={handleTrackPlay} />}
                />
            </TracksWrapper>
        </Container>
    );
};
