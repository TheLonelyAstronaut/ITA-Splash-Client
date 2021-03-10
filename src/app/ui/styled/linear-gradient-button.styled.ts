import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { DEVICE_SIZE } from '../themes/themes';

export const SingInText = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    line-height: ${(props) => props.theme.fontSize.medium}px;
    text-align: center;
    font-weight: 600;
`;

export const TouchableWrapper = styled(TouchableOpacity)`
    margin-top: ${(props) => props.theme.spacer * 3}px;
    height: 45px;
    width: ${DEVICE_SIZE.width * 0.7}px;
    align-self: center;
`;

export const StyledLinearGradient = styled(LinearGradient)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
