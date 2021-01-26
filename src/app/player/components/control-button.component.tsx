import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { Pressable } from 'react-native';

export type ControlButtonProps = {
    onPress: () => void;
    iconName: string;
    iconSize: number;
};

export const ControlButtonWrapper = styled(Pressable)`
    margin-horizontal: 10px;
`;

export const ControlButton: React.FC<ControlButtonProps> = (props: ControlButtonProps) => {
    const theme = useTheme();

    return (
        <ControlButtonWrapper onPress={props.onPress}>
            <Icon name={props.iconName} size={props.iconSize} color={theme.colors.secondary} />
        </ControlButtonWrapper>
    );
};
