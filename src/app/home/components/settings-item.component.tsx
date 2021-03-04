import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';

import { Chevron, SettingsItem, SettingsText, ThemeText } from './styled/settings-item.styled';

export interface Props {
    title: string;
    onPress: () => void;
    theme?: string;
}

export const SettingsItemComponent: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <SettingsItem onPress={props.onPress}>
            <SettingsText>{props.title}</SettingsText>
            <ThemeText>{props.theme}</ThemeText>
            <Chevron>
                <Icon name={'chevron-forward'} color={theme.colors.secondary} size={18} />
            </Chevron>
        </SettingsItem>
    );
};
