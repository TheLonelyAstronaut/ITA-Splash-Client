import { PlaylistOutput } from './music-data.types';

export type UserOutput = {
    getCurrentUser: {
        id: number;
        email: string;
        username: string;
        subscriptions: number[];
        playlists: PlaylistOutput[];
    };
};
