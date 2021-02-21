import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { albums } from '../../../mocks/albums';
import { Container } from '../../ui/container.component';
import { AlbumComponent } from '../components/album.component';
import { MusicDataNavigationProps } from '../route.params';

export const BackButtonContainer = styled.TouchableOpacity`
    margin-left: ${(props) => props.theme.spacer * 3}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
`;

export type MusicDataProps = MusicDataNavigationProps<'Albums'>;

export const AlbumsScreenComponent: React.FC<MusicDataProps> = (props: MusicDataProps) => {
    const theme = useTheme();

    return (
        <Container>
            <BackButtonContainer
                onPress={useCallback(() => {
                    props.navigation.goBack();
                }, [props.navigation])}
            >
                <Icon name={'chevron-back'} color={theme.colors.secondary} size={36} />
            </BackButtonContainer>
            <FlatList
                data={albums}
                renderItem={(item) => (
                    <AlbumComponent image={item.item.image} name={item.item.name} year={item.item.year} />
                )}
                keyExtractor={(item) => item.name}
            />
        </Container>
    );
};
