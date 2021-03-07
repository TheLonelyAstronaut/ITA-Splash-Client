import styled from 'styled-components/native';

import { RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const ThemeItem = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width}px;
    background-color: ${(props) => props.theme.colors.screenBackground};
    flex-direction: row;
    margin-top: ${(props) => props.theme.spacer * 5}px;
    justify-content: space-between;
`;

export const ThemeText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    margin-left: ${(props) => props.theme.spacer * 3.2}px;
`;

export const CheckMark = styled.View`
    margin-right: ${(props) => props.theme.spacer * 3.2}px;
`;
