import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: ${(props) => props.theme.colors.screenBackground};
    flex: 1;
`;

export const AvoidingContainer = styled.View`
    background-color: ${(props) => props.theme.colors.main};
    flex: 1;
`;
