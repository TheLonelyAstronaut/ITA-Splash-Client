import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';

import { AvoidingContainer } from '../../ui/styled/container.styled';
import { AlbumComponent } from '../components/album.component';
import { BackButtonContainer } from '../components/styled/albums-screen.styled';
import { AlbumsScreenParams } from '../routing.params';

export const AlbumsScreenComponent: React.FC<AlbumsScreenParams> = (props: AlbumsScreenParams) => {
    const theme = useTheme();

    const handleBackPress = useCallback(() => {
        props.navigation.goBack();
    }, [props.navigation]);

    return (
        <AvoidingContainer>
            <BackButtonContainer onPress={handleBackPress}>
                <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
            </BackButtonContainer>
            <FlatList
                data={props.route.params.albums}
                renderItem={({ item }) => <AlbumComponent data={item} />}
                keyExtractor={(item) => item.name}
            />
        </AvoidingContainer>
    );
};
