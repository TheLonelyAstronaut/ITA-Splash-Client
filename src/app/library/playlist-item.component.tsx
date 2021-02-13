import React from 'react';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { RegularText } from '../ui/text.component';
import { DEVICE_SIZE } from '../ui/themes/themes';

import { LibraryData, LibraryElementType } from './library.types';

export interface Props {
    name: string;
    data: LibraryData;
}

export const PlaylistContainer = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width};
    height: ${DEVICE_SIZE.height * 0.09};
    background-color: ${(props) => props.theme.colors.screenBackground};
    margin-bottom: ${(props) => props.theme.spacer * 3}px;
    flex-direction: row;
`;

export const PlaylistImage = styled.Image`
    width: 90px;
    height: 90px;
    margin-left: ${(props) => props.theme.spacer * 3}px;
`;
export const PlaylistName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
`;
export const InfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 3};
`;
export const TracksAmount = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
`;
export const PlaylistItem: React.FC<Props> = (props: Props) => {
    const theme = useTheme();

    console.log(props.data);

    return (
        <PlaylistContainer>
            <PlaylistImage
                source={
                    props.data.type === LibraryElementType.LIKED
                        ? require('../../assets/fav-icon.png')
                        : require('../../assets/blank-playlist.png')
                }
            />
            <InfoWrapper>
                <PlaylistName>
                    {props.data.type === LibraryElementType.LIKED ? 'Favorite tracks' : props.name}
                </PlaylistName>
                <TracksAmount>{props.data.data.tracks.length.toString() + ' tracks'}</TracksAmount>
            </InfoWrapper>
        </PlaylistContainer>
    );
};
