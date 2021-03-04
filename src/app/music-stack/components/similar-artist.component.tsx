import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { Artist } from '../../../types/music';

import { Wrapper, ArtistImage, ArtistName } from './styled/similar-artist.styled';

export type Props = {
    artist: Partial<Artist>;
};

export const SimilarArtistComponent: React.FC<Props> = (item: Props) => {
    const navigation = useNavigation();

    const handlePress = useCallback(() => {
        navigation.navigate({
            name: 'ArtistScreen',
            key: 'ArtistScreen_' + item.artist.id + '_' + Math.random().toString(),
            params: {
                id: item.artist.id,
            },
        });
    }, [item, navigation]);

    return (
        <Wrapper onPress={handlePress}>
            <ArtistImage source={{ uri: item.artist.image }} />
            <ArtistName>{item.artist.name}</ArtistName>
        </Wrapper>
    );
};
