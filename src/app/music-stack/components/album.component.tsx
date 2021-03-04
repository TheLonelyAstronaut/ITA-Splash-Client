import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { Album } from '../../../types/music';

import { AlbumImage, AlbumName, AlbumWrapper, AlbumYear, InfoWrapper } from './styled/album.styled';

export type AlbumProps = {
    data: Album;
};

export const AlbumComponent: React.FC<AlbumProps> = (props: AlbumProps) => {
    const navigation = useNavigation();
    const handlePress = useCallback(() => {
        navigation.navigate('AlbumScreen', {
            id: props.data.id,
        });
    }, [props, navigation]);

    return (
        <AlbumWrapper onPress={handlePress}>
            <AlbumImage source={{ uri: props.data.image }} />
            <InfoWrapper>
                <AlbumName>{props.data.name}</AlbumName>
                <AlbumYear>{props.data.year}</AlbumYear>
            </InfoWrapper>
        </AlbumWrapper>
    );
};
