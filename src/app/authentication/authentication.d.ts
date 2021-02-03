export interface Authentication {
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
    phone: string;
}

export interface AuthCompletedPayload {
    username: string;
    token: string;
}
