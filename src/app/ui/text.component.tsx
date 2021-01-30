import styled from 'styled-components/native';

export const RegularText = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-weight: ${(props) => props.theme.fontWeight.standard};
    font-size: ${(props) => props.theme.fontSize.medium}px;
`;

export const BoldText = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.medium}px;
`;
