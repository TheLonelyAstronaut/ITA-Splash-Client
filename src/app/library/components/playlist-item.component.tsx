import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

import I18n from '../../utils/i18n';
import { LibraryData, LibraryElementType } from '../library.types';
import { LibraryStackParamList } from '../routing.params';

import {
    PlaylistContainer,
    PlaylistIconWrapper,
    PlaylistIcon,
    PlaylistImage,
    InfoWrapper,
    PlaylistName,
    Wrapper,
    CombinedImageContainer,
    CombinedImage,
    TracksAmount,
} from './playlist-styles.component';

export interface Props {
    name: string;
    data: LibraryData;
}

export const CombinedPlaylistImage: React.FC<LibraryData> = (data: LibraryData) => {
    if (data.data.tracks !== undefined) {
        return (
            <CombinedImageContainer>
                <Wrapper>
                    <CombinedImage source={{ uri: `${data.data.tracks[0].artwork}` }} />
                    <CombinedImage source={{ uri: `${data.data.tracks[1].artwork}` }} />
                </Wrapper>
                <Wrapper>
                    <CombinedImage source={{ uri: `${data.data.tracks[2].artwork}` }} />
                    <CombinedImage source={{ uri: `${data.data.tracks[3].artwork}` }} />
                </Wrapper>
            </CombinedImageContainer>
        );
    } else return null;
};

export const PlaylistImageRender: React.FC<LibraryData> = (data: LibraryData) => {
    if (data.type === LibraryElementType.LIKED) {
        return <PlaylistImage source={require('../../../assets/fav-icon.png')} />;
    }
    if (data.data.tracks === undefined) {
        return (
            <PlaylistIconWrapper>
                <PlaylistIcon>
                    <Icon name={'music-note'} size={50} color={'white'} />
                </PlaylistIcon>
            </PlaylistIconWrapper>
        );
    }
    if (data.data.tracks !== undefined && data.data.tracks.length <= 4) {
        switch (data.data.tracks.length) {
            case 0:
                return (
                    <PlaylistIconWrapper>
                        <PlaylistIcon>
                            <Icon name={'music-note'} size={50} color={'white'} />
                        </PlaylistIcon>
                    </PlaylistIconWrapper>
                );
            case 1:
            case 2:
            case 3:
                return <PlaylistImage source={{ uri: data.data.tracks[0].artwork }} />;
            case 4:
                return <CombinedPlaylistImage data={data.data} type={data.type} />;
        }
    } else return <CombinedPlaylistImage data={data.data} type={data.type} />;

    return null;
};

export const PlaylistItem: React.FC<Props> = (props: Props) => {
    const navigation = useNavigation();
    const handlePress = useCallback(() => {
        navigation.navigate('PlaylistScreen', {
            id: props.data.data.id,
        });
    }, [props]);

    return (
        <PlaylistContainer onPress={handlePress}>
            <PlaylistImageRender type={props.data.type} data={props.data.data} />
            <InfoWrapper>
                <PlaylistName>
                    {props.data.type === LibraryElementType.LIKED ? I18n.t('library.favoriteTracks') : props.name}
                </PlaylistName>
                <TracksAmount>
                    {props.data.data.tracks === undefined
                        ? '0 ' + I18n.t('library.tracks')
                        : props.data.data.tracks.length.toString() + ' ' + I18n.t('library.tracks')}
                </TracksAmount>
            </InfoWrapper>
        </PlaylistContainer>
    );
};
