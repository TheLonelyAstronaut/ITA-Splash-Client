import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

export const BackButtonContainer = styled.TouchableOpacity`
    margin-top: ${(props) => props.theme.spacer * 2 + 2};
    margin-left: ${(props) => props.theme.spacer * 2};
`;

export type Props = {
    onPress: () => void;
};

export const BackButton: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <BackButtonContainer onPress={props.onPress}>
            <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
        </BackButtonContainer>
    );
};
