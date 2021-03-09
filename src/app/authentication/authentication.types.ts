export interface User {
    id: number;
    email: string;
    username: string;
    token: string;
    profileImg?: unknown;
}

export interface AuthenticationState {
    isFetching: boolean;
    error?: Error;
    username?: string;
    token?: string;
    email?: string;
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
    data: User;
}
