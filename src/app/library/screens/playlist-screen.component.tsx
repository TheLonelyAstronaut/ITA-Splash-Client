import React from 'react';
import { useSelector } from 'react-redux';

import { Container, LoadingContainer } from '../../ui/styled/container.styled';
// Metro should pick up platform specific version
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MusicListTemplateScreen } from '../../ui/tracks/music-list-tempalte/music-list-template-screen.component';
import { PlaylistScreenParams } from '../routing.params';
import { getErrorLibrary, getIsFetchingLibrary, getPlaylist } from '../selectors';

export const PlaylistScreenComponent: React.FC<PlaylistScreenParams> = (props: PlaylistScreenParams) => {
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
