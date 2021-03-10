import styled from 'styled-components/native';

import { RegularText } from '../../../ui/styled/text.styled';

export const SectionTitle = styled(RegularText)`
    margin-left: ${(props) => props.theme.spacer * 2 + 2}px;
    margin-top: ${(props) => props.theme.spacer * 5}px;
    margin-bottom: ${(props) => props.theme.spacer * 2}px;
    font-size: ${(props) => props.theme.fontSize.extraLarge}px;
    font-weight: 700;
`;

export const Indicator = styled.ActivityIndicator`
    margin-top: 70%;
`;

export const ErrorWrapper = styled.View`
    margin-top: 80%;
    align-self: center;
`;

export const ErrorText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.medium}px;
`;

export const TryAgainButton = styled.TouchableOpacity`
    width: 90px;
    height: 25px;
    background-color: ${(props) => props.theme.colors.additivePink};
    margin-left: ${(props) => props.theme.spacer * 8}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
`;

export const TryAgainText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small}px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer * 0.4}px;
`;
