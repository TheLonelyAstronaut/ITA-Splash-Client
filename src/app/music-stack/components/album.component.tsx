import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';

import { Album } from '../../../types/music';
import { BoldText, RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';

export const AlbumWrapper = styled.TouchableOpacity`
    margin-top: ${(props) => props.theme.spacer * 2};
    width: ${DEVICE_SIZE.width};
    height: ${DEVICE_SIZE.height * 0.08};
    background-color: ${(props) => props.theme.colors.screenBackground};
    flex-direction: row;
`;
export const AlbumImage = styled.Image`
    height: ${DEVICE_SIZE.height * 0.08};
    width: ${DEVICE_SIZE.height * 0.08};
    margin-left: ${(props) => props.theme.spacer * 4};
`;

export const InfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 2};
`;

export const AlbumName = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    margin-bottom: ${(props) => props.theme.spacer * 0.5};
    font-size: ${(props) => props.theme.fontSize.large};
`;
export const AlbumYear = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
`;

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
