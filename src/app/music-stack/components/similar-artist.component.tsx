import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';

import { Artist } from '../../../types/music';
import { Image } from '../../ui/image.component';
import { BoldText } from '../../ui/text.component';

export type Props = {
    artist: Partial<Artist>;
};

export const Wrapper = styled.TouchableOpacity`
    padding-vertical: ${(props) => props.theme.spacer * 3};
`;

export const ArtistImage = styled(Image)`
    border-radius: 60px;
    height: 120px;
    width: 120px;
`;

export const ArtistName = styled(BoldText)`
    text-align: center;
    padding-top: ${(props) => props.theme.spacer};
`;

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
