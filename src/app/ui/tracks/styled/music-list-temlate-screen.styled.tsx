import React from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import I18n from '../../../utils/i18n';

import { EmptyText } from './music-list-header.styled';

export const Wrapper = styled.View`
    background-color: ${(props) => props.theme.colors.screenBackground};
`;

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const EmptyPlaylistComponent: React.FC = () => {
    return (
        <Wrapper>
            <EmptyText>{I18n.t('library.emptyPlaylist')}</EmptyText>
        </Wrapper>
    );
};
