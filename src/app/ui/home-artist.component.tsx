import React from 'react';
import styled from 'styled-components/native';

import { Artist, Playlist } from '../../types/music';

import { Image } from './image.component';
import { RegularText } from './text.component';
import { DEVICE_SIZE } from './themes/themes';
import { Album } from '../../mocks/albums';

export type ArtistProps = {
    data: Artist | Playlist | Album;
};

export const Wrapper = styled.TouchableOpacity`
    height: ${DEVICE_SIZE.height * 0.16};
    width: ${DEVICE_SIZE.width * 0.22};
    background-color: ${(props) => props.theme.colors.screenBackground};
    margin-bottom: 5px;
    margin-left: ${(props) => props.theme.spacer * 3};
`;
export const ArtistImage = styled(Image)`
    height: 100px;
    width: 100px;
    border-radius: 100px;
    align-self: center;
`;
export const ArtistName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.small};
    margin-top: ${(props) => props.theme.spacer};
`;

export const ArtistComponent: React.FC<ArtistProps> = (data: ArtistProps) => {
    return (
        <Wrapper>
            <ArtistImage source={data.data.image} />
            <ArtistName>{data.data.name}</ArtistName>
        </Wrapper>
    );
};
