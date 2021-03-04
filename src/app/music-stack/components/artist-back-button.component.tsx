import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';

import { ArtistBackButtonContainer } from './styled/artist-back-button.styled';

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
