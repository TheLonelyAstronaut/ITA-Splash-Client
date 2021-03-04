import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_ALBUM } from '../../music-stack/actions';
import { Container, LoadingContainer } from '../../ui/styled/container.styled';
import { MusicListTemplateScreen } from '../../ui/tracks/music-list-template-screen.component';
import { PlaylistScreenParams } from '../routing.params';
import { getErrorLibrary, getIsFetchingLibrary, getPlaylist } from '../selectors';

export const PlaylistScreenComponent: React.FC<PlaylistScreenParams> = (props: PlaylistScreenParams) => {
    const dispatch = useDispatch();
    const album = useSelector(getPlaylist(props.route.params.id));
    const isLoading = useSelector(getIsFetchingLibrary);
    const error = useSelector(getErrorLibrary);

    useEffect(() => {
        dispatch(
            LOAD_ALBUM.TRIGGER({
                id: props.route.params.id,
                key: props.route.key,
            })
        );
    }, [dispatch, props]);

    if (error) {
        return <Container />;
    } else if (isLoading || !album) {
        return <LoadingContainer />;
    } else {
        return <MusicListTemplateScreen data={album} type={props.route.params.id as number} />;
    }
};
