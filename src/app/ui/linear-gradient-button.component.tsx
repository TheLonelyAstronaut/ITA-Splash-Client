import React from 'react';
import { useTheme } from 'styled-components/native';

import I18n from '../utils/i18n';

import { SingInText, StyledLinearGradient, TouchableWrapper } from './styled/linear-gradient-button.styled';

export interface Props {
    title: string;
    onPress?: () => void;
    colors?: [string, string];
}

export const LinearButton: React.FC<Props> = (props: Props) => {
    const theme = useTheme();

    return (
        <TouchableWrapper onPress={props?.onPress}>
            <StyledLinearGradient
                useAngle={true}
                angle={-0.7}
                angleCenter={{ x: 1, y: 0.5 }}
                colors={props.colors ? props.colors : [theme.colors.additiveBlue, theme.colors.additivePink]}
            >
                <SingInText>{I18n.t(`${props.title}`)}</SingInText>
            </StyledLinearGradient>
        </TouchableWrapper>
    );
};
