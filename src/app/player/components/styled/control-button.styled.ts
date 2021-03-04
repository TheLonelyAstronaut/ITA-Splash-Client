import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const ControlButtonWrapper = styled(TouchableOpacity)`
    margin-horizontal: ${(props) => props.theme.spacer * 6}px;
    margin-top: ${(props) => props.theme.spacer * 2.2}px;
`;
