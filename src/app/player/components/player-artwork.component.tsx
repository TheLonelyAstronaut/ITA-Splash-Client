import { BlurView } from '@react-native-community/blur';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';

import { Image } from '../../ui/image.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { ArtworkType, Track } from '../player.state';

export const InfoWrapper = styled.View`
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
    background-color: transparent;
    align-items: center;
`;

export type PlayerArtworkProps = {
    track: Track;
};

export const PlayerArtwork: React.FC<PlayerArtworkProps> = (props: PlayerArtworkProps) => {
    const theme = useTheme();
    const artworkType = props.track.artworkType;

    const getArtwork = React.useCallback((): React.ReactNode => {
        if (artworkType == ArtworkType.IMAGE) {
            return (
                <Image
                    source={props.track.artwork}
                    style={{
                        width: theme.player.artworkSize,
                        height: theme.player.artworkSize,
                        marginTop: theme.player.artworkMarginTop,
                    }}
                />
            );
        } else {
            return (
                <Image
                    source={props.track.artwork}
                    style={{
                        width: DEVICE_SIZE.width,
                        height: DEVICE_SIZE.height,
                    }}
                />
            );
        }
    }, [theme, artworkType, props.track]);

    return (
        <InfoWrapper>
            <InfoWrapper>{getArtwork()}</InfoWrapper>
            {artworkType === ArtworkType.VIDEO && (
                <BlurView
                    style={{
                        width: DEVICE_SIZE.width,
                        height: DEVICE_SIZE.height,
                        position: 'absolute',
                    }}
                    blurAmount={5}
                />
            )}
        </InfoWrapper>
    );
};
