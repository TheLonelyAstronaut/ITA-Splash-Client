import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingContainer } from '../../ui/styled/container.styled';
import { LOAD_ARTIST } from '../actions';
import { ArtistComponent } from '../components/artist.component';
import { ArtistScreenParams } from '../routing.params';
import { getArtist, getIsMusicScreenFetching, getMusicScreenError } from '../selectors';

export const ArtistScreenComponent: React.FC<ArtistScreenParams> = (props: ArtistScreenParams) => {
    const artist = useSelector(getArtist(props.route.params.id));
    const error = useSelector(getMusicScreenError(props.route.key));
    const isLoading = useSelector(getIsMusicScreenFetching(props.route.key));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            LOAD_ARTIST.TRIGGER({
                id: props.route.params.id,
                key: props.route.key,
            })
        );
    }, [dispatch, props]);

    if (error) {
        return null;
    } else if (isLoading || !artist) {
        return <LoadingContainer />;
    } else {
        return <ArtistComponent data={artist} />;
    }
};
