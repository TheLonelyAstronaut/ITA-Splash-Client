import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

export const ArtistBackButtonContainer = styled.TouchableOpacity`
    margin-left: ${(props) => props.theme.spacer * 4};
    width: 31px;
    border-radius: 50px;
    background-color: rgba(52, 52, 52, 0.4);
`;

export type Props = {
    onPress: () => void;
};

export const ArtistBackButton: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <ArtistBackButtonContainer onPress={props.onPress}>
            <Icon name={'chevron-back'} color={theme.colors.secondary} size={30} />
        </ArtistBackButtonContainer>
    );
};
