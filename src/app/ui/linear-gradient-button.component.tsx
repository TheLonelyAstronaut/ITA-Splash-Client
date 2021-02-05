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
}

export const LinearButton: React.FC<Props> = (title) => {
    const themeKey = useSelector(getTheme);
    const theme = useMemo(() => themesCollection[themeKey] as DefaultTheme, [themeKey]);

    return (
        <TouchableOpacity>
            <LinearGradient
                useAngle={true}
                angle={45}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
                angleCenter={{ x: 0.5, y: 0.5 }}
                locations={[0.0, 1]}
                colors={[theme.colors.additivePink, theme.colors.additiveBlue]}
                style={{
                    width: DEVICE_SIZE.width * 0.71,
                    height: 45,
                    alignSelf: 'center',
                    marginTop: theme.spacer * 4,
                }}
            >
                <SingInText>{I18n.t(`${title.title}`)}</SingInText>
            </LinearGradient>
        </TouchableOpacity>
    );
};
