import React from 'react';
import { useSelector } from 'react-redux';

import { HomePlaylistScreenParams } from '../../home/routing.params';
import { Container, LoadingContainer } from '../../ui/styled/container.styled';
// Metro should pick up platform specific version
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MusicListTemplateScreen } from '../../ui/tracks/music-list-tempalte/music-list-template-screen.component';
import { PlaylistScreenParams } from '../routing.params';
import { getErrorLibrary, getIsFetchingLibrary, getPlaylist } from '../selectors';

export type MergedPlaylistScreenParams = PlaylistScreenParams | HomePlaylistScreenParams;

export const PlaylistScreenComponent: React.FC<MergedPlaylistScreenParams> = (props: MergedPlaylistScreenParams) => {
    const playlist = useSelector(getPlaylist(props.route.params.id));
    const isLoading = useSelector(getIsFetchingLibrary);
    const error = useSelector(getErrorLibrary);

    if (error) {
        return <Container />;
    } else if (isLoading || !playlist) {
        return <LoadingContainer />;
    } else {
        return <MusicListTemplateScreen data={playlist} />;
    }
};
