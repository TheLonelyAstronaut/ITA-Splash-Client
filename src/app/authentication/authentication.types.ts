export interface AuthenticationState {
    isFetching: boolean;
    error?: Error;
    username?: string;
    token?: string;
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
    email: string;
    token?: string;
}

export interface RegisterCompletedPayload {
    email: string;
    login: string;
    password: string;
}
