import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View`
    background-color: ${(props) => props.theme.colors.screenBackground};
    flex: 1;
`;

export const AvoidingContainer = styled(Container)`
    background-color: ${(props) => props.theme.colors.screenBackground};
    padding-top: ${getStatusBarHeight()};
    flex: 1;
`;
