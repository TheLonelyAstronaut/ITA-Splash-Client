import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${(props) => props.theme.spacer * 6};
    height: ${(props) => props.theme.fontSize.welcome};
`;

export const WelcomeText = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.welcome};
    font-weight: 700;
    margin-left: ${(props) => props.theme.spacer * 2 + 2};
    height: 100px;
`;

export const SettingsIcon = styled.TouchableOpacity`
    align-self: flex-end;
    margin-right: ${(props) => props.theme.spacer * 2.5};
`;
