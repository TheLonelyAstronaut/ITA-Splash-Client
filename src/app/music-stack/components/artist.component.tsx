import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { Artist, Track } from '../../../types/music';
import { MUSIC_ACTIONS, PlayActionPayload } from '../../player/actions';
import { ArtistBackButton } from '../../ui/artist-back-button.component';
import { Container } from '../../ui/container.component';
import { Image } from '../../ui/image.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { PopularTrackComponent } from '../../ui/tracks/popular-track.compoennt';

import { AlbumComponent } from './album.component';
import { SimilarArtistComponent } from './similar-artist.component';

export type ArtistProps = {
    data: Artist;
};

export const Header = styled.View``;

export const ArtistName = styled(BoldText)`
    margin-top: ${DEVICE_SIZE.height * 0.25};
    font-size: ${(props) => props.theme.fontSize.extraLarge + 15};
    margin-left: ${(props) => props.theme.spacer * 2};
`;

export const ArtistImage = styled(Image)`
    width: ${DEVICE_SIZE.width};
    height: ${DEVICE_SIZE.height * 0.4};
    position: absolute;
`;

export const Popular = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large};
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 4};
    margin-bottom: ${(props) => props.theme.spacer * 2};
`;

export const Albums = styled(BoldText)`
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 2};
`;

export const DiscographyButton = styled.TouchableOpacity`
    border-width: 1px;
    border-color: ${(props) => props.theme.colors.additivePink};
    width: ${DEVICE_SIZE.width * 0.38};
    border-radius: 50px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer * 2};
    padding: ${(props) => props.theme.spacer / 2}px;
`;

export const DiscographyText = styled(RegularText)`
    align-self: center;
`;

export const PoularTracksWrapper = styled.View``;

export const AlbumsWrapper = styled.View``;

export const ArtistsWrapper = styled.View``;

export const Separator = styled.View`
    padding: ${(props) => props.theme.spacer * 1.5}px;
`;

export const ArtistComponent: React.FC<ArtistProps> = (props: ArtistProps) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useTheme();

    const handleTrackPlay = useCallback(
        (item: Track) => {
            dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: item, queue: props.data.popularTracks } as PlayActionPayload));
        },
        [dispatch, props]
    );

    const HeaderComponent = () => {
        return (
            <Header>
                <ArtistImage source={{ uri: props.data.image }} />
                <ArtistBackButton onPress={() => navigation.goBack()} />
                <ArtistName>{props.data.name}</ArtistName>
                <Popular>Popular tracks</Popular>
            </Header>
        );
    };

    return (
        <Container>
            <ScrollView contentContainerStyle={{ paddingBottom: theme.widgetHeight }}>
                <PoularTracksWrapper>
                    <FlatList
                        data={props.data.popularTracks}
                        renderItem={({ item, index }) => (
                            <PopularTrackComponent index={index} track={item} onPress={handleTrackPlay} />
                        )}
                        ListHeaderComponent={<HeaderComponent />}
                    />
                </PoularTracksWrapper>
                <AlbumsWrapper>
                    <Albums>Popular releases</Albums>
                    <FlatList data={props.data.albums} renderItem={({ item }) => <AlbumComponent data={item} />} />
                </AlbumsWrapper>
                <DiscographyButton
                    onPress={() => {
                        navigation.navigate('AlbumsScreen', {
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            albums: props.data.albums!,
                        });
                    }}
                >
                    <DiscographyText>Open discography</DiscographyText>
                </DiscographyButton>
                <ArtistsWrapper>
                    <FlatList
                        data={props.data.similarArtists}
                        renderItem={({ item }) => <SimilarArtistComponent artist={item} />}
                        horizontal={true}
                        ItemSeparatorComponent={Separator}
                        contentContainerStyle={{ marginLeft: theme.spacer * 3 }}
                    />
                </ArtistsWrapper>
            </ScrollView>
        </Container>
    );
};
