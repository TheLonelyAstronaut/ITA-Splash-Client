import { useBottomSheet } from '@gorhom/bottom-sheet';
import React from 'react';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { Image } from '../../ui/image.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { getCurrentTrack } from '../selectors';

export const WidgetWrapper = styled(Pressable)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.main};
    flex-direction: row;
`;

export const TrackInfoWrapper = styled.View`
    flex: 1;
    padding-horizontal: 20px;
    justify-content: center;
`;

export const ArtistText = styled(RegularText)`
    font-size: 14px;
`;

export const TitleText = styled(BoldText)`
    font-size: 18px;
    margin-bottom: 3px;
`;

export const Widget: React.FC = () => {
    const currentTrack = useSelector(getCurrentTrack);
    const { expand } = useBottomSheet();
    const theme = useTheme();

    return (
        <WidgetWrapper onPress={expand}>
            <Image
                source={currentTrack.artwork}
                style={{
                    width: theme.tabBarHeight,
                    height: theme.tabBarHeight,
                }}
            />
            <TrackInfoWrapper>
                <TitleText>{currentTrack.title}</TitleText>
                <ArtistText>{currentTrack.artist}</ArtistText>
            </TrackInfoWrapper>
        </WidgetWrapper>
    );
};
