import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

import I18n from '../../utils/i18n';
import { LibraryData } from '../library.types';

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
} from './styled/library.styles';

export interface Props {
    name: string;
    data: LibraryData;
}

export type CombinedImageProps = {
    data: LibraryData;
};

export type PlaylistImageProps = CombinedImageProps;

export const CombinedPlaylistImage = (data: CombinedImageProps) => {
    if (
        data.data.tracks[0].artwork === data.data.tracks[1].artwork ||
        data.data.tracks[0].artwork === data.data.tracks[2].artwork ||
        data.data.tracks[0].artwork === data.data.tracks[3].artwork ||
        data.data.tracks[0].artwork === data.data.tracks[4].artwork
    ) {
        return <PlaylistImage source={{ uri: data.data.tracks[0].artwork }} />;
    }
    if (data.data.tracks !== undefined) {
        return (
            <CombinedImageContainer>
                <Wrapper>
                    <CombinedImage source={{ uri: data.data.tracks[0].artwork }} />
                    <CombinedImage source={{ uri: data.data.tracks[1].artwork }} />
                </Wrapper>
                <Wrapper>
                    <CombinedImage source={{ uri: data.data.tracks[2].artwork }} />
                    <CombinedImage source={{ uri: data.data.tracks[3].artwork }} />
                </Wrapper>
            </CombinedImageContainer>
        );
    } else return null;
};

export const PlaylistImageRender = (data: PlaylistImageProps) => {
    if (data.data.liked) {
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
    if (data.data.tracks.length < 4) {
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
        }
    } else return <CombinedPlaylistImage data={data.data} />;

    return null;
};

export const PlaylistItem: React.FC<Props> = (props: Props) => {
    const navigation = useNavigation();

    const handlePress = useCallback(() => {
        navigation.navigate('PlaylistScreen', {
            id: props.data.id,
        });
    }, [navigation, props.data.id]);

    return (
        <PlaylistContainer width={true} onPress={handlePress}>
            <PlaylistImageRender data={props.data} />
            <InfoWrapper>
                <PlaylistName>{props.data.liked ? I18n.t('library.favoriteTracks') : props.name}</PlaylistName>
                <TracksAmount>
                    {props.data.tracks === undefined
                        ? '0 ' + I18n.t('library.tracks')
                        : props.data.tracks.length.toString() + ' ' + I18n.t('library.tracks')}
                </TracksAmount>
            </InfoWrapper>
        </PlaylistContainer>
    );
};
