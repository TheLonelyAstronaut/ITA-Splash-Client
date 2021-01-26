export interface AuthenticationState {
    isFetching: boolean;
    error?: Error;
    username?: string;
    token?: string;
}
