import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { Image } from '../../ui/image.component';
import { getTheme } from '../../ui/themes/selectors';
import { DEVICE_SIZE, ThemesEnum } from '../../ui/themes/themes';
import { ArtworkType, Track } from '../../../types/music';

export const InfoWrapper = styled.View`
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
    background-color: ${(props) => props.theme.colors.main};
    align-items: center;
`;

export type PlayerArtworkProps = {
    track: Track;
};

export const PlayerArtwork: React.FC<PlayerArtworkProps> = (props: PlayerArtworkProps) => {
    const theme = useTheme();
    const themeEnum = useSelector(getTheme);
    const artworkType = props.track.artworkType;
    const blurType = React.useMemo(() => (themeEnum === ThemesEnum.DARK || ThemesEnum.JAPANESE ? 'normal' : 'light'), [
        themeEnum,
    ]);

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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    blurType={blurType as any}
                    blurAmount={5}
                />
            )}
        </InfoWrapper>
    );
};
