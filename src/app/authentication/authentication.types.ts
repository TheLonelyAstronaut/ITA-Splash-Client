import { Playlist } from '../../types/music';

export interface User {
    id: number;
    email: string;
    username: string;
    profileImg?: unknown;
    subscriptions: number[];
    playlists: Playlist[];
}

export interface AuthenticationState {
    isFetching: boolean;
    error?: Error;
    token: string;
    data: User;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
    email: string;
}

export interface AuthCompletedPayload {
    token: string;
    data: User;
}
