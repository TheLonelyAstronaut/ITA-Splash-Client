import React from 'react';
import styled from 'styled-components/native';

import { SearchResultType } from '../search/search.types';
import { Image } from '../ui/image.component';

import { RegularText } from './text.component';
import { DEVICE_SIZE } from './themes/themes';

export const Container = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width};
    height: ${(props) => props.theme.searchItem.height}px;
    background-color: black;
    margin-bottom: ${(props) => props.theme.spacer};
`;
export const Wrapper = styled.View`
    flex-direction: row;
`;
export const InfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 1.5};
    margin-top: ${(props) => props.theme.spacer * 1.5};
`;
export const TrackName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
`;
export const ArtistText = styled(RegularText)`
    color: ${(props) => props.theme.colors.inputBackground};
    font-size: ${(props) => props.theme.fontSize.extraSmall};
`;

export const TrackImage = styled(Image)`
    width: ${(props) => props.theme.searchItem.searchImage}px;
    height: ${(props) => props.theme.searchItem.searchImage}px;
    margin-left: ${(props) => props.theme.spacer * 5};
`;

export const ArtistImage = styled(Image)`
    width: ${(props) => props.theme.searchItem.searchImage}px;
    height: ${(props) => props.theme.searchItem.searchImage}px;
    border-radius: 100px;
    margin-left: ${(props) => props.theme.spacer * 5};
`;

export type Props = {
    title: string;
    artist: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
    type: SearchResultType;
};

export const SearchResultComponent: React.FC<Props> = (props: Props) => {
    return (
        <Container>
            <Wrapper>
                {props.type === SearchResultType.TRACK || props.type === SearchResultType.PLAYLIST ? (
                    <TrackImage source={props.image} />
                ) : (
                    <ArtistImage source={props.image} style={{ borderRadius: 100 }} />
                )}

                <InfoWrapper>
                    <TrackName>{props.title}</TrackName>
                    <ArtistText>{props.artist}</ArtistText>
                </InfoWrapper>
            </Wrapper>
        </Container>
    );
};