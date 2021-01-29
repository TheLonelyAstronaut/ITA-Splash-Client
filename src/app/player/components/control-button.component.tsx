import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import styled, { useTheme } from 'styled-components/native';

export type ControlButtonProps = {
    onPress: () => void;
    iconName: string;
    iconSize: number;
};

export const ControlButtonWrapper = styled(TouchableOpacity)`
    margin-horizontal: ${(props) => props.theme.spacer * 6}px;
    margin-top: ${(props) => props.theme.spacer * 2.2}px;
`;

export const PlayControlButton: React.FC<ControlButtonProps> = (props: ControlButtonProps) => {
    const theme = useTheme();

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Icon name={props.iconName} size={props.iconSize} color={theme.colors.secondary} />
        </TouchableOpacity>
    );
};

export const SkipControlButton: React.FC<ControlButtonProps> = (props: ControlButtonProps) => {
    const theme = useTheme();

    return (
        <ControlButtonWrapper onPress={props.onPress}>
            <Icon name={props.iconName} size={props.iconSize} color={theme.colors.secondary} />
        </ControlButtonWrapper>
    );
};
