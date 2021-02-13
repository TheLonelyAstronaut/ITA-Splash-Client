// import { createReducer } from 'typesafe-redux-helpers';

import { Album } from '../../mocks/albums';
import { artists } from '../../mocks/artists';
import { Track } from '../../types/music';

export type Artist = {
    name: string;
    popularTracks: Track[];
    albums: Album[];
    //similarArtists: Artist[]
};

export const initialState: Artist = {
    name: artists[0].name,
    popularTracks: artists[0].popularTracks,
    albums: artists[0].albums,
};
