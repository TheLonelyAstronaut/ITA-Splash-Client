import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { Track } from '../../../types/music';
import { getCurrentTrack } from '../../player/selectors';
import { Image } from '../image.component';
import { RegularText } from '../text.component';
import { Liked, Dots } from '../tracks/track.component';

export const TrackContainer = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    margin-top: 5px;
    align-self: center;
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
    justify-content: flex-start;
    flex-direction: row;
`;

export const TrackName = styled(RegularText)<Props>`
    color: ${(props) => (props.isPlaying ? props.theme.colors.additivePink : props.theme.colors.secondary)};
    font-size: ${(props) => props.theme.fontSize.medium};
    margin-top: ${(props) => props.theme.spacer * 2 - 5};
    margin-left: ${(props) => props.theme.spacer * 2};
`;

export const Icons = styled.View`
    margin-right: ${(props) => props.theme.spacer};
    margin-top: ${(props) => props.theme.spacer * 2 - 5};
    flex-direction: row;
`;

export const TrackImage = styled(Image)`
    height: 45px;
    width: 45px;
    margin-left: ${(props) => props.theme.spacer * 2};
`;

export const Index = styled(RegularText)`
    margin-top: ${(props) => props.theme.spacer * 2 - 5};
`;

type TrackComponentProps = {
    track: Track;
    onPress: (track: Track) => void;
    onLongPress?: (track: Track) => void;
    index: number;
};

export const PopularTrackComponent: React.FC<TrackComponentProps> = (props: TrackComponentProps) => {
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
                <Index>{props.index + 1}</Index>
                <TrackImage source={{ uri: props.track.artwork }} />
                <TrackName isPlaying={isPlaying}>{props.track.title}</TrackName>
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
