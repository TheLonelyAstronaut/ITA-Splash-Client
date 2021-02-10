import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';

export const ThemeItem = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width};
    background-color: ${(props) => props.theme.colors.screenBackground};
    flex-direction: row;
    margin-top: ${(props) => props.theme.spacer * 5};
    justify-content: space-between;
`;
export const ThemeText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large};
    margin-left: ${(props) => props.theme.spacer * 3.2};
`;
export const CheckMark = styled.View`
    margin-right: ${(props) => props.theme.spacer * 3.2};
`;

export interface Props {
    title: string;
    onPress: () => void;
    selected: boolean;
}

export const ThemeItemComponent: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <>
            <ThemeItem onPress={props.onPress}>
                <ThemeText>{props.title}</ThemeText>
                {props.selected ? (
                    <CheckMark>
                        <Icon name={'checkmark'} size={24} color={theme.colors.secondary} />
                    </CheckMark>
                ) : null}
            </ThemeItem>
        </>
    );
};
