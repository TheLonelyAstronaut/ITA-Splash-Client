import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { AvoidingContainer } from '../../ui/container.component';
import { AlbumComponent } from '../components/album.component';
import { MusicStackNavigationProps } from '../routing.params';

export const BackButtonContainer = styled.TouchableOpacity`
    margin-left: ${(props) => props.theme.spacer * 3}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
`;

export type MusicDataProps = MusicStackNavigationProps<'AlbumsScreen'>;

export const AlbumsScreenComponent: React.FC<MusicDataProps> = (props: MusicDataProps) => {
    const theme = useTheme();

    return (
        <AvoidingContainer>
            <BackButtonContainer
                onPress={useCallback(() => {
                    props.navigation.goBack();
                }, [props.navigation])}
            >
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
