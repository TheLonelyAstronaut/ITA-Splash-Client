import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: ${(props) => props.theme.colors.screenBackground};
    margin-top: ${getStatusBarHeight()}px;
    margin-bottom: ${(props) => props.theme.widgetHeight}px;
    flex: 1;
`;

export const AvoidingContainer = styled.View`
    background-color: ${(props) => props.theme.colors.main};
    flex: 1;
`;
