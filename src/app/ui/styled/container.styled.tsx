import React from 'react';
import { ActivityIndicator } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: ${(props) => props.theme.colors.screenBackground};
    flex: 1;
`;

export const AvoidingContainer = styled(Container)`
    background-color: ${(props) => props.theme.colors.screenBackground};
    padding-top: ${getStatusBarHeight()}px;
    flex: 1;
`;

const LoadingContainerWrapper = styled(Container)`
    padding-top: ${getStatusBarHeight()}px;
    justify-content: center;
    align-items: center;
`;

export const LoadingContainer: React.FC = () => (
    <LoadingContainerWrapper>
        <ActivityIndicator size={'small'} />
    </LoadingContainerWrapper>
);
