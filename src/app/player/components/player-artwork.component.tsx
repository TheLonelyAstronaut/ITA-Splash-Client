import React from 'react';
import { useTheme } from 'styled-components/native';

import { Track } from '../../../types/music';
import { Image } from '../../ui/image.component';

import { InfoWrapper } from './styled/player-artwork.styled';

export type PlayerArtworkProps = {
    track: Track;
};

export const PlayerArtwork: React.FC<PlayerArtworkProps> = (props: PlayerArtworkProps) => {
    const theme = useTheme();

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
