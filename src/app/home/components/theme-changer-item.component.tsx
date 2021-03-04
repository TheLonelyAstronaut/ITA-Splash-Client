import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';

import { CheckMark, ThemeItem, ThemeText } from './styled/theme-changer-item.styled';

export interface Props {
    title: string;
    onPress: () => void;
    selected: boolean;
}

export const ThemeItemComponent: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <ThemeItem onPress={props.onPress}>
            <ThemeText>{props.title}</ThemeText>
            {props.selected ? (
                <CheckMark>
                    <Icon name={'checkmark'} size={20} color={theme.colors.secondary} />
                </CheckMark>
            ) : null}
        </ThemeItem>
    );
};
