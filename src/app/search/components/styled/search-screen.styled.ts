import styled from 'styled-components/native';

import { BoldText, RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const SearchInput = styled.TextInput`
    width: ${DEVICE_SIZE.width * 0.8};
    height: 45px;
    border-width: 1px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer}px;
    margin-bottom: ${(props) => props.theme.spacer * 3}px;
    padding-left: ${(props) => props.theme.spacer * 2}px;
    background-color: ${(props) => props.theme.colors.main};
    border-color: ${(props) => props.theme.colors.additivePink};
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
`;

export const Header = styled(BoldText)`
    font-size: ${(props) => props.theme.fontSize.extraLarge};
    margin-left: ${(props) => props.theme.spacer * 5};
    margin-top: ${(props) => props.theme.spacer * 8};
    margin-bottom: ${(props) => props.theme.spacer};
`;

export const EmptyText = styled(RegularText)`
    color: ${(props) => props.theme.colors.inputBackground};
    text-align: center;
    margin-top: 60%;
    font-size: ${(props) => props.theme.fontSize.large};
`;

export const Indicator = styled.ActivityIndicator`
    margin-top: 60%;
`;

export const Separator = styled.View`
    margin-bottom: ${(props) => props.theme.spacer * 2};
`;
