import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import styled, { useTheme } from 'styled-components/native';

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
