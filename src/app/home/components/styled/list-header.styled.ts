import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${(props) => props.theme.spacer * 6}px;
    height: ${(props) => props.theme.fontSize.welcome}px;
`;

export const WelcomeText = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.welcome}px;
    font-weight: 700;
    margin-left: ${(props) => props.theme.spacer * 2 + 2}px;
    height: 100px;
`;

export const SettingsIcon = styled.TouchableOpacity`
    align-self: flex-end;
    margin-right: ${(props) => props.theme.spacer * 2.5}px;
`;
