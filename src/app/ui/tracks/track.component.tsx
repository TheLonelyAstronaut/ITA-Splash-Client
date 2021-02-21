import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { Track } from '../../../types/music';
import { getCurrentTrack } from '../../player/selectors';
import { RegularText } from '../text.component';

export const TrackContainer = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    margin-top: 10px;
    flex-direction: row;
    justify-content: space-between;
`;

// export const TrackImage = styled.Image`
//   width: 45px;
//   height: 45px;
// `

export type Props = {
    isPlaying: boolean;
};
export const TrackInfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 4};
    margin-top: ${(props) => props.theme.spacer * 1.6};
`;
export const TrackName = styled(RegularText)<Props>`
    color: ${(props) => (props.isPlaying ? props.theme.colors.additivePink : props.theme.colors.secondary)};
    font-size: ${(props) => props.theme.fontSize.medium};
`;
export const TrackArtist = styled(RegularText)`
    color: ${(props) => props.theme.colors.inputBackground};
    font-size: ${(props) => props.theme.fontSize.extraSmall};
`;
export const Dots = styled.TouchableOpacity``;
export const Icons = styled.View`
    margin-right: ${(props) => props.theme.spacer * 4};
    margin-top: ${(props) => props.theme.spacer * 2};
    flex-direction: row;
`;
export const Liked = styled.Image`
    width: 10px;
    height: 10px;
    margin-top: 3px;
    margin-right: ${(props) => props.theme.spacer * 3}px;
`;

type TrackComponentProps = {
    track: Track;
    onPress: (track: Track) => void;
    onLongPress?: (track: Track) => void;
};

export const TrackComponent: React.FC<TrackComponentProps> = (props: TrackComponentProps) => {
    const currentTrack = useSelector(getCurrentTrack);
    const isPlaying = useMemo(() => props.track.id === currentTrack.id, [props, currentTrack]);
    const handleLongPress = React.useCallback(() => {
        if (props.onLongPress) {
            props.onLongPress(props.track);
        }
    }, [props]);

    return (
        <TrackContainer onPress={() => props.onPress(props.track)} onLongPress={handleLongPress}>
            <TrackInfoWrapper>
                <TrackName isPlaying={isPlaying}>{props.track.title}</TrackName>
                <TrackArtist>{props.track.artist}</TrackArtist>
            </TrackInfoWrapper>
            <Icons>
                {props.track.liked ? <Liked source={require('../../../assets/like-button-color.png')} /> : null}
                <Dots>
                    <Icon name={'dots-three-horizontal'} color={'white'} size={15} />
                </Dots>
            </Icons>
        </TrackContainer>
    );
};
