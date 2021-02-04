export interface AuthenticationState {
    isFetching: boolean;
    error?: Error;
    username?: string;
    token?: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
    login: string;
}

export interface AuthCompletedPayload {
    username: string;
    token: string;
}

export interface RegisterCompletedPayload {
    username: string;
    login: string;
    password: string;
}
