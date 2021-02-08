import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components/native';

import I18n from '../utils/i18n';

import { getTheme } from './themes/selectors';
import { DEVICE_SIZE, themesCollection } from './themes/themes';

export const SingInText = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-family: ${(props) => props.theme.fontFamily.bold};
    font-size: ${(props) => props.theme.fontSize.medium};
    text-align: center;
    margin-top: 10px;
`;
export interface Props {
    title: string;
    onPress?: () => void;
}

export const LinearButton: React.FC<Props> = (props: Props) => {
    const themeKey = useSelector(getTheme);
    const theme = useMemo(() => themesCollection[themeKey] as DefaultTheme, [themeKey]);

    return (
        <TouchableOpacity onPress={props?.onPress}>
            <LinearGradient
                useAngle={true}
                angle={-0.7}
                angleCenter={{ x: 1, y: 0.5 }}
                colors={[theme.colors.additiveBlue, theme.colors.additivePink]}
                style={{
                    width: DEVICE_SIZE.width * 0.71,
                    height: 45,
                    alignSelf: 'center',
                    marginTop: theme.spacer * 4,
                }}
            >
                <SingInText>{I18n.t(`${props.title}`)}</SingInText>
            </LinearGradient>
        </TouchableOpacity>
    );
};
