import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_ALBUM } from '../../music-stack/actions';
import { Container, LoadingContainer } from '../../ui/container.component';
import { MusicListTemplateScreen } from '../../ui/tracks/music-list-template-screen';
import { LibraryStackNavigationProps } from '../routing.params';
import { getErrorLibrary, getIsFetchingLibrary, getPlaylist } from '../selectors';

export type PlaylistScreenParams = LibraryStackNavigationProps<'PlaylistScreen'>;

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <MusicListTemplateScreen data={album} type={props.route.params.type} />;
    }
};
