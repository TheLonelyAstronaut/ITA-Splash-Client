import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../store/application-state.types';

import { AuthenticationState } from './authentication.types';

export const getRootAuthenticationState: Selector<ApplicationState, AuthenticationState> = createSelector(
    (state) => state.authentication,
    (authentication) => authentication
);

export const getIsLoggedIn: Selector<ApplicationState, boolean> = createSelector(
    getRootAuthenticationState,
    (auth) => !!auth.token
);

export const getIsLoggingIn: Selector<ApplicationState, boolean> = createSelector(
    getRootAuthenticationState,
    (auth) => auth.isFetching
);

export const getAuthenticationError: Selector<ApplicationState, Error | undefined> = createSelector(
    getRootAuthenticationState,
    (auth) => auth.error
);

export const getUsername: Selector<ApplicationState, string> = createSelector(
    getRootAuthenticationState,
    (auth) => auth.data.username
);

export const getEmail: Selector<ApplicationState, string> = createSelector(
    getRootAuthenticationState,
    (auth) => auth.data.email
);

export const getAccessToken: Selector<ApplicationState, string> = createSelector(
    getRootAuthenticationState,
    (auth) => auth.token
);

export const getSubscriptions: Selector<ApplicationState, number[]> = createSelector(
    getRootAuthenticationState,
    (auth) => auth.data.subscriptions
);
