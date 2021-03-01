import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, LoadingContainer } from '../../ui/container.component';
import { MusicListTemplateScreen } from '../../ui/tracks/music-list-template-screen';
import { LOAD_ALBUM } from '../actions';
import { MusicStackNavigationProps } from '../routing.params';
import { getAlbum, getIsMusicScreenFetching, getMusicScreenError } from '../selectors';

export type AlbumScreenParams = MusicStackNavigationProps<'AlbumScreen'>;

export const AlbumScreenComponent: React.FC<AlbumScreenParams> = (props: AlbumScreenParams) => {
    const dispatch = useDispatch();
    const album = useSelector(getAlbum(props.route.params.id));
    const isLoading = useSelector(getIsMusicScreenFetching(props.route.key));
    const error = useSelector(getMusicScreenError(props.route.key));

    // useEffect(()=>{
    //     dispatch(MUSIC_ACTIONS.ADD_QUEUE({newQueue: album?.tracks as Track[], currentQueue: currentQueue}))
    // },[album?.tracks, dispatch])

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
        return <MusicListTemplateScreen data={album} />;
    }
};
