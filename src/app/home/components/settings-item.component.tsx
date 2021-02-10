import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';

export const SettingsItem = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width};
    background-color: ${(props) => props.theme.colors.screenBackground};
    flex-direction: row;
    margin-top: ${(props) => props.theme.spacer * 5};
    justify-content: space-between;
`;
export const SettingsText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large};
    margin-left: ${(props) => props.theme.spacer * 3.2};
`;
export const Chevron = styled.View`
    margin-right: ${(props) => props.theme.spacer * 3};
`;
export const ThemeText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
    margin-left: ${(props) => props.theme.spacer * 20};
`;

export interface Props {
    title: string;
    onPress: () => void;
    theme?: string;
}

export const SettingsItemComponent: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <>
            <SettingsItem onPress={props.onPress}>
                <SettingsText>{props.title}</SettingsText>
                <ThemeText>{props.theme}</ThemeText>
                <Chevron>
                    <Icon name={'chevron-forward'} color={theme.colors.secondary} size={18} />
                </Chevron>
            </SettingsItem>
        </>
    );
};
