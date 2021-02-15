import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components/native';

import { getTheme } from './themes/selectors';
import { DEVICE_SIZE, themesCollection } from './themes/themes';

export const SingInText = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.medium}px;
    line-height: ${(props) => props.theme.fontSize.medium}px;
    text-align: center;
    font-weight: 600;
`;

export const TouchableWrapper = styled(TouchableOpacity)`
    margin-top: ${(props) => props.theme.spacer * 3}px;
    height: 45px;
    width: ${DEVICE_SIZE.width * 0.7};
    align-self: center;
`;

export const StyledLinearGradient = styled(LinearGradient)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export interface Props {
    title: string;
    onPress?: () => void;
    colors?: [string, string];
}

export const LinearButton: React.FC<Props> = (props: Props) => {
    const themeKey = useSelector(getTheme);
    const theme = useMemo(() => themesCollection[themeKey] as DefaultTheme, [themeKey]);

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
