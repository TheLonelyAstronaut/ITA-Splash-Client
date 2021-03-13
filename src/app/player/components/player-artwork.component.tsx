import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { ArtworkType, Track } from '../../../types/music';
import { Image } from '../../ui/image.component';
import { getTheme } from '../../ui/themes/selectors';
import { DEVICE_SIZE, ThemesEnum } from '../../ui/themes/themes';

import { InfoWrapper } from './styled/player-artwork.styled';

export type PlayerArtworkProps = {
    track: Track;
};

export const PlayerArtwork: React.FC<PlayerArtworkProps> = (props: PlayerArtworkProps) => {
    const theme = useTheme();
    const themeEnum = useSelector(getTheme);
    const blurType = React.useMemo(() => (themeEnum === ThemesEnum.DARK ? 'normal' : 'light'), [themeEnum]);

    const getArtwork = React.useCallback((): React.ReactNode => {
        return (
            <Image
                source={{ uri: props.track.artwork }}
                style={{
                    width: theme.player.artworkSize,
                    height: theme.player.artworkSize,
                    marginTop: theme.player.artworkMarginTop,
                }}
            />
        );
    }, [theme, props.track]);

    return <InfoWrapper>{getArtwork()}</InfoWrapper>;
};
